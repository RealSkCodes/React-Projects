from sentence_transformers import SentenceTransformer, util
import torch
from huggingface_hub import InferenceClient
import os

def text_to_vector_sbert(text, model_name="all-MiniLM-L6-v2"):
    """
    Convert text into a vector using Sentence-BERT.
    """
    model = SentenceTransformer(model_name)
    return model.encode(text, convert_to_tensor=True)

def augment_with_context(prompt, context_data, model_name="all-MiniLM-L6-v2", top_n=1, threshold=0.3):  # Lower threshold
    """Augments the prompt with context or a fallback message."""
    model = SentenceTransformer(model_name)
    prompt_vector = model.encode(prompt, convert_to_tensor=True)
    context_vectors = model.encode(context_data, convert_to_tensor=True)
    similarities = util.pytorch_cos_sim(prompt_vector, context_vectors)[0]
    results = sorted(zip(context_data, similarities.tolist()), key=lambda x: x[1], reverse=True)
    top_contexts_with_scores = results[:top_n]

    if top_contexts_with_scores and top_contexts_with_scores[0][1] > threshold:  # Check if similarity exceeds threshold
        top_contexts = [context for context, _ in top_contexts_with_scores]
        return top_contexts[0]  # Return the context itself if it matches closely
    else:
        return None  # No relevant context found

def generate_text_with_gpt(prompt, model="HuggingFaceH4/zephyr-7b-beta"):
    """Generates text using a Hugging Face Inference API model."""
    HF_API_TOKEN = os.getenv("HF_API_TOKEN")
    try:
        client = InferenceClient(model=model, token=HF_API_TOKEN)
        response = client.text_generation(prompt=prompt)
        return response['generated_text'] if 'generated_text' in response else response  # Handle cases where 'generated_text' might not be present.
    except Exception as e:
        print(f"GPT Error: {e}")
        return None

if __name__ == "__main__":
    prompt = "What is javascript?"
    context_data = [
        "Kara zor el is my name and I specialize in backend development.",
        "Name = Kara zor el and I specialize in backend development.",
        "Sunflower is a yellow colored flower.",
        "Delphinium is a blue colored flower.",
        "Artificial Intelligence is transforming the world.",
        "Python is a versatile programming language.",
        "Machine learning involves training algorithms on data.",
        "Vector embeddings are useful for semantic search.",
        "Natural language processing is a subfield of AI.",
    ]

    # Check if the context already contains a relevant answer
    context_answer = augment_with_context(prompt, context_data)
    
    if context_answer:  # If context contains a valid answer
        print(f"Answer from context: {context_answer}")
    else:
        # If no relevant context is found, generate an answer using GPT-2
        augmented_input = f"Prompt: {prompt}\n\nInstructions: Generate an answer related to the prompt."
        generated_text = generate_text_with_gpt(augmented_input)
        
        if generated_text:
            print(f"Prompt: {prompt}")
            print("\nGPT-2 (Text Generation):")
            print(generated_text)
