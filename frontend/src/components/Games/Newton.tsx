import React, { useState, useRef, useCallback, useEffect } from 'react';

type TabType = 'teoria' | 'simulador' | 'quiz';

interface Question { question: string; options: string[]; correctAnswer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; progress: number; theory: React.ReactNode; quiz: Question[]; }

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
    
    body { margin: 0; background-color: #050a15; color: #CBD5E1; font-family: 'Inter', sans-serif; overflow-x: hidden; }
    * { box-sizing: border-box; }
    h1, h2, h3, h4, .cyberpunk-font { font-family: 'Chakra Petch', sans-serif; text-transform: uppercase; }
    
    .neon-text-blue { color: #00F0FF; text-shadow: 0 0 5px rgba(0,240,255,0.5), 0 0 10px rgba(0,240,255,0.3); }
    .neon-text-green { color: #39FF14; text-shadow: 0 0 5px rgba(57,255,20,0.5), 0 0 10px rgba(57,255,20,0.3); }
    .neon-text-pink { color: #FF00E6; text-shadow: 0 0 5px rgba(255,0,230,0.5), 0 0 10px rgba(255,0,230,0.3); }

    .glass-panel {
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 240, 255, 0.2);
      border-radius: 12px;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.5), 0 0 15px rgba(0, 10, 20, 0.5);
    }
    
    .card-mission {
      background: rgba(11, 17, 32, 0.8);
      border: 1px solid #1E293B;
      border-radius: 16px;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      display: flex; flex-direction: column; height: 100%; position: relative; overflow: hidden;
    }
    .card-mission::before {
      content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
      background: linear-gradient(to right, transparent, rgba(0,240,255,0.1), transparent);
      transform: skewX(-20deg); transition: 0.5s;
    }
    .card-mission:hover::before { left: 150%; }
    .card-mission:hover {
      transform: translateY(-5px) scale(1.02);
      border-color: #00F0FF;
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.15), inset 0 0 15px rgba(0, 240, 255, 0.05);
    }
    
    .btn-cyber {
      font-family: 'Chakra Petch', sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
      border-radius: 6px; cursor: pointer; transition: all 0.2s ease; position: relative; overflow: hidden;
    }
    .btn-cyber:active { transform: scale(0.96); }
    .btn-cyber.primary {
      background: rgba(0, 240, 255, 0.1); border: 1px solid #00F0FF; color: #00F0FF; box-shadow: 0 0 10px rgba(0,240,255,0.2);
    }
    .btn-cyber.primary:hover {
      background: #00F0FF; color: #050a15; box-shadow: 0 0 20px rgba(0,240,255,0.6);
    }
    .btn-cyber.success {
      background: rgba(57, 255, 20, 0.1); border: 1px solid #39FF14; color: #39FF14;
    }
    .btn-cyber.success:hover {
      background: #39FF14; color: #050a15; box-shadow: 0 0 20px rgba(57,255,20,0.6);
    }

    /* Range Slider */
    input[type=range] { -webkit-appearance: none; width: 100%; background: transparent; margin: 15px 0; }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%; background: #00F0FF;
      cursor: pointer; margin-top: -8px; border: 2px solid #050a15; box-shadow: 0 0 10px #00F0FF;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%; height: 6px; cursor: pointer; background: rgba(255,255,255,0.1); border-radius: 3px;
    }

    .grid-bg {
      background-size: 50px 50px;
      background-image: 
        linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
    }
  `}</style>
);

const topicsData: Topic[] = [
  {
    id: 'intro', title: 'Missão 1: A Regra Mestra', icon: '⚡', progress: 0,
    description: 'A 2ª Lei de Newton: O código base que controla todo o movimento do universo.',
    theory: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', fontSize: '1.1rem' }}>
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 className="neon-text-blue" style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📜</span> 1. A Fórmula Matrix (2ª Lei)
          </h2>
          <p>Para mover qualquer objeto na Matrix, aplicamos uma Força. A relação sagrada é:</p>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '25px', borderRadius: '12px', border: '1px solid #00F0FF', fontSize: '2.5rem', margin: '20px 0', textAlign: 'center', color: '#FFF' }}>
            <span className="neon-text-blue">F</span> = <span className="neon-text-pink">m</span> &times; <span className="neon-text-green">a</span>
          </div>
          <p>Onde <strong className="neon-text-blue">F</strong> é a Força Total Resultante (em Newtons), <strong className="neon-text-pink">m</strong> é a massa do objeto (Kg) e <strong className="neon-text-green">a</strong> é a aceleração gerada.</p>
        </div>

        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 className="neon-text-pink" style={{ marginTop: 0 }}>🎒 2. Arsenal de Forças</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#3B82F6' }}>🌍 Peso (P)</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#94A3B8' }}>A atração gravitacional (P = m.g). Puxa sempre pro centro do planeta.</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #EAB308' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#EAB308' }}>🛡️ Normal (N)</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#94A3B8' }}>A reação do chão. Evita que você bug e atravesse o assoalho.</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #8B5CF6' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#8B5CF6' }}>🪢 Tração (T)</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#94A3B8' }}>A força de puxão transmitida por cordas/correntes esticadas.</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #EF4444' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#EF4444' }}>👟 Atrito (Fat)</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#94A3B8' }}>O boss da resistência. Depende da rugosidade do chão (μ).</p>
            </div>
          </div>
        </div>
      </div>
    ),
    quiz: [
      { question: "Qual a fórmula suprema da Dinâmica (Segunda Lei de Newton)?", options: ["V = d/t", "E = mc²", "F = m.a", "P = m.g.h"], correctAnswer: 2, explanation: "Acertou hacker! F = m.a é a base do motor físico do nosso universo." },
      { question: "O que a Força Normal (N) representa?", options: ["A gravidade do planeta", "A resistência do ar", "Uma força mágica", "A reação de uma superfície contra um objeto"], correctAnswer: 3, explanation: "Perfeito. É a superfície empurrando o objeto reagindo à compressão." },
      { question: "Se um bloco tem 10kg e sofre uma aceleração de 5 m/s², qual a força resultante nele?", options: ["50 N", "15 N", "2 N", "10 N"], correctAnswer: 0, explanation: "Isso! 10kg * 5m/s² = 50 Newtons de Força." }
    ]
  },
  {
    id: 'polias', title: 'Missão 2: Hackeando com Polias', icon: '⚙️', progress: 0,
    description: 'Como enganar a física usando cordas e rodas guiadas (Máquina de Atwood).',
    theory: (
      <div className="glass-panel" style={{ padding: '30px', fontSize: '1.1rem' }}>
        <h2 className="neon-text-blue">O Truque das Polias</h2>
        <p>Polias (ou roldanas) são como roteadores: mudam a direção do pacote de força na rede (a corda). A tensão (Tração) é repassada em todo o fio.</p>
        <ul style={{ color: '#E2E8F0', paddingLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>Polia Fixa:</strong> Apenas redireciona a força. O esforço é o mesmo.</li>
          <li><strong>Polia Móvel:</strong> Reduz o Ping (esforço) pela metade! Ela divide a carga com o teto.</li>
          <li><strong>Fórmula do ganho mecânico (Polias móveis iteradas):</strong> F_aplicada = Peso / 2^n (Onde n = número de polias móveis).</li>
        </ul>
      </div>
    ),
    quiz: [
      { question: "O que acontece ao usar uma polia móvel para içar um peso?", options: ["A corda rompe", "O peso aumenta o dobro", "A força necessária cai pela metade", "Não tem vantagem mecânica"], correctAnswer: 2, explanation: "Correto! A polia móvel age dividindo a força entre você e o teto/suporte." }
    ]
  },
  {
    id: 'rampa', title: 'Missão 3: Bug Visual (O Plano Inclinado)', icon: '📐', progress: 0,
    description: 'A gravidade funciona de um jeito diferente quando o chão fica torto.',
    theory: (
      <div className="glass-panel" style={{ padding: '30px', fontSize: '1.1rem', lineHeight: '1.8' }}>
        <h2 className="neon-text-green">Desconstruindo Vetores na Rampa</h2>
        <p>Ao inclinar o chão da fase, nossa gravidade vira um vetor que precisa ser decomposto:</p>
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '8px', border: '1px dashed #39FF14', margin: '20px 0' }}>
          <ul style={{ margin: 0 }}>
            <li><strong className="neon-text-pink">Px (O Deslizador):</strong> P * sen(θ) → A parte do peso que joga o bloco rampa abaixo.</li>
            <li><strong className="neon-text-blue">Py (A Compressão):</strong> P * cos(θ) → A parte do peso que esmaga o bloco no piso torto (equivale a Normal N nesse cenário simpes).</li>
          </ul>
        </div>
        <p>Quanto mais alta a inclinação, maior o <code>Px</code> e menor a <code>Normal</code> (o atrito e a aderência caem drasticamente).</p>
      </div>
    ),
    quiz: [
      { question: "No plano inclinado (sem atrito), qual é a componente da força Peso responsável por fazer o objeto descer a rampa?", options: ["Normal (N)", "Tração (T)", "Equilíbrio", "Peso x (Px)"], correctAnswer: 3, explanation: "Exato! Px é a fatia do peso que aponta para baixo da ladeira." }
    ]
  }
];

export default function NewtonFisica() {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const activeTopic = topicsData.find(t => t.id === activeTopicId);

  return (
    <div style={{ minHeight: '100vh', padding: '20px', position: 'relative' }}>
      <GlobalStyles />
      <div className="grid-bg" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, opacity: 0.5 }}></div>
      
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* TOP HUD */}
        <div className="glass-panel" style={{ padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '2.5rem', background: '#050a15', padding: '15px', borderRadius: '50%', border: '2px solid #00F0FF', boxShadow: '0 0 15px rgba(0,240,255,0.4)', display: 'flex' }}>👨‍🚀</div>
            <div>
              <h2 className="cyberpunk-font neon-text-blue" style={{ margin: 0, fontSize: '1.4rem', letterSpacing: '1px' }}>SYS.USER // NEWTON</h2>
              <span style={{ color: '#94A3B8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Patente: Space Cadet</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="cyberpunk-font" style={{ color: '#39FF14', fontSize: '1.3rem', marginBottom: '5px' }}>NÍVEL_01</div>
            <div style={{ width: '180px', height: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '5px', overflow: 'hidden', border: '1px solid #1E293B' }}>
              <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, #00F0FF, #39FF14)', boxShadow: '0 0 10px #39FF14' }}></div>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontFamily: 'monospace' }}>XP_450/1000</span>
          </div>
        </div>

        {!activeTopic ? (
          <div>
            <h1 className="cyberpunk-font neon-text-blue" style={{ fontSize: '3rem', marginBottom: '5px', textAlign: 'center' }}>PAINEL_DE_MISSÕES</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.2rem', marginBottom: '50px', textAlign: 'center', letterSpacing: '1px' }}>&gt;&gt;&gt; SELECIONE O MÓDULO DE TREINAMENTO</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              {topicsData.map((topic, index) => (
                <div key={topic.id} className="card-mission" onClick={() => setActiveTopicId(topic.id)} style={{ padding: '30px', cursor: 'pointer', zIndex: 2 }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '20px', filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.8))' }}>{topic.icon}</div>
                  <h3 className="cyberpunk-font" style={{ color: '#E2E8F0', margin: '0 0 15px 0', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>{topic.title}</h3>
                  <p style={{ color: '#94A3B8', flex: 1, margin: '0 0 25px 0', lineHeight: '1.6' }}>{topic.description}</p>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px', color: '#94A3B8', fontFamily: 'monospace' }}>
                      <span>Sincronização</span> <span>{topic.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.5)', borderRadius: '2px' }}>
                      <div style={{ width: `${topic.progress}%`, height: '100%', background: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <TopicView topic={activeTopic} onBack={() => setActiveTopicId(null)} />
        )}
      </div>
    </div>
  );
}

function TopicView({ topic, onBack }: { topic: Topic, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('teoria');

  const getTabStyle = (tab: TabType) => {
    const isActive = activeTab === tab;
    return {
      padding: '15px 20px', cursor: 'pointer', flex: 1, marginRight: '8px',
      backgroundColor: isActive ? 'rgba(0, 240, 255, 0.1)' : 'rgba(15, 23, 42, 0.5)',
      color: isActive ? '#00F0FF' : '#94A3B8',
      border: isActive ? '1px solid #00F0FF' : '1px solid #1E293B',
      borderBottom: 'none', borderRadius: '8px 8px 0 0',
      fontFamily: 'Chakra Petch, sans-serif', textTransform: 'uppercase' as const, fontSize: '1.1rem', fontWeight: 'bold',
      transition: 'all 0.3s',
      boxShadow: isActive ? 'inset 0 10px 20px -10px rgba(0,240,255,0.5)' : 'none'
    };
  };

  return (
    <div className="fade-in" style={{ animation: 'fadeIn 0.5s' }}>
      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '25px' }}>
        <div>
          <h2 className="cyberpunk-font neon-text-blue" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '15px', fontSize: '2rem' }}>
            <span>{topic.icon}</span> {topic.title}
          </h2>
          <p style={{ margin: '8px 0 0 0', color: '#94A3B8', fontFamily: 'monospace' }}>STATUS: Online | CONEXÃO: Estável</p>
        </div>
        <button className="btn-cyber" onClick={onBack} style={{ padding: '12px 25px', background: 'transparent', border: '1px solid #EF4444', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>ᐊ</span> ABORTAR_MISSÃO
        </button>
      </div>

      <div style={{ display: 'flex' }}>
        <button style={getTabStyle('teoria')} onClick={() => setActiveTab('teoria')}>[I] LOG_DE_DADOS</button>
        <button style={getTabStyle('simulador')} onClick={() => setActiveTab('simulador')}>[II] SIMULAÇÃO.EXE</button>
        <button style={getTabStyle('quiz')} onClick={() => setActiveTab('quiz')}>[III] TESTE_FINAL</button>
      </div>

      <div className="glass-panel" style={{ border: '1px solid #00F0FF', borderRadius: '0 0 16px 16px', padding: '40px', borderTop: 'none', boxShadow: '0 20px 30px rgba(0,240,255,0.05)' }}>
        {activeTab === 'teoria' && topic.theory}
        {activeTab === 'simulador' && <SimulatorSwitch topicId={topic.id} />}
        {activeTab === 'quiz' && <QuizEngine questions={topic.quiz} />}
      </div>
    </div>
  );
}

function SimulatorSwitch({ topicId }: { topicId: string }) {
  if (topicId === 'intro') return <SimuladorBloco />;
  if (topicId === 'polias') return <SimuladorPolia />;
  if (topicId === 'rampa') return <SimuladorRampa />;
  return <p>Simulador offline.</p>;
}

function SimuladorBloco() {
  const [force, setForce] = useState(50); const [mass, setMass] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  
  const acceleration = (force / mass).toFixed(2);

  const resetSimulation = useCallback(() => {
    cancelAnimationFrame(animationRef.current); setIsRunning(false);
    if (blockRef.current) blockRef.current.style.transform = `translateX(0px)`;
  }, []);

  const startSimulation = useCallback(() => {
    resetSimulation(); setIsRunning(true);
    const accel = force / mass; const visualAccel = accel * 0.2; 
    let pos = 0, vel = 0;
    const trackWidth = trackRef.current ? trackRef.current.offsetWidth - 120 : 600;

    const animate = () => {
      vel += visualAccel; pos += vel;
      if (blockRef.current) {
        if (pos >= trackWidth) { blockRef.current.style.transform = `translateX(${trackWidth}px)`; setIsRunning(false); return; }
        blockRef.current.style.transform = `translateX(${pos}px)`; animationRef.current = requestAnimationFrame(animate);
      }
    };
    animate();
  }, [force, mass, resetSimulation]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
         {/* Controls */}
        <div style={{ flex: 2, minWidth: '300px', background: 'rgba(0,0,0,0.5)', padding: '25px', borderRadius: '12px', border: '1px solid #1E293B' }}>
          <h3 className="cyberpunk-font neon-text-blue" style={{ margin: '0 0 25px 0' }}>PAINEL DE CONTROLE</h3>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', color: '#E2E8F0', fontFamily: 'monospace' }}>
              <span>FORÇA MOTRIZ (N)</span> <span className="neon-text-blue">{force}</span>
            </label>
            <input type="range" min="10" max="200" value={force} onChange={e => {setForce(Number(e.target.value)); resetSimulation();}} disabled={isRunning} />
          </div>
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', color: '#E2E8F0', fontFamily: 'monospace' }}>
              <span>MASSA_DO_CHASSI (KG)</span> <span className="neon-text-pink">{mass}</span>
            </label>
            <input type="range" min="1" max="50" value={mass} onChange={e => {setMass(Number(e.target.value)); resetSimulation();}} disabled={isRunning} />
          </div>
        </div>
        {/* Graph */}
        <div style={{ flex: 1, minWidth: '200px', background: 'rgba(0,0,0,0.5)', padding: '30px', borderRadius: '12px', border: '1px dashed #39FF14', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: '#94A3B8', fontFamily: 'monospace', marginBottom: '10px' }}>LOG DE ACELERAÇÃO</div>
          <div className="neon-text-green" style={{ fontSize: '3.5rem', fontFamily: 'Chakra Petch' }}>{acceleration}</div>
          <div style={{ color: '#39FF14', fontFamily: 'monospace' }}>m/s²</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button className="btn-cyber primary" onClick={startSimulation} disabled={isRunning} style={{ padding: '15px 40px', fontSize: '1.2rem' }}>{'▶ LIGAR_MOTORES'}</button>
        <button className="btn-cyber" onClick={resetSimulation} style={{ padding: '15px 40px', fontSize: '1.2rem', background: 'transparent', border: '1px solid #94A3B8', color: '#94A3B8' }}>{'[ RESET ]'}</button>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.8)', padding: '20px', borderRadius: '16px', border: '1px solid #1E293B', position: 'relative' }}>
         <div ref={trackRef} className="grid-bg" style={{ width: '100%', height: '180px', borderRadius: '8px', position: 'relative', overflow: 'hidden', borderBottom: '2px solid #00F0FF' }}>
           <div style={{ position: 'absolute', bottom: '90px', left: '20px', color: '#00F0FF', display: 'flex', alignItems: 'center', width: `${force + 40}px`, zIndex: 5, fontFamily: 'monospace', transition: 'width 0.2s' }}>
             <div style={{ height: '2px', background: '#00F0FF', flex: 1 }}></div>
             <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid #00F0FF' }}></div>
             <span style={{ marginLeft: '10px', textShadow: '0 0 5px #00F0FF' }}>{force}N</span>
           </div>
           <div ref={blockRef} style={{ width: '80px', height: '80px', background: 'rgba(255, 0, 230, 0.2)', backdropFilter: 'blur(5px)', border: '2px solid #FF00E6', position: 'absolute', bottom: 0, left: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFF', borderRadius: '8px', boxShadow: '0 0 15px rgba(255,0,230,0.3)', zIndex: 10 }}>
             <span style={{ fontFamily: 'Chakra Petch', fontSize: '1.2rem', fontWeight: 'bold' }}>{mass}kg</span>
           </div>
         </div>
      </div>
    </div>
  );
}

// Simulador simplificado de Polias
function SimuladorPolia() {
  const [kg, setKg] = useState(100);
  const [polias, setPolias] = useState(1);
  const forcaNecessaria = (kg * 10) / Math.pow(2, polias);

  return (
    <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
      <h3 className="cyberpunk-font neon-text-blue">CALCULADORA DE VANTAGEM MECÂNICA</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
        <div>
          <label style={{ display: 'block', color: '#E2E8F0', marginBottom: '10px' }}>Massa da Carga (kg): <span className="neon-text-pink">{kg}</span></label>
          <input type="range" min="10" max="500" step="10" value={kg} onChange={e => setKg(Number(e.target.value))} />
          <label style={{ display: 'block', color: '#E2E8F0', marginTop: '20px', marginBottom: '10px' }}>Polias Móveis Equipadas: <span className="neon-text-blue">{polias}</span></label>
          <input type="range" min="0" max="4" value={polias} onChange={e => setPolias(Number(e.target.value))} />
        </div>
        <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #39FF14', padding: '30px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ margin: 0, color: '#94A3B8', fontFamily: 'monospace' }}>Força Aplicada Necessária</p>
          <div className="neon-text-green" style={{ fontSize: '4rem', fontFamily: 'Chakra Petch', margin: '10px 0' }}>{forcaNecessaria}<span style={{fontSize: '2rem'}}>N</span></div>
          <p style={{ margin: 0, color: '#39FF14', fontSize: '0.9rem' }}>Peso Original: {kg * 10}N</p>
        </div>
      </div>
    </div>
  );
}

// Simulador simplificado da Rampa
function SimuladorRampa() {
  const [angle, setAngle] = useState(30);
  const weight = 100; // N
  const radian = (angle * Math.PI) / 180;
  const px = (weight * Math.sin(radian)).toFixed(1);
  const py = (weight * Math.cos(radian)).toFixed(1);

  return (
    <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
      <h3 className="cyberpunk-font neon-text-blue">ANÁLISE DE PLANO INCLINADO</h3>
      <div style={{ margin: '30px 0' }}>
         <label style={{ color: '#E2E8F0', fontSize: '1.2rem' }}>Inclinação da Rampa: <span className="neon-text-blue">{angle}°</span></label>
         <input type="range" min="0" max="89" value={angle} onChange={e => setAngle(Number(e.target.value))} style={{ maxWidth: '400px', display: 'block', margin: '15px auto' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
         <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '8px', border: '1px solid #00F0FF', width: '200px' }}>
           <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Deslizamento (Px)</div>
           <div className="neon-text-blue" style={{ fontSize: '2rem', marginTop: '10px', fontFamily: 'monospace' }}>{px} N</div>
         </div>
         <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '8px', border: '1px solid #FF00E6', width: '200px' }}>
           <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Compressão (Py)</div>
           <div className="neon-text-pink" style={{ fontSize: '2rem', marginTop: '10px', fontFamily: 'monospace' }}>{py} N</div>
         </div>
      </div>
      <div style={{ height: '150px', background: 'rgba(255,255,255,0.02)', margin: '30px auto', width: '300px', position: 'relative', borderLeft: '2px solid #1E293B', borderBottom: '2px solid #1E293B', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', bottom: 0, left: 0, width: '400px', height: '2px', background: '#39FF14', transformOrigin: 'bottom left', transform: `rotate(-${angle}deg)`, transition: 'transform 0.1s' }}></div>
      </div>
    </div>
  );
}

function QuizEngine({ questions }: { questions: Question[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState<{isCorrect: boolean, explanation: string} | null>(null);

  if (questions.length === 0) return <p style={{color: '#94A3B8', textAlign: 'center'}}>Nenhum teste disponível.</p>;

  if (showResults) {
    const isPerfect = score === questions.length;
    return (
      <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(0,0,0,0.6)', borderRadius: '16px', border: `1px solid ${isPerfect ? '#39FF14' : '#00F0FF'}` }}>
        <h2 className="cyberpunk-font" style={{ color: isPerfect ? '#39FF14' : '#00F0FF', fontSize: '3rem', margin: '0 0 20px 0', textShadow: `0 0 20px ${isPerfect ? '#39FF14' : '#00F0FF'}` }}>
          {isPerfect ? 'SUCESSO_CRÍTICO' : 'AVALIAÇÃO_CONCLUÍDA'}
        </h2>
        <p style={{ fontSize: '1.5rem', marginBottom: '40px', color: '#E2E8F0', fontFamily: 'monospace' }}>
          PONTUAÇÃO_FINAL: <span style={{color: isPerfect ? '#39FF14' : '#FF00E6', fontSize: '2rem'}}>{score}</span> / {questions.length}
        </p>
        <button className="btn-cyber primary" onClick={() => { setCurrentIndex(0); setScore(0); setShowResults(false); }} style={{ padding: '15px 40px', fontSize: '1.2rem' }}>[ REINICIAR_SISTEMA ]</button>
      </div>
    );
  }

  const q = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleAnswer = (idx: number) => {
    const isCorrect = idx === q.correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);
    setFeedback({ isCorrect, explanation: q.explanation });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '12px', border: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1rem', color: '#94A3B8', fontFamily: 'monospace' }}>
          <span>VARREDURA: ARQUIVO {currentIndex + 1}/{questions.length}</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: '#050a15', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#FF00E6', transition: 'width 0.4s' }}></div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '40px' }}>
        <h3 style={{ color: '#FFF', fontSize: '1.5rem', margin: '0 0 30px 0', lineHeight: '1.6' }}>{q.question}</h3>
        {!feedback ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
            {q.options.map((opt, idx) => (
              <button key={idx} className="btn-cyber" onClick={() => handleAnswer(idx)} 
                style={{ padding: '20px 25px', textAlign: 'left', background: 'rgba(0,0,0,0.6)', color: '#F8FAFC', border: '1px solid #1E293B', fontSize: '1.1rem', borderRadius: '8px' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#00F0FF'; e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(0,240,255,0.2)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#1E293B'; e.currentTarget.style.boxShadow = 'none'; }}>
                <strong className="neon-text-blue" style={{ marginRight: '15px', fontSize: '1.2rem' }}>{['A', 'B', 'C', 'D'][idx]}.</strong> {opt}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ background: feedback.isCorrect ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 0, 0, 0.1)', padding: '30px', borderRadius: '8px', border: `1px solid ${feedback.isCorrect ? '#39FF14' : '#EF4444'}` }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', color: feedback.isCorrect ? '#39FF14' : '#EF4444', fontFamily: 'Chakra Petch' }}>
              {feedback.isCorrect ? '▶ ACESSO CONCEDIDO: CORRETO' : '⚠️ ERRO_CRÍTICO: INCORRETO'}
            </h4>
            <p style={{ margin: '0 0 30px 0', fontSize: '1.1rem', color: '#E2E8F0', lineHeight: '1.6' }}>{feedback.explanation}</p>
            <button className="btn-cyber" onClick={() => { setFeedback(null); if (currentIndex + 1 < questions.length) setCurrentIndex(prev => prev + 1); else setShowResults(true); }} 
              style={{ padding: '15px 30px', background: 'rgba(0,0,0,0.5)', color: '#FFF', border: '1px solid #FFF', width: '100%', fontSize: '1.2rem' }}>
              {currentIndex + 1 < questions.length ? 'CARREGAR PRÓXIMO NODE ᐊ' : 'FINALIZAR SIMULAÇÃO'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
