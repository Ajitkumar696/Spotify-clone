import React from "react";
import Sidebar from "./components/Sidebar";
import Display from "./components/display";

export default function App() {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <Display />
    </div>
  );
}