import { useState, createContext } from "react";

export const GameContext = createContext();

function PlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <GameContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </GameContext.Provider>
  );
}

export default PlayerProvider;