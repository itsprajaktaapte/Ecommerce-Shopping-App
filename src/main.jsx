import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import Cart from "./Pages/Cart.jsx";
import Login from "./Pages/Login.jsx";
import Products from "./Pages/Products.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import Checkout from "./Pages/Checkout.jsx";
import { WishlistProvider } from "./Context/WishlistContext.jsx";
import WishList from "./Pages/WishList.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/favorite", element: <WishList /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>  
      <UserProvider>
        <WishlistProvider>
        <RouterProvider router={router} />
        </WishlistProvider>
      </UserProvider>
    </CartProvider>
  </React.StrictMode>
);
