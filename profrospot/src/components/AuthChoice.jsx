import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AuthChoice = () => {
  const navigate = useNavigate();
  const { role } = useParams();

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

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">

        <h1 className="text-4xl font-bold mb-10">
          Continue as {role}
        </h1>

        <div className="flex flex-col gap-5">

          <button
            onClick={() => navigate(`/login/${role}`)}
            className="bg-green-500 text-black px-10 py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate(`/signup/${role}`)}
            className="bg-zinc-800 px-10 py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Sign Up
          </button>

        </div>

      </div>
    </div>
  );
};

export default AuthChoice;