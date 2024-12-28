const Card = ({ imgSoruce, name, rating, area = "", price = "", children }) => {
  return (
    <div className="mx-3 my-3 flex flex-col justify-between bg-gray-800 min-w-40 h-[380px] p-2 rounded-lg shadow-[0px_10px_20px_0px_#141414]">
      {imgSoruce && (
        <img
          className="w-full h-56 object-cover rounded-lg"
          src={imgSoruce}
          alt="restaurant image"
        />
      )}
      {name && (
        <span className="text-white my-1 font-bold text-xl">
          {name.length >= 45 ? name.slice(0, 45) + "..." : name}
        </span>
      )}
      {rating && <h1 className="text-orange-400 font-bold text-md">Rating: {rating} / 5</h1>}
      {area && <p className="text-blue-300 my-1">{area.toLowerCase()}</p>}
      {price && <h1 className="text-orange-400 font-bold text-md">Price: {price}</h1>}
      {children}
    </div>
  )
}

export default Card
