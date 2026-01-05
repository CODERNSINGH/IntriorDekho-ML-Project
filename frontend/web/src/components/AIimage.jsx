import React, { useState } from "react";

export default function AIimage() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [rewrittenPrompt, setRewrittenPrompt] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handlePromptChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    setRewrittenPrompt(value.replace("make", "update").replace("room", "space"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !prompt) return alert("Upload image and enter prompt!");
    console.log("Image:", image);
    console.log("Prompt:", prompt);
    console.log("Rewritten:", rewrittenPrompt);
  };

  return (
    <div>

    <form className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">AI Interior Designer</h2>


      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-blue-400 transition">
        {image ? (
          <img src={image} alt="uploaded" className="max-h-60 object-contain rounded" />
        ) : (
          <>
            <p className="text-gray-500">Upload Your Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            />
          </>
        )}
      </div>


      <div className="space-y-1">
        <label className="font-medium text-gray-700">Enter your prompt</label>
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="E.g., make the room cozy with modern furniture"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

    
    
        <div className="bg-gray-100 p-2 rounded text-gray-700">
          <span className="font-semibold">Prompt:</span> {rewrittenPrompt}
        </div>
 

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
      >
        Generate Interior Design
      </button>

    </form>
    </div>
  );
}
