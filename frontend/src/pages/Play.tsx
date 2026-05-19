import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGame } from "@/contexts/GameContext";
import { mockQuestions } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Play = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addXp, completePhase } = useGame();

  const phaseId = (location.state as any)?.phaseId ?? 1;
  const questions = mockQuestions[phaseId] ?? mockQuestions[1];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    const correct = optionIndex === current.correct;
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
      addXp(20);
    }
    setTimeout(() => setShowModal(true), 400);
  };

  const handleNext = () => {
    setShowModal(false);
    if (isLast) {
      completePhase(phaseId);
      navigate("/dashboard");
    } else {
      setSelected(null);
      setCurrentIndex((i) => i + 1);
    }
  };

  const optionColors = [
    "bg-primary/20 hover:bg-primary/40 border-primary/30",
    "bg-secondary/20 hover:bg-secondary/40 border-secondary/30",
    "bg-accent/20 hover:bg-accent/40 border-accent/30",
    "bg-quest-gold/20 hover:bg-quest-gold/40 border-quest-gold/30",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Progress indicator */}
      <div className="flex gap-2 mb-8 animate-fade-in">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < currentIndex ? "bg-quest-mint" : i === currentIndex ? "bg-primary scale-125" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Question Card */}
      <div className="w-full max-w-lg rounded-3xl bg-card p-8 shadow-sm animate-fade-in">
        <p className="text-xs text-muted-foreground mb-2 font-semibold">
          Questão {currentIndex + 1} de {questions.length}
        </p>
        <h2 className="text-xl font-bold text-foreground mb-8">{current.question}</h2>

        <div className="space-y-3">
          {current.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`
                w-full text-left rounded-full px-6 py-4 text-base font-medium border-2
                transition-all duration-300
                ${selected === null
                  ? `${optionColors[i]} text-foreground`
                  : selected === i
                    ? i === current.correct
                      ? "bg-quest-mint/40 border-quest-mint text-foreground"
                      : "bg-destructive/20 border-destructive/40 text-foreground"
                    : i === current.correct
                      ? "bg-quest-mint/40 border-quest-mint text-foreground"
                      : "bg-muted border-muted text-muted-foreground opacity-50"
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="rounded-3xl max-w-sm text-center">
          <DialogHeader className="items-center">
            <div className="text-5xl mb-2">{isCorrect ? "🎉" : "💡"}</div>
            <DialogTitle className="text-2xl font-bold">
              {isCorrect
                ? isLast
                  ? "Nível Concluído!"
                  : "Muito bem!"
                : "Quase lá!"}
            </DialogTitle>
            <DialogDescription className="text-base">
              {isCorrect
                ? isLast
                  ? `Você acertou ${score} de ${questions.length} questões! +100 XP`
                  : "Resposta correta! Continue assim. +20 XP"
                : `A resposta certa era: "${current.options[current.correct]}". Não desista!`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center">
            <Button
              onClick={handleNext}
              className="rounded-full px-8 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300"
            >
              {isLast ? "Voltar ao Mapa" : "Próxima Questão"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Play;
