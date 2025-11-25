import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-game-bg text-center px-6">
      <h1 className="text-6xl font-gaming font-bold mb-4 text-game-accent">404</h1>
      <p className="text-gray-400 mb-6 max-w-md">
        The character you are looking for does not exist or the link is invalid.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#bcffff] text-[#0a0e17] font-bold rounded shadow-glow hover:bg-opacity-80 transition"
        >
          Return Home
        </button>
        <button
          onClick={() => navigate('/roll')}
          className="px-6 py-3 border border-[#bcffff] text-[#bcffff] font-semibold rounded hover:bg-[#1a2436] transition"
        >
          Spin New
        </button>
      </div>
    </div>
  );
};

export default NotFound;
