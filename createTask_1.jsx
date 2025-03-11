import React from "react";

const Greeting = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Hello, {name}!</h1>
      <p className="text-gray-700 mt-2">Welcome to our website.</p>
    </div>
  );
};

const App = () => {
  return <Greeting name="John" />;
};

export default App;

//-----GPT Written ^-----//