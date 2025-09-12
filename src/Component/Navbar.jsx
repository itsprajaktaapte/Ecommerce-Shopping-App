import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import React from "react";
import { useCart } from "../Context/CartContext";
import { useUser } from "../Context/UserContext";


const Navbar = () => {

  const { cart } = useCart();

  const {user,logout} = useUser();
  const totalItems = cart?.reduce((sum, item) => sum + item.qty, 0);
  
  return (
    <div className=" max-w-screen bg-gray-900 text-white flex items-center justify-between px-6 py-3">
      {/* Logo */}
      <img className=" h-10" src={logo} alt="Company Logo" />
      <h3 className="text-white p-4 flex justify-start text-3xl ">Shopper's Stop</h3>
      <nav className="w-3/4 text-white p-4 flex justify-end gap-8 shadow-md">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        
        {user? 
        (
          <div className="flex items-center gap-3"> 
            <span>Hi, Welcome {user.name}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
          </div>
        ):
        (
          <Link to="/login" className="bg-slate-300 text-black px-3 py-1 rounded">Login</Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
