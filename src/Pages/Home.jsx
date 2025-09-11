import React from "react";

import banner from "../assets/images/banner.webp"
const Home = () => {
  return (
    <div className="p-6 text-center ">
      <h1 className="text-3xl font-bold text-green-900">Welcome Shoppers</h1>
      <p className="mt-4 text-lg">Best deals on clothes, jewelry, electronics and more!</p>
      
      {/* Ads */}
      <div className="mt-6 flex justify-center">
        <img 
          src={banner} 
          alt="Ad Banner"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Home;
