import React from "react";

import banner from "../assets/images/banner.webp"
const Home = () => {
  return (
    <div className="p-6 text-center bg-gradient-to-r from-blue-300 to-green-200 w-full h-screen ">
      <h1 className="text-5xl font-bold text-green-900">Welcome Shoppers</h1>
      <p className="mt-4 text-2xl">Best deals on Clothes, Jewelry, Electronics and more!</p>
      
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
