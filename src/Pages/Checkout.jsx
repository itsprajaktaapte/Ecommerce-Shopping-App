import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form submitted:", data); // Clear the form immediately
    reset();

    setSuccessMsg("Order placed successfully!"); // Show success message

    // After 2 seconds, hide message and redirect
    setTimeout(() => {
      setSuccessMsg("");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Checkout</h2>

        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Address"
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Phone"
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("phone", {
              required: "Phone is required",
              pattern: { value: /^\d{10}$/, message: "Phone must be 10 digits" },
            })}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg w-full font-semibold hover:bg-green-700 transition-colors"
        >
          Place Order
        </button>

        {/* Success message */}
        {successMsg && (
          <p className="text-green-600 text-center font-medium mt-4">{successMsg}</p>
        )}
      </form>
    </div>
  );
};

export default Checkout;
