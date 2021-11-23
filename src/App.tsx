import React from "react";

function App() {
  const wave = () => {
    console.log("Waved");
  };

  return (
    <div className="flex justify-center w-full mt-16">
      <div className="flex flex-col justify-center max-w-2xl">
        <div className="text-center text-4xl">👋 Hey there!</div>

        <div className="text-center text-gray-500 mt-4">
          I'm Andrew and I'm getting started with Web3
        </div>

        <button className="mt-4 p-2 rounded-md bg-gray-300" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}

export default App;
