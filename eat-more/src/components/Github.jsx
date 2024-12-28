import React from "react"
import useFetchedData from "../utils/useFetchedData.js"

const Github = () => {
  const userData = useFetchedData("https://api.github.com/users/RealSkCodes")

  // Destructuring the user data
  const { login, avatar_url, name, bio, followers, following, public_repos, html_url } =
    userData || {}

  return (
    <div className="bg-gray-900 text-white p-8 rounded-xl shadow-2xl max-w-2xl mx-auto space-y-6 fade-in">
      <div className="flex items-center space-x-6 slide-up">
        <img
          src={avatar_url}
          alt={`${login}'s Avatar`}
          className="w-28 h-28 rounded-full border-4 border-gradient-to-r from-orange-400 to-pink-500 shadow-xl"
        />
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-100">{login}</h2>
          <p className="text-gray-400 text-lg">{name || "No name provided"}</p>
          {bio && <p className="text-gray-300 text-sm mt-2 italic">{bio}</p>}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-6 slide-up">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-300">Followers:</span>
          <span>{followers}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-300">Following:</span>
          <span>{following}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-300">Public Repos:</span>
          <span>{public_repos}</span>
        </div>
      </div>

      {/* GitHub Profile Link */}
      <div className="mt-6">
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:text-pink-500 transition-colors duration-200 ease-in-out font-semibold text-lg"
        >
          View Profile on GitHub
        </a>
      </div>
    </div>
  )
}

export default Github
