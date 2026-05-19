import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserData, Phase, Badge } from "@/data/types";
import { mockPhases, mockBadges } from "@/data/mockData";

interface GameContextType {
  user: UserData;
  phases: Phase[];
  badges: Badge[];
  isLoggedIn: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
  addXp: (amount: number) => void;
  completePhase: (phaseId: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const AVATARS = ["🧑‍🎓", "👩‍🎓", "🦊", "🐼", "🐸", "🦁", "🐯", "🐧"];

function pickAvatar(name: string): string {
  const index = name.charCodeAt(0) % AVATARS.length;
  return AVATARS[index];
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>({
    name: "",
    avatar: "🧑‍🎓",
    level: 1,
    xp: 0,
    maxXp: 1000,
  });
  const [phases, setPhases] = useState<Phase[]>(mockPhases);
  const [badges, setBadges] = useState<Badge[]>(mockBadges);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (name: string, _email: string) => {
    setUser({
      name: name.trim() || "Estudante",
      avatar: pickAvatar(name),
      level: 1,
      xp: 0,
      maxXp: 1000,
    });
    setPhases(mockPhases);
    setBadges(mockBadges);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({ name: "", avatar: "🧑‍🎓", level: 1, xp: 0, maxXp: 1000 });
  };

  const addXp = (amount: number) => {
    setUser((prev) => {
      const newXp = prev.xp + amount;
      if (newXp >= prev.maxXp) {
        // Sobe de nível — desbloqueia badge de nível se existir
        const newLevel = prev.level + 1;
        setBadges((bs) =>
          bs.map((b) =>
            b.id === 5 && newLevel >= 10 ? { ...b, unlocked: true } : b
          )
        );
        return { ...prev, xp: newXp - prev.maxXp, level: newLevel };
      }
      return { ...prev, xp: newXp };
    });
  };

  const completePhase = (phaseId: number) => {
    setPhases((prev) => {
      const updated = prev.map((p, i) => {
        if (p.id === phaseId) return { ...p, completed: true };
        if (i > 0 && prev[i - 1]?.id === phaseId) return { ...p, unlocked: true };
        return p;
      });

      // Verifica badge "Primeiro Passo"
      const completedCount = updated.filter((p) => p.completed).length;
      setBadges((bs) =>
        bs.map((b) => {
          if (b.id === 1 && completedCount >= 1) return { ...b, unlocked: true };
          if (b.id === 3 && completedCount >= 3) return { ...b, unlocked: true };
          if (b.id === 6 && completedCount >= updated.length) return { ...b, unlocked: true };
          return b;
        })
      );

      return updated;
    });
    addXp(100);
  };

  return (
    <GameContext.Provider
      value={{ user, phases, badges, isLoggedIn, login, logout, addXp, completePhase }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};
