import React from "react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./main";
import Chatbot from "./components/Chatbot";
const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <div className="flex justify-center items-center h-screen">
        <Chatbot />
      </div>
    </>
  );
};

export default App;
