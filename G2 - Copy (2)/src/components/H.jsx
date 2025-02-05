import React, { useState } from "react";
import BottomPopup from "./BottomPopUp";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="fixed bottom-8 right-8 bg-purple-500 text-white p-4 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        ⭕
      </button>

      <BottomPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default HomePage;
