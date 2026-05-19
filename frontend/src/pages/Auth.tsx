import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Mail, Lock, User, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Tab = "login" | "register";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

// ─── Validações ───────────────────────────────────────────────────────────────
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(tab: Tab, name: string, email: string, password: string): FormErrors {
  const errors: FormErrors = {};

  if (tab === "register") {
    if (!name.trim()) errors.name = "Como você quer ser chamado?";
    else if (name.trim().length < 2) errors.name = "Nome muito curto. Mínimo 2 letras.";
  }

  if (!email.trim()) errors.email = "Digite seu e-mail.";
  else if (!validateEmail(email)) errors.email = "E-mail inválido. Exemplo: nome@email.com";

  if (!password) errors.password = "Digite sua senha.";
  else if (tab === "register" && password.length < 6)
    errors.password = "Senha muito curta. Use pelo menos 6 caracteres.";

  return errors;
}

// ─── Componente de campo com feedback visual ──────────────────────────────────
function Field({
  label,
  icon,
  error,
  accentColor,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${accentColor}`}>
        {icon} {label}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2 text-sm text-rose-400 font-semibold bg-rose-500/10 px-3 py-2 rounded-xl border border-rose-500/20"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
const Auth = () => {
  const navigate = useNavigate();
  const { login } = useGame();

  const [tab, setTab] = useState<Tab>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Limpa erros ao trocar de aba
  const switchTab = (t: Tab) => {
    setTab(t);
    setErrors({});
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(tab, name, email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Foca no primeiro campo com erro (acessibilidade)
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(`field-${firstErrorKey}`)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);

    // Simula chamada à API (300ms para dar sensação de resposta real)
    await new Promise((r) => setTimeout(r, 300));

    const displayName = tab === "register" ? name : email.split("@")[0];
    login(displayName, email);

    setSuccess(true);
    setLoading(false);

    // Pequena pausa para o usuário ver o feedback de sucesso antes de navegar
    await new Promise((r) => setTimeout(r, 600));
    navigate("/dashboard");
  };

  const isLogin = tab === "login";
  const accentColor = isLogin ? "text-purple-400" : "text-emerald-400";
  const btnGradient = isLogin
    ? "from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 shadow-[0_8px_25px_rgba(147,51,234,0.4)]"
    : "from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 shadow-[0_8px_25px_rgba(16,185,129,0.4)]";

  return (
    <div className="min-h-screen bg-[#0A0A1A] flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Fundo suave — sem movimento excessivo para não distrair */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] bg-purple-600/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-emerald-500/20 blur-[160px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[480px] z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-[0_8px_30px_rgba(147,51,234,0.4)]">
            <Gamepad2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white">
            Study<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Quest</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">
            Sua aventura de aprendizado começa aqui
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[2rem] bg-[#12122A]/95 backdrop-blur-xl border-2 border-white/10 p-8 shadow-2xl">

          {/* Abas — grandes e claras */}
          <div
            className="grid grid-cols-2 rounded-2xl bg-[#0A0A1A] p-1.5 mb-8 gap-1"
            role="tablist"
            aria-label="Escolha entre entrar ou criar conta"
          >
            {(["login", "register"] as Tab[]).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => switchTab(t)}
                className={`
                  py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200
                  ${tab === t
                    ? t === "login"
                      ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                      : "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    : "text-slate-400 hover:text-slate-200"
                  }
                `}
              >
                {t === "login" ? "Entrar" : "Criar Conta"}
              </button>
            ))}
          </div>

          {/* Instrução clara — importante para TDAH/autismo */}
          <p className="text-slate-400 text-sm mb-6 text-center">
            {isLogin
              ? "Preencha seu e-mail e senha para continuar."
              : "Crie sua conta gratuita em menos de 1 minuto."}
          </p>

          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              initial={{ opacity: 0, x: isLogin ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 16 : -16 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
              aria-label={isLogin ? "Formulário de login" : "Formulário de cadastro"}
            >
              {/* Campo Nome (só no cadastro) */}
              {!isLogin && (
                <Field label="Seu nome" icon={<User className="w-4 h-4" />} error={errors.name} accentColor="text-emerald-400">
                  <Input
                    id="field-name"
                    placeholder="Como quer ser chamado?"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
                    autoComplete="name"
                    aria-describedby={errors.name ? "error-name" : undefined}
                    aria-invalid={!!errors.name}
                    className={`bg-[#0A0A1A] border-2 rounded-2xl h-14 px-5 text-base font-medium text-white transition-all
                      ${errors.name ? "border-rose-500 focus-visible:ring-rose-500" : "border-slate-700/50 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"}`}
                  />
                </Field>
              )}

              {/* Campo E-mail */}
              <Field label="E-mail" icon={<Mail className="w-4 h-4" />} error={errors.email} accentColor={accentColor}>
                <Input
                  id="field-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={`bg-[#0A0A1A] border-2 rounded-2xl h-14 px-5 text-base font-medium text-white transition-all
                    ${errors.email ? "border-rose-500 focus-visible:ring-rose-500" : `border-slate-700/50 ${isLogin ? "focus-visible:ring-purple-500 focus-visible:border-purple-500" : "focus-visible:ring-emerald-500 focus-visible:border-emerald-500"}`}`}
                />
              </Field>

              {/* Campo Senha */}
              <Field
                label={isLogin ? "Senha" : "Criar senha"}
                icon={<Lock className="w-4 h-4" />}
                error={errors.password}
                accentColor={accentColor}
              >
                <Input
                  id="field-password"
                  type="password"
                  placeholder={isLogin ? "••••••••" : "Mínimo 6 caracteres"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined })); }}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  aria-invalid={!!errors.password}
                  className={`bg-[#0A0A1A] border-2 rounded-2xl h-14 px-5 text-base font-medium text-white transition-all
                    ${errors.password ? "border-rose-500 focus-visible:ring-rose-500" : `border-slate-700/50 ${isLogin ? "focus-visible:ring-purple-500 focus-visible:border-purple-500" : "focus-visible:ring-emerald-500 focus-visible:border-emerald-500"}`}`}
                />
              </Field>

              {/* Feedback de sucesso */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-emerald-400 font-semibold bg-emerald-500/10 px-4 py-3 rounded-2xl border border-emerald-500/20"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    {isLogin ? "Entrando..." : "Conta criada! Entrando..."}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botão principal */}
              <motion.div whileTap={{ scale: 0.97 }} className="pt-2">
                <Button
                  type="submit"
                  disabled={loading || success}
                  className={`w-full rounded-2xl h-14 text-base font-bold uppercase tracking-wider bg-gradient-to-r ${btnGradient} text-white border-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                  aria-label={isLogin ? "Entrar na conta" : "Criar minha conta"}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Aguarde...
                    </span>
                  ) : isLogin ? (
                    <span className="flex items-center gap-2">
                      Entrar <ArrowRight className="w-5 h-5" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Criar Conta <Sparkles className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* Link para trocar de aba — alternativa textual clara */}
              <p className="text-center text-sm text-slate-500 pt-1">
                {isLogin ? (
                  <>
                    Não tem conta?{" "}
                    <button
                      type="button"
                      onClick={() => switchTab("register")}
                      className="text-emerald-400 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
                    >
                      Criar agora
                    </button>
                  </>
                ) : (
                  <>
                    Já tem conta?{" "}
                    <button
                      type="button"
                      onClick={() => switchTab("login")}
                      className="text-purple-400 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                    >
                      Entrar
                    </button>
                  </>
                )}
              </p>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
