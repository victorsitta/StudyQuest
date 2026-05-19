import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserData, Phase, Badge } from "@/data/types";
import { defaultUser, mockPhases, mockBadges } from "@/data/mockData";

interface GameContextType {
  user: UserData;
  phases: Phase[];
  badges: Badge[];
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  addXp: (amount: number) => void;
  completePhase: (phaseId: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>(defaultUser);
  const [phases, setPhases] = useState<Phase[]>(mockPhases);
  const [badges] = useState<Badge[]>(mockBadges);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const addXp = (amount: number) => {
    setUser((prev) => {
      const newXp = prev.xp + amount;
      if (newXp >= prev.maxXp) {
        return { ...prev, xp: newXp - prev.maxXp, level: prev.level + 1 };
      }
      return { ...prev, xp: newXp };
    });
  };

  const completePhase = (phaseId: number) => {
    setPhases((prev) =>
      prev.map((p, i) => {
        if (p.id === phaseId) return { ...p, completed: true };
        if (i > 0 && prev[i - 1]?.id === phaseId) return { ...p, unlocked: true };
        return p;
      })
    );
    addXp(100);
  };

  return (
    <GameContext.Provider value={{ user, phases, badges, isLoggedIn, login, logout, addXp, completePhase }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};
