import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    if (value.trim()) {
      navigate(`/room/${value}`);
    } else {
      alert("Please enter a room code!");
    }
  }, [navigate, value]);

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Join a Room
        </h1>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Enter room code"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
        />
        <button
          onClick={handleJoinRoom}
          className="w-full py-3 bg-violet-500 text-white font-semibold rounded-lg hover:bg-violet-600 transition duration-300"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Home;
