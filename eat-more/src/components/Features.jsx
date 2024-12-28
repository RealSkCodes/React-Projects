import Section from "./Section.jsx"

const Features = () => {
  return (
    <div className="bg-[#2C3E50] p-10 h-3/5 w-3/5 mx-auto text-white shadow-[5px_5px_10px_3px_#141414] rounded-md">
      <div className="max-w-4xl mx-auto">
        <Section
          title="About 'Eat More'"
          content="Welcome to 'Eat More', your go-to app for discovering the best local restaurants near you.
          Our platform makes it easy to browse through a selection of restaurants, view detailed information, 
          and explore their menu offerings, all in one place."
          centerTitle
        />

        <Section
          title="Our Mission"
          content="At 'Eat More', we focus on providing a seamless user experience. Simply visit the homepage 
          to find a list of nearby restaurants, click on one to explore its details like cuisines, area, ratings, 
          and dishes offered. Add your favorite dishes to the cart and place your order with ease."
        />

        <Section
          content="Whether you are a foodie looking to try something new, or just need a quick bite, 'Eat More' 
          has got you covered. We aim to make dining out simpler and more enjoyable by connecting you with local 
          culinary delights."
        />

        <Section content="Feel free to explore, discover new places, and enjoy your food journey with us!" />

        <Section content="Created with ❤️ by RealSK." centerTitle />
      </div>
    </div>
  )
}

export default Features
