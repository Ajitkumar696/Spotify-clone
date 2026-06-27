import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { role } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("https://spotify-clone-kniz.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        // 🚨 CLEAR OLD STATE FIRST (VERY IMPORTANT)
        localStorage.clear();

        // save fresh user
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role.toLowerCase());
        localStorage.setItem("username", data.user.username);

        // ✅ go to home cleanly
        navigate("/home", { replace: true });

      } else {
        alert(data.message || "Invalid credentials");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Back */}
      <div className="p-6">
        <ArrowLeft
          size={28}
          className="cursor-pointer hover:text-green-500"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col items-center justify-center">

        <h1 className="text-4xl font-bold mb-8">
          Login as {role}
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-[#1f1f1f] outline-none"
          />

          <button
            onClick={handleLogin}
            className="bg-green-500 text-black py-3 rounded-full font-bold"
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;