import React, { useState } from 'react'
import { useUser } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const {login} = useUser();
    const navigate = useNavigate();

    const[username,setUserName]=useState("")
    const[password,setPassword] = useState("");
    const [error, setError] = useState("");

const handleLogin = (e) => {e.preventDefault();
  !username.trim() 
    ? setError("Please enter a username.")
    : (setError(""), login(username), navigate("/")); //navigate to home page once logged in
   };

    return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-3 max-w-sm">
        <input
          type="text"
          placeholder="Enter Your Name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login