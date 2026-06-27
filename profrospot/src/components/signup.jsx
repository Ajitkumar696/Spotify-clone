import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { role } = useParams();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("https://spotify-clone-kniz.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        // Save user information
        localStorage.setItem("user", JSON.stringify(data.user));

        // Save role
        localStorage.setItem("role", role);

        // Optional: Save username
        localStorage.setItem("username", data.user.username);

        // Go to Home
        navigate("/home");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.log("Signup error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Back Button */}
      <div className="p-6">
        <ArrowLeft
          size={28}
          className="cursor-pointer hover:text-green-500"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* Signup Form */}
      <div className="flex-1 flex flex-col items-center justify-center">

        <h1 className="text-4xl font-bold mb-8">
          Sign Up as {role}
        </h1>

        <div className="flex flex-col gap-4 w-80">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded bg-[#1f1f1f] outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-[#1f1f1f] outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-[#1f1f1f] outline-none"
          />

          <button
            onClick={handleSignup}
            className="bg-green-500 text-black py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Sign Up
          </button>

        </div>

      </div>

    </div>
  );
};

export default Register;