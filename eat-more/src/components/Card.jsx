const Card = ({ imgSource, name, rating, area = "", price = "", children }) => {
  console.log(rating)

  return (
    <div className="mx-3 my-1 border-gray-300 border-[1px] flex flex-col bg-gray-100 min-w-40 p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      {imgSource && (
        <img
          className="w-full h-56 object-cover rounded-2xl"
          src={imgSource}
          alt="restaurant image"
        />
      )}
      {name && (
        <span className="text-green-950 font-bold text-[1.1rem] mt-4 mb-1">
          {name.length >= 27 ? name.slice(0, 27) + "..." : name}
        </span>
      )}
      {rating && (
        <h1 className="text-yellow-500 font-semibold">
          {"⭐".repeat(rating) + " (" + rating + ")"}
        </h1>
      )}
      {area && (
        <p className="text-gray-600 font-semibold">
          {area.length >= 27
            ? area.slice(0, 1).toUpperCase() + area.slice(1).toLowerCase().slice(0, 27) + "..."
            : area.slice(0, 1).toUpperCase() + area.slice(1).toLowerCase()}
        </p>
      )}
      {price && <h1 className="text-orange-400 font-semibold text-lg">Price: {price}</h1>}
      {children}
    </div>
  )
}

export default Card
