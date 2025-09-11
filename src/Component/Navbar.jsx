import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import React from "react";
import { useCart } from "../Context/CartContext";



const Navbar = () => {

  const { cart } = useCart();
  const totalItems = cart?.reduce((sum, item) => sum + item.qty, 0);
  
  return (
    <div className=" max-w-screen bg-gray-900 text-white flex items-center justify-between px-6 py-3">
      {/* Logo */}
      <img className=" h-10" src={logo} alt="Company Logo" />
      <h3 className="text-white p-4 flex justify-start">Prajakta's Shopping Cart</h3>
      <nav className="w-3/4 text-white p-4 flex justify-end gap-8 shadow-md">
        <Link to="/">Home</Link>
        <Link to="/Products">Products</Link>
        <Link to="/Cart">Cart ({totalItems})</Link>
      </nav>
    </div>
  );
};

export default Navbar;
