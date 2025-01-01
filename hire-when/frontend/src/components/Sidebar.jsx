const Sidebar = () => {
  return (
    <div className="flex h-screen w-min bg-background shadow-lg">
      <ul className="flex flex-col w-64 border-r-[1px] border-gray-300 p-6 space-y-6">
        {[
          { name: "Home", icon: "./assets/icons/home.svg" },
          { name: "Job Entry", icon: "./assets/icons/home.svg" },
          { name: "Schedule", icon: "./assets/icons/home.svg" },
          { name: "Mails", icon: "./assets/icons/home.svg" },
          { name: "HireAI", icon: "./assets/icons/home.svg" },
          { name: "Logs", icon: "./assets/icons/home.svg" },
        ].map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 text-gray-800 hover:text-accent transition-transform duration-200 cursor-pointer hover:scale-105"
          >
            <img src={item.icon} alt={item.name} className="h-6 w-6" />
            <span className="font-semibold text-lg">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
