import express from "express"
import pool from "../config/db.config.js"
import { io } from "../index.js"
import { Pinecone } from "@pinecone-database/pinecone"
import { GoogleGenerativeAI } from "@google/generative-ai"

const hireaiRouter = express.Router()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
})
const indexName = "hirewhen"

// Check/Create index with proper dimension
async function setupPineconeIndex() {
  try {
    const existingIndexes = await pc.listIndexes()
    if (!existingIndexes.indexes?.some((idx) => idx.name === indexName)) {
      await pc.createIndex({
        name: indexName,
        dimension: "768",
        metric: "cosine",
        spec: { serverless: { cloud: "aws", region: "us-west-2" } },
      })
      console.log(`Index ${indexName} created with dimension ${dimension}`)
      // Wait for index initialization
      await new Promise((resolve) => setTimeout(resolve, 10000))
    }
  } catch (error) {
    console.error("Error setting up Pinecone index:", error)
    throw error
  }
}

// Function to embed text
async function embedText(text) {
  const embeddingModel = genAI.getGenerativeModel({
    model: "models/text-embedding-004",
  })
  try {
    const result = await embeddingModel.embedContent({
      content: { parts: [{ text }] }, // Use 'text' directly instead of 'data'
    })
    // Validate response structure
    if (!result?.embedding?.values) {
      throw new Error("Invalid embedding response structure")
    }
    return result.embedding.values
  } catch (error) {
    console.error("Error embedding text:", error)
    throw error
  }
}

// Sync job entries to Pinecone
hireaiRouter.post("/sync-pinecone", async (req, res) => {
  try {
    // Get the saved data from backend
    const result = await pool.query("SELECT * FROM jobs_2;")
    // Setup Pinecone index
    await setupPineconeIndex()
    const index = pc.index(indexName)
    // Generate embeddings and prepare vectors
    const vectors = await Promise.all(
      result.rows.map(async (row, i) => {
        // Create a formatted string for embedding
        const jobDescription = `
          Company: ${row.company}
          Role: ${row.role}
          Area: ${row.area}
          Status: ${row.status}
          Posted Date: ${row.posted_date}
          Submission Date: ${row.submission_date}
          Salary: ${row.salary}
          Notes: ${row.notes}
          Interview Date: ${row.interview_date || "None"}
          Source: ${row.source}
          Todos: ${JSON.stringify(row.todos) || "None"}
        `
        return {
          id: `job_${row.id}`, // Use the job ID for unique identification
          values: await embedText(jobDescription.trim()), // Embed the formatted job description
          metadata: { text: jobDescription.trim() }, // Store the original job description
        }
      })
    )
    // Upsert vectors
    await index.upsert(vectors)
    console.log("Embeddings stored in Pinecone!")
    res.json({ message: "Data sent to Pinecone!" })
  } catch (err) {
    console.error(err)
    res.status(500).send("Error syncing data to Pinecone")
  }
})

// Hire AI logic
hireaiRouter.post("/hireai-post", async (req, res) => {
  const userPrompt = req.body
  console.log("User Prompt:", userPrompt.user)

  try {
    const queryEmbedding = await embedText(userPrompt.user)
    const index = pc.index(indexName)

    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true,
    })

    const retrievedTexts = queryResponse.matches
      .map((match) => match.metadata?.text)
      .filter(Boolean)
      .join("\n")

    if (retrievedTexts) {
      const prompt = `Based on my job entries, ${userPrompt.user} \n${retrievedTexts}`
      const result = await model.generateContent(prompt)
      const response = await result.response

      res.json({ answer: response.text() })
      console.log("API Response:", response.text())
    } else {
      res.json({ answer: "No relevant jobs found." })
    }
  } catch (error) {
    if (error.status === 429) {
      console.error("Rate limit exceeded:", error)
      res.status(429).json({
        status: 429,
        error: "Rate limit exceeded. Please wait a few moments before trying again.",
      })
    } else {
      console.error("Error querying Google AI API:", error)
      res.status(500).json({
        error: "An error occurred while querying the API. Please try again later.",
      })
    }
  }
})

export default hireaiRouter
