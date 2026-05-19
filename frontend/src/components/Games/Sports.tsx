import React, { useState, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   ARENA DOS SENTIDOS — Curso Completo para Prova
   Telas: Dashboard → Módulo (Intro → Aprenda → Flashcards → Simulador → Quiz → Revisão)
═══════════════════════════════════════════════════════════════════ */

const STUDY = {
  goalball: {
    color: 'from-indigo-600 to-indigo-900',
    accent: 'indigo',
    icon: '🔵',
    label: 'Goalball',
    tagline: 'O esporte da escuridão e da percepção',
    heroText: 'Imagine competir sem enxergar absolutamente nada. Apenas seu corpo, sua audição afinada e a confiança nos companheiros. Esse é o goalball — criado para reabilitação de veteranos de guerra, hoje modalidade paralímpica completa praticada em mais de 100 países.',
    stats: [
      { icon: '📅', label: 'Criado em', value: '1946' },
      { icon: '🌍', label: 'Países praticantes', value: '+100' },
      { icon: '🏅', label: 'Paralímpico desde', value: '1976' },
      { icon: '🇧🇷', label: 'Brasil — medalhas', value: '3 pódios' },
      { icon: '⚖️', label: 'Peso da bola', value: '1,25 kg' },
      { icon: '📐', label: 'Quadra (C × L)', value: '18m × 9m' },
    ],
    chapters: [
      { icon: '👁️‍🗨️', title: 'A Filosofia das Vendas', body: 'Todos os jogadores usam venda opaca — inclusive os que têm visão residual. A venda não é punição: é o símbolo máximo da equidade. Com ela, atletas de diferentes graus de deficiência visual competem em pé de igualdade, dependendo 100% da percepção auditiva e do tato.', bullets: ['O árbitro inspeciona a venda antes de cada jogo', 'Tocar na própria venda durante o jogo é penalidade automática', 'Atletas com cegueira total têm a mesma condição que os com visão parcial', 'Existem 3 classes visuais: B1 (cegueira total), B2 e B3 (visão parcial)'], proTip: '🎯 PROVA: A venda garante EQUIDADE — palavra-chave em questões sobre goalball.' },
      { icon: '🔔', title: 'A Bola Sonora', body: 'A bola pesa 1,25 kg e tem guizos internos de metal que emitem som ao rolar. Toda a estratégia do jogo gira em torno desse som: o arremessador tenta disfarçar a trajetória com rotações variadas, enquanto o defensor tenta calcular a direção apenas pelo som.', bullets: ['A bola DEVE rolar pelo chão — arremesso aéreo é falta (High Ball)', 'A bola deve cruzar as linhas de arremesso rolando', 'Atletas treinam a audição por anos para detectar variações de trajetória', 'Existem arremessos com efeito (torção) para dificultar a defesa'], proTip: '🎯 PROVA: Bola rolada + guizo interno = os dois elementos mais cobrados em questões técnicas.' },
      { icon: '🤫', title: 'O Silêncio Obrigatório', body: 'O público DEVE fazer silêncio total durante o jogo. Qualquer barulho externo interfere na percepção auditiva dos atletas. É a única modalidade esportiva em que o silêncio da plateia é regra oficial, podendo ser punido pelo árbitro.', bullets: ['Cartazes com "SILÊNCIO" são distribuídos ao público em competições oficiais', 'Nos intervalos, o público pode comemorar livremente', 'O árbitro pode paralisar o jogo por barulho excessivo da plateia', 'Atletas usam a voz para se comunicar com companheiros (chamadas táteis)'], proTip: '🎯 PROVA: O silêncio não é opcional — é REGRA. O árbitro pode punir o barulho externo.' },
      { icon: '✋', title: 'Orientação Tátil e Quadra', body: 'O chão tem linhas em relevo (fitas táteis de barbante) que os atletas sentem com pés e mãos. Elas coincidem com as linhas pintadas e permitem que o jogador saiba exatamente onde está na quadra sem enxergar.', bullets: ['Quadra: 18m de comprimento × 9m de largura', 'Área de equipe: 6m de profundidade (defesa)', 'Área de arremesso: 3m centrais de cada lado', 'Gol: 9m de largura × 1,3m de altura (largura total da quadra)', 'Cada equipe tem 3 jogadores em quadra'], proTip: '🎯 PROVA: O GOL tem a mesma largura da quadra (9m) — dado muito cobrado em provas.' },
      { icon: '🛡️', title: 'Regras e Infrações', body: 'O goalball tem infrações específicas que diferem de todos os outros esportes. Conhecê-las é fundamental para qualquer prova sobre o tema.', bullets: ['HIGH BALL: bola que não toca o chão na área de arremesso — falta', 'LONG BALL: bola que ultrapassa o limite de 3m antes de cruzar a linha de defesa — falta', 'NOISE BALL: jogador faz barulho para confundir o adversário — falta', 'PERSONAL PENALTY: jogador lança a bola mais de 3 vezes consecutivas — falta', 'O time não pode ter 3 penalidades pessoais do mesmo jogador'], proTip: '🎯 PROVA: "High Ball" e "Long Ball" são as infrações mais cobradas. Memorize os nomes em inglês.' },
      { icon: '🏅', title: 'Brasil no Goalball', body: 'O Brasil é uma potência mundial no goalball, especialmente no feminino. A seleção feminina é multicampeã paralímpica e referência global na modalidade.', bullets: ['Seleção Feminina: Ouro em Atenas 2004 e Pequim 2008', 'Seleção Masculina: regular nos Jogos Paralímpicos desde 1976', 'Jogadores treinam em centros de excelência com instrutores videntes', 'O Brasil investe em goalball desde os primeiros jogos paralímpicos em 1976'], proTip: '🎯 PROVA: Seleção FEMININA é a mais vitoriosa do Brasil no goalball — não confundir com masculino.' },
    ],
    flashcards: [
      { front: 'Por que todos usam venda no goalball?', back: 'Para garantir EQUIDADE: atletas com diferentes graus de visão competem em condições idênticas, dependendo apenas de audição e tato.' },
      { front: 'Qual o peso da bola de goalball?', back: '1,25 kg — com guizos internos de metal que emitem som ao rolar.' },
      { front: 'Quantos jogadores por equipe em quadra?', back: '3 jogadores por equipe (mais reservas no banco).' },
      { front: 'Qual a dimensão da quadra de goalball?', back: '18 metros de comprimento × 9 metros de largura.' },
      { front: 'Qual a largura do gol no goalball?', back: '9 metros — a largura TOTAL da quadra. Altura: 1,3m.' },
      { front: 'O que é "High Ball" no goalball?', back: 'Infração: bola arremessada que não toca o chão na área de arremesso (3m centrais).' },
      { front: 'O que são as fitas táteis?', back: 'Linhas em relevo no chão que permitem orientação espacial pelo tato — sem enxergar.' },
      { front: 'Por que o público deve fazer silêncio?', back: 'Para que os atletas possam ouvir o guizo da bola e calcular sua trajetória.' },
      { front: 'Desde quando o goalball é paralímpico?', back: 'Desde 1976, nos Jogos Paralímpicos de Toronto.' },
      { front: 'O que é "Long Ball" no goalball?', back: 'Infração: bola que ultrapassa o limite de 3m antes de cruzar a linha de defesa adversária.' },
    ],
    revisionItems: [
      { category: '📐 Dados Técnicos', items: [{ q: 'Dimensões da quadra', a: '18m × 9m' }, { q: 'Peso da bola', a: '1,25 kg (com guizos)' }, { q: 'Largura do gol', a: '9m (toda a quadra) × 1,3m de altura' }, { q: 'Jogadores por equipe em quadra', a: '3 jogadores' }, { q: 'Área de equipe', a: '6m de profundidade' }, { q: 'Área de arremesso', a: '3m centrais' }] },
      { category: '📋 Regras Principais', items: [{ q: 'High Ball', a: 'Bola que não toca o chão na área de arremesso — falta' }, { q: 'Long Ball', a: 'Bola que ultrapassa 3m antes da linha de defesa — falta' }, { q: 'Silêncio', a: 'Obrigatório durante o jogo — regra oficial' }, { q: 'Tipo de arremesso', a: 'Rolado pelo chão (nunca aéreo)' }, { q: 'Venda', a: 'Obrigatória para todos — inclusive com visão residual' }] },
      { category: '🌍 Contexto e História', items: [{ q: 'Ano de criação', a: '1946, para reabilitação de veteranos de guerra' }, { q: 'Paralímpico desde', a: '1976 (Toronto)' }, { q: 'Brasil feminino', a: 'Ouro em Atenas 2004 e Pequim 2008' }, { q: 'Classes visuais', a: 'B1 (cegueira total), B2, B3 (visão parcial)' }, { q: 'Países praticantes', a: 'Mais de 100 países' }] },
    ],
    quizzes: [
      { question: 'Por que TODOS os atletas de goalball usam venda, mesmo os que enxergam?', options: ['Por tradição histórica do esporte', 'Para garantir igualdade de condições entre todos', 'Porque a quadra é muito iluminada', 'Para proteger os olhos da bola'], correct: 1, explanation: 'Equidade é a palavra-chave: atletas com diferentes graus de visão competem em pé de igualdade, dependendo 100% da audição e tato.' },
      { question: 'Qual a largura do gol no goalball?', options: ['3 metros', '6 metros', '9 metros (toda a quadra)', '12 metros'], correct: 2, explanation: 'O gol tem a mesma largura da quadra — 9 metros! Com 1,3m de altura. Isso torna a defesa um trabalho de cobertura total de área.' },
      { question: 'O que é o "High Ball" no goalball?', options: ['Arremesso muito forte', 'Bola que não toca o chão na área de arremesso — falta', 'Bola arremessada acima da cabeça', 'Bloqueio com os braços levantados'], correct: 1, explanation: 'High Ball é uma infração: a bola deve SEMPRE rolar pelo chão na área de arremesso (os 3m centrais). Arremesso aéreo é falta.' },
      { question: 'Desde quando o goalball é modalidade paralímpica?', options: ['1948', '1960', '1976', '1984'], correct: 2, explanation: 'O goalball estreou nos Jogos Paralímpicos de 1976, em Toronto (Canadá), tanto na versão masculina quanto feminina.' },
      { question: 'Quantos jogadores cada equipe tem em quadra no goalball?', options: ['5 jogadores', '4 jogadores', '3 jogadores', '6 jogadores'], correct: 2, explanation: 'São 3 jogadores por equipe. Com a quadra relativamente pequena, três atletas cobrem toda a extensão do gol deitando no chão.' },
      { question: 'Qual a dimensão oficial da quadra de goalball?', options: ['9m × 18m', '18m × 9m', '20m × 10m', '15m × 9m'], correct: 1, explanation: '18m de comprimento × 9m de largura. O comprimento é o dobro da largura — dados fundamentais para qualquer prova.' },
    ],
    wrongAnswerHints: ['Lembre: EQUIDADE é o conceito central do goalball', 'Releia as regras de High Ball e Long Ball', 'Revise as dimensões da quadra — 18m × 9m'],
  },
  futebol: {
    color: 'from-emerald-600 to-emerald-900',
    accent: 'emerald',
    icon: '⚽',
    label: 'Futebol',
    tagline: 'Como o espaço e os valores transformam o mesmo esporte',
    heroText: 'O futebol não é um esporte único — é uma família de esportes. Dependendo da superfície, do espaço e dos valores envolvidos, o mesmo jogo se torna experiências radicalmente diferentes. Entender cada variação é entender a riqueza do esporte mais popular do planeta.',
    stats: [
      { icon: '🌍', label: 'Países com futebol', value: '+200' },
      { icon: '👥', label: 'Praticantes no Brasil', value: '+29M' },
      { icon: '🏙️', label: 'Callejero em países', value: '40+' },
      { icon: '📐', label: 'Variações oficiais', value: '6+' },
      { icon: '🧠', label: 'Criador Callejero', value: 'F. Ferreiras' },
      { icon: '📅', label: 'Callejero — ano', value: 'Anos 1990' },
    ],
    chapters: [
      { icon: '🌱', title: 'Futebol Society', body: 'Praticado em campos de grama sintética com 7 jogadores por equipe. O espaço maior em relação ao futsal favorece o jogo mais aberto, com passes longos e corridas em profundidade. É o meio-termo entre o futebol de campo tradicional e o futsal.', bullets: ['7 jogadores por equipe em campo', 'Superfície: grama sintética (principal diferencial)', 'Campo menor que o futebol oficial, maior que o futsal', 'Favorece passes longos e corridas em profundidade', 'Mais contato individual com a bola que no campo tradicional', 'Goleiro pode usar as mãos normalmente'], proTip: '🎯 PROVA: Society = grama sintética + 7 jogadores + passes longos. Diferencie do futsal pela superfície e número de jogadores.' },
      { icon: '🧱', title: 'Futsal (Futebol de Salão)', body: 'Disputado em quadra dura (ginásio) com 5 jogadores. A bola de baixo rebote exige técnica refinada com a planta do pé e triangulações rápidas. O futsal é considerado a "escola técnica" do futebol brasileiro.', bullets: ['5 jogadores por equipe em quadra', 'Superfície: piso rígido (ginásio, cimento, madeira)', 'Bola: menor, mais pesada, baixo rebote', 'Técnica da PLANTA DO PÉ é essencial para controle', 'Triangulações rápidas em espaço reduzido', 'Ronaldinho, Ronaldo, Neymar cresceram jogando futsal'], proTip: '🎯 PROVA: Futsal = piso rígido + 5 jogadores + bola pesada de baixo rebote + planta do pé.' },
      { icon: '🤝', title: 'Futebol Callejero — Origem e Filosofia', body: 'Criado pelo argentino Fabián Ferreiras nos anos 1990 em Buenos Aires para jovens em situação de risco. O objetivo vai muito além dos gols: é ferramenta de educação em valores como respeito, diálogo e responsabilidade coletiva.', bullets: ['Criado por Fabián Ferreiras, Argentina, anos 1990', '"Callejero" = de rua (espanhol)', 'Não tem árbitro externo — auto-regulação', 'Ferramenta de educação social em 40+ países', 'No Brasil: usado em favelas e escolas públicas', 'Objetivo: gols + demonstração de valores'], proTip: '🎯 PROVA: Callejero NÃO tem árbitro. Quem "ganha" respeita mais as regras — não quem marca mais gols.' },
      { icon: '⏱️', title: 'Os 3 Tempos do Callejero', body: 'A estrutura mais inovadora do Callejero é a divisão em 3 tempos — uma reformulação completa da lógica competitiva tradicional do futebol.', bullets: ['1º TEMPO — DIÁLOGO: Ambos os times se sentam e constroem as regras juntos (ex: gols de meninas valem 2). Gera co-responsabilidade.', '2º TEMPO — A PARTIDA: Jogam baseados nas regras que eles mesmos criaram, sem árbitro externo para fiscalizar.', '3º TEMPO — REFLEXÃO: Discutem se as regras foram respeitadas. Quem respeitou mais as combinações GANHA os pontos.', 'O placar de gols existe, mas é secundário ao placar de valores', 'Penalidades por desrespeito às regras podem superar vantagem de gols'], proTip: '🎯 PROVA: Saiba os 3 tempos na ordem: Diálogo → Partida → Reflexão. Cada um tem uma função pedagógica específica.' },
      { icon: '📊', title: 'Comparativo Society × Futsal × Callejero', body: 'Para a prova, é fundamental saber diferenciar as três modalidades com clareza. Tabela comparativa dos principais pontos de contraste.', bullets: ['SOCIETY: 7 × 7 | Grama sintética | Com árbitro | Objetivo: gols', 'FUTSAL: 5 × 5 | Piso rígido | Com árbitro | Objetivo: gols | Bola de baixo rebote', 'CALLEJERO: Variável | Qualquer superfície | Sem árbitro | Objetivo: gols + valores', 'Elemento exclusivo do futsal: bola pesada com baixo rebote', 'Elemento exclusivo do Callejero: 3 tempos + construção coletiva de regras', 'Society e futsal têm árbitro; Callejero não tem'], proTip: '🎯 PROVA: A ausência de árbitro é o dado mais cobrado sobre o Callejero. E a bola de baixo rebote é o mais cobrado sobre o futsal.' },
      { icon: '🧠', title: 'Esportes de Invasão — Conceito Geral', body: 'Futebol, futsal, handebol e goalball são "esportes de invasão": equipes tentam invadir o território adversário para marcar pontos. Esse conceito une modalidades aparentemente diferentes numa mesma categoria pedagógica.', bullets: ['Esporte de invasão: equipes competem em espaço compartilhado', 'Objetivo: invadir o campo/quadra adversária para marcar', 'Exigem: visão de jogo, tomada de decisão rápida, trabalho coletivo', 'Diferem de esportes de rede (vôlei) e de campo dividido (tênis)', 'Na BNCC: esportes de invasão são categoria da cultura corporal de movimento'], proTip: '🎯 PROVA: Saiba o conceito de "esporte de invasão" — pode ser cobrado junto com a classificação dos esportes na BNCC.' },
    ],
    flashcards: [
      { front: 'Quem criou o Futebol Callejero e quando?', back: 'Fabián Ferreiras, Argentina, anos 1990, para jovens em situação de risco nas ruas de Buenos Aires.' },
      { front: 'O que significa "Callejero"?', back: '"De rua" em espanhol. O nome reflete a origem popular e o contexto social do esporte.' },
      { front: 'Quais são os 3 tempos do Callejero?', back: '1º Diálogo (criam as regras), 2º Partida (jogam sem árbitro), 3º Reflexão (analisam o respeito às regras).' },
      { front: 'Quantos jogadores tem o futsal?', back: '5 jogadores por equipe em quadra. Joga em piso rígido com bola de baixo rebote.' },
      { front: 'Qual a superfície do Society?', back: 'Grama sintética. 7 jogadores por equipe. Favorece passes longos.' },
      { front: 'O que diferencia a bola do futsal?', back: 'É menor, mais pesada e tem baixo rebote — exige controle com a planta do pé.' },
      { front: 'O Callejero tem árbitro?', back: 'NÃO. A autorregulação é central: os próprios times fiscalizam o cumprimento das regras que eles mesmos criaram.' },
      { front: 'O que é um esporte de invasão?', back: 'Modalidade em que equipes compartilham o mesmo espaço e tentam invadir o território adversário para marcar pontos.' },
      { front: 'Quem ganha no Callejero?', back: 'O time que demonstrar mais respeito às regras acordadas no 1º tempo — não necessariamente quem marcou mais gols.' },
      { front: 'Por que o futsal ajuda no desenvolvimento técnico?', back: 'O espaço reduzido e a bola de baixo rebote exigem controle preciso e triangulações rápidas — habilidades transferíveis ao campo.' },
    ],
    revisionItems: [
      { category: '🌱 Society', items: [{ q: 'Jogadores por equipe', a: '7 × 7' }, { q: 'Superfície', a: 'Grama sintética' }, { q: 'Árbitro', a: 'Sim' }, { q: 'Estilo de jogo', a: 'Passes longos, jogo aberto, corridas em profundidade' }] },
      { category: '⚡ Futsal', items: [{ q: 'Jogadores por equipe', a: '5 × 5' }, { q: 'Superfície', a: 'Piso rígido (ginásio)' }, { q: 'Bola', a: 'Menor, mais pesada, baixo rebote' }, { q: 'Técnica chave', a: 'Planta do pé + triangulações rápidas' }, { q: 'Árbitro', a: 'Sim' }] },
      { category: '🤝 Callejero', items: [{ q: 'Criador', a: 'Fabián Ferreiras (Argentina, anos 1990)' }, { q: 'Árbitro', a: 'NÃO — autorregulação' }, { q: '1º Tempo', a: 'Diálogo — criam as regras juntos' }, { q: '2º Tempo', a: 'A partida (sem árbitro externo)' }, { q: '3º Tempo', a: 'Reflexão — quem respeitou mais ganha' }, { q: 'Países', a: '40+ países usam o método' }] },
      { category: '📚 Conceito Geral', items: [{ q: 'Esporte de invasão', a: 'Equipes no mesmo espaço tentando invadir o território adversário' }, { q: 'Exemplos de invasão', a: 'Futebol, futsal, handebol, basquete, goalball' }, { q: 'BNCC', a: 'Esportes de invasão são categoria da cultura corporal de movimento' }] },
    ],
    quizzes: [
      { question: 'No Futebol Callejero, quem define as regras da partida?', options: ['O árbitro principal', 'A federação esportiva local', 'Os próprios times juntos, antes do jogo (1º Tempo)', 'O técnico mais experiente'], correct: 2, explanation: 'O 1º Tempo do Callejero é o "Diálogo": ambas as equipes sentam e constroem coletivamente as regras, gerando co-responsabilidade.' },
      { question: 'Qual característica é EXCLUSIVA da bola de futsal?', options: ['É mais colorida', 'É menor, mais pesada e tem baixo rebote', 'É feita de couro natural', 'É maior que a bola de campo'], correct: 1, explanation: 'A bola do futsal é menor, mais pesada e de baixo rebote — isso exige controle com a planta do pé e triangulações em espaço reduzido.' },
      { question: 'O que acontece no "3º Tempo" do Futebol Callejero?', options: ['Prorrogação do jogo', 'Cobrança de pênaltis', 'Reflexão coletiva sobre o respeito às regras criadas no 1º Tempo', 'Confraternização com lanches'], correct: 2, explanation: 'No Callejero, o 3º Tempo é a Reflexão: discutem se as regras foram respeitadas. Quem respeitou mais GANHA — não quem fez mais gols.' },
      { question: 'Qual a superfície característica do Futebol Society?', options: ['Piso de madeira (ginásio)', 'Areia compactada', 'Grama sintética', 'Piso de borracha'], correct: 2, explanation: 'O society é jogado em grama sintética com 7 jogadores por equipe — espaço intermediário entre futsal e campo.' },
      { question: 'Quem criou o Futebol Callejero?', options: ['Pelé, no Brasil dos anos 1970', 'Fabián Ferreiras, na Argentina dos anos 1990', 'FIFA, em parceria com a ONU', 'Um grupo de professores paulistanos'], correct: 1, explanation: 'Fabián Ferreiras criou o Callejero em Buenos Aires nos anos 1990 para trabalhar com jovens em situação de risco através do futebol como ferramenta social.' },
      { question: 'O que caracteriza um "esporte de invasão"?', options: ['Equipes jogam em espaços separados por rede', 'Atletas competem individualmente', 'Equipes compartilham o mesmo espaço tentando invadir o território adversário', 'O jogo acontece em pistas circulares'], correct: 2, explanation: 'Esportes de invasão (futebol, handebol, basquete, goalball) têm equipes no mesmo espaço disputando território para marcar pontos.' },
    ],
    wrongAnswerHints: ['Releia os 3 Tempos do Callejero em ordem', 'Lembre: Callejero SEM árbitro; Society e Futsal COM árbitro', 'Revise a tabela comparativa dos 3 modos'],
  },
  handebol: {
    color: 'from-orange-600 to-orange-900',
    accent: 'orange',
    icon: '🤾',
    label: 'Handebol',
    tagline: 'Inteligência tática, velocidade e jogo coletivo',
    heroText: 'O esporte que combina velocidade de basquete, contato físico de rugby e precisão de arremesso. O handebol é o esporte de invasão mais tático dos Jogos Olímpicos — e na escola, ferramenta poderosa de desenvolvimento de tomada de decisão coletiva.',
    stats: [
      { icon: '👥', label: 'Jogadores em quadra', value: '7 × 7' },
      { icon: '⚡', label: 'Velocidade arremesso', value: 'até 130 km/h' },
      { icon: '🏅', label: 'Olímpico (masc.) desde', value: '1936' },
      { icon: '🏅', label: 'Olímpico (fem.) desde', value: '1976' },
      { icon: '📏', label: 'Área do goleiro', value: '6 metros' },
      { icon: '⏱️', label: 'Duração da partida', value: '2 × 30 min' },
    ],
    chapters: [
      { icon: '📋', title: 'Regras Fundamentais', body: 'As regras básicas do handebol devem ser dominadas antes de qualquer análise tática. Elas são o que mais cai em provas de educação física e esportes.', bullets: ['REGRA DO 3×3: máximo 3 passos OU 3 segundos segurando a bola', 'Goleiro: único que pode entrar na área de 6m e usar os pés', 'Jogadores de linha: NUNCA podem entrar na área de 6m', 'Linha de 9m (tracejada): limite para arremessos de longa distância', '7m: equivalente ao pênalti — infração dentro da área', 'O jogador pode driblar (picar a bola) e retomar sem limite de passos durante o drible'], proTip: '🎯 PROVA: A regra 3 passos/3 segundos é a mais cobrada. Durante o drible (quicando), não conta passos.' },
      { icon: '✊', title: 'Técnicas Individuais — Empunhadura e Arremesso', body: 'A técnica individual é a base do handebol. A empunhadura correta determina a qualidade de todos os fundamentos seguintes.', bullets: ['EMPUNHADURA: palma aberta + polpa dos dedos envolvendo a bola (não usa punho fechado)', 'ARREMESSO DE OMBRO: mais potente e preciso — padrão nas partidas', 'ARREMESSO EM PRONAÇÃO: pulso gira durante o arremesso — surpreende o goleiro', 'ARREMESSO MERGULHO: atleta salta e arremessa antes de cair na área', 'A bola não pode ser chutada (uso do pé é proibido para jogadores de linha)', 'Tamanhos: 0 (≤8 anos), 1 (8-12 anos), 2 (fem. adulto), 3 (masc. adulto)'], proTip: '🎯 PROVA: Empunhadura ≠ punho fechado. É palma + dedos. O arremesso de ombro é o mais eficiente.' },
      { icon: '🙌', title: 'Recepção e Tipos de Passe', body: 'Receber bem é tão importante quanto arremessar. A bola chega com velocidade altíssima e a técnica correta evita lesões e erros.', bullets: ['RECEPÇÃO: duas mãos em "concha" com dedos abertos para amortecer', 'PASSE DE OMBRO: mais forte e preciso — ideal para distâncias longas', 'PASSE PICADO: rebate no chão — difícil de interceptar, muda o ângulo', 'PASSE EM PRONAÇÃO: pulso gira — rápido e surpreendente', 'PASSE LATERAL: rápido, usado em situações de alta velocidade', 'Ordem de aprendizado: Ombro → Picado → Pronação → Lateral'], proTip: '🎯 PROVA: Passe picado é o MAIS DIFÍCIL de interceptar — dado frequente em provas sobre estratégia.' },
      { icon: '🛡️', title: 'Sistemas Defensivos', body: 'O handebol moderno é dominado pela defesa coletiva. Os sistemas determinam como os 6 jogadores de linha se posicionam para proteger o gol.', bullets: ['6:0 — Barreira fechada: todos os 6 na linha de 6m. Forte contra arremessos curtos. Vulnerável a arremessos de 9m.', '5:1 — Com "bico": 5 na linha + 1 adiantado para pressionar o armador adversário. Quebra a organização do ataque.', '3:3 — Duas linhas de 3: ideal para iniciação escolar. Cada jogador tem responsabilidade individual clara.', '4:2 — Quatro atrás + dois à frente: versão mais agressiva do 5:1', 'Goleiro: defende dentro da área com todo o corpo (pés, mãos, pernas)', 'Pivô adversário: jogador de ataque que tenta se posicionar DENTRO da defesa'], proTip: '🎯 PROVA: Saiba o que cada sistema faz. 6:0 = barreira; 5:1 = pressão no armador; 3:3 = iniciação.' },
      { icon: '⚔️', title: 'Posições e Funções em Quadra', body: 'Cada posição no handebol tem uma função específica no ataque e na defesa. Conhecê-las é fundamental para compreender as táticas.', bullets: ['GOLEIRO: único dentro da área; pode usar qualquer parte do corpo para defender', 'ARMADOR CENTRAL: "maestro" — distribui o jogo, organiza o ataque', 'ARMADORES LATERAIS (esq./dir.): arremessam em ângulo fechado das pontas', 'PIVÔ: joga infiltrado entre os defensores, cria espaços para os companheiros', 'PONTAS: mais rápidos, recebem passes laterais e arremessam em ângulo', 'Na defesa, todos os jogadores de linha participam do sistema coletivo'], proTip: '🎯 PROVA: Armador Central = "maestro do jogo". Pivô = age DENTRO da defesa adversária. São as posições mais cobradas.' },
      { icon: '🏛️', title: 'História e Olimpíadas', body: 'A história do handebol é essencial para provas que abordam o contexto histórico e olímpico dos esportes coletivos.', bullets: ['1919: Karl Schelenz sistematiza regras modernas na Alemanha', '1936: Estreia olímpica em Berlim (versão de campo, 11 jogadores)', '1972: Versão de salão (7 jogadores) entra permanentemente nas Olimpíadas', '1976: Handebol feminino estreia nas Olimpíadas de Montreal', 'Brasil: competitivo internacionalmente desde os anos 1990', 'Países dominantes: França, Dinamarca, Espanha (masc.); Noruega, Holanda (fem.)'], proTip: '🎯 PROVA: 1936 = primeira vez (campo, 11 jog.). 1972 = salão permanente. 1976 = feminino estreia. Datas muito cobradas.' },
    ],
    flashcards: [
      { front: 'Qual a "Regra de Ouro" do handebol?', back: '3 passos OU 3 segundos com a bola. Viola qualquer um = perda de posse para o adversário.' },
      { front: 'O que é empunhadura no handebol?', back: 'Forma de segurar a bola: palma aberta + polpa dos dedos. Dá controle para arremessar com potência e precisão.' },
      { front: 'O que é o sistema defensivo 6:0?', back: 'Barreira fechada: 6 defensores alinhados na linha de 6m. Forte contra arremessos curtos; vulnerável a distância.' },
      { front: 'O que é o sistema 5:1?', back: '5 jogadores na linha + 1 ("bico") adiantado para pressionar o armador central adversário.' },
      { front: 'Qual sistema é indicado para iniciação escolar?', back: '3:3 — duas linhas de 3 jogadores. Cada um tem responsabilidade individual clara, facilitando o aprendizado.' },
      { front: 'Qual a função do Armador Central?', back: '"Maestro" do ataque: organiza e distribui o jogo, decide quando e para quem passar.' },
      { front: 'O que é o Pivô?', back: 'Jogador de ataque que age infiltrado entre os defensores adversários, criando espaços para os companheiros.' },
      { front: 'Qual passe é mais difícil de interceptar?', back: 'O passe picado — rebate no chão, mudando o ângulo de chegada e dificultando a leitura do defensor.' },
      { front: 'Desde quando o handebol é olímpico (masculino)?', back: '1936, em Berlim — mas era a versão de campo com 11 jogadores. A versão de salão (7 jogadores) entrou em 1972.' },
      { front: 'O que é a linha de 7m no handebol?', back: 'Equivalente ao pênalti: cobrado quando há infração que impede gol claro dentro da área do goleiro.' },
    ],
    revisionItems: [
      { category: '📋 Regras Básicas', items: [{ q: 'Regra do 3×3', a: '3 passos OU 3 segundos com a bola' }, { q: 'Área de 6m', a: 'Exclusiva do goleiro — jogadores de linha não entram' }, { q: 'Linha de 9m', a: 'Tracejada — limite para arremessos de longa distância' }, { q: '7m', a: 'Pênalti do handebol — infração com chance clara de gol' }, { q: 'Duração', a: '2 tempos de 30 minutos' }, { q: 'Goleiro', a: 'Pode usar qualquer parte do corpo; único na área de 6m' }] },
      { category: '🛡️ Sistemas Defensivos', items: [{ q: '6:0', a: 'Barreira: 6 na linha. Forte perto, vulnerável de longe' }, { q: '5:1', a: '5 na linha + 1 "bico" pressionando o armador adversário' }, { q: '3:3', a: 'Duas linhas de 3. Ideal para iniciação — responsabilidade individual' }] },
      { category: '⚽ Posições', items: [{ q: 'Armador Central', a: 'Maestro do jogo — organiza e distribui' }, { q: 'Pivô', a: 'Age infiltrado na defesa adversária, cria espaços' }, { q: 'Armadores Laterais', a: 'Pontas — arremessam em ângulo fechado' }, { q: 'Goleiro', a: 'Único dentro da área de 6m' }] },
      { category: '🏛️ História Olímpica', items: [{ q: '1919', a: 'Karl Schelenz sistematiza as regras modernas na Alemanha' }, { q: '1936', a: 'Estreia olímpica (Berlim) — versão de campo, 11 jogadores' }, { q: '1972', a: 'Versão de salão (7 jogadores) entra permanentemente' }, { q: '1976', a: 'Handebol feminino estreia em Montreal' }] },
    ],
    quizzes: [
      { question: 'Qual é a "Regra de Ouro" do handebol sobre a posse de bola?', options: ['5 passos ou 5 segundos', '3 passos OU segurar por no máximo 3 segundos', '4 passos ou 4 segundos', 'Sem limite de passos'], correct: 1, explanation: 'A regra do 3×3: 3 passos OU 3 segundos. O jogador pode driblar (picar a bola) e retomar sem limite durante o drible.' },
      { question: 'No sistema defensivo 5:1, qual a função do jogador que fica à frente?', options: ['Marcar o goleiro adversário', 'Avançar para pressionar o armador central inimigo', 'Cobrir o ângulo do próprio goleiro', 'Ser o apoio para contra-ataque'], correct: 1, explanation: 'O "bico" (jogador avançado) pressiona o armador central adversário, quebrando sua visão e dificultando a distribuição de jogo.' },
      { question: 'Por que o sistema 3:3 é recomendado para iniciação escolar?', options: ['É o mais difícil de atacar', 'Usa menos jogadores em quadra', 'Dá responsabilidade individual clara e melhora noção espacial', 'É o sistema mais defensivo do handebol'], correct: 2, explanation: 'O 3:3 divide a equipe em duas linhas de 3, onde cada jogador tem uma área de responsabilidade clara — ideal para quem está aprendendo.' },
      { question: 'O que é a empunhadura no handebol?', options: ['Um chute lateral', 'Segurar a bola com palma + polpa dos dedos para controle total', 'O passe picado no chão', 'A postura de defesa na barreira'], correct: 1, explanation: 'Empunhar corretamente (palma + polpa dos dedos) é a base de tudo: dá controle, potência e precisão no arremesso.' },
      { question: 'Desde quando o handebol de salão (7 jogadores) é modalidade olímpica permanente?', options: ['1936 (Berlim)', '1960 (Roma)', '1972 (Munique)', '1984 (Los Angeles)'], correct: 2, explanation: 'O handebol de campo estreou em 1936, mas o de salão (7 jogadores) entrou permanentemente nos Jogos de Munique em 1972.' },
      { question: 'Qual passe é mais difícil de interceptar por um defensor?', options: ['Passe de ombro', 'Passe lateral', 'Passe picado (quicando no chão)', 'Passe em pronação'], correct: 2, explanation: 'O passe picado rebate no chão, mudando completamente o ângulo e a altura da bola — muito difícil de interceptar mesmo com reação rápida.' },
    ],
    wrongAnswerHints: ['Revise a regra do 3×3 e suas exceções', 'Releia as funções de cada sistema defensivo', 'Confira as posições: Armador Central vs Pivô'],
  },
};

// ── FLASHCARD ────────────────────────────────────────────────────────────────
function FlashCard({ front, back, index }) {
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(null);
  return (
    <div className="group relative perspective-1000">
      <div 
        onClick={() => setFlipped(f => !f)} 
        className="cursor-pointer select-none transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1" 
        style={{ perspective: 1200 }}
      >
        <div style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)', minHeight: 160, position: 'relative' }}>
          
          {/* FRENTE */}
          <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl border border-slate-200">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 bg-slate-100 px-3 py-1 rounded-full">#{index + 1} — Pergunta</div>
            <p className="font-black text-slate-800 text-lg leading-snug">{front}</p>
            <p className="text-slate-400 text-xs mt-4 font-semibold">Clique para revelar</p>
          </div>
          
          {/* VERSO */}
          <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl border-2 border-slate-700">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Resposta</div>
            <p className="text-white font-semibold text-base leading-snug">{back}</p>
          </div>
        </div>
      </div>
      
      {/* CONTROLES DO FLASHCARD */}
      <div className={`overflow-hidden transition-all duration-300 ${flipped && known === null ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
        <div className="flex gap-3">
          <button onClick={(e) => { e.stopPropagation(); setKnown(false); }} className="flex-1 py-2.5 rounded-xl bg-red-100/80 text-red-700 font-bold text-sm hover:bg-red-200 hover:scale-105 active:scale-95 transition-all shadow-sm">😕 Revisar depois</button>
          <button onClick={(e) => { e.stopPropagation(); setKnown(true); }} className="flex-1 py-2.5 rounded-xl bg-green-100/80 text-green-700 font-bold text-sm hover:bg-green-200 hover:scale-105 active:scale-95 transition-all shadow-sm">✅ Já sabia!</button>
        </div>
      </div>
      
      {/* STATUS DO FLASHCARD */}
      {known !== null && (
        <div className={`mt-3 py-2 rounded-xl text-center text-xs font-black shadow-inner ${known ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {known ? '✅ Marcado como conhecido' : '📌 Marcado para revisar'}
        </div>
      )}
    </div>
  );
}

// ── QUIZ ─────────────────────────────────────────────────────────────────────
function QuizSection({ tab, onComplete }) {
  const data = STUDY[tab];
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wrongs, setWrongs] = useState([]);
  const [finalScore, setFinalScore] = useState(0);

  const q = data.quizzes[cur];

  const handleSel = (i) => {
    if (answered) return;
    setSel(i);
    setAnswered(true);
    const ok = i === q.correct;
    if (ok) setScore(s => s + 1);
    else setWrongs(w => [...w, cur]);
  };

  const handleNext = () => {
    const newScore = score + (sel === q.correct ? 1 : 0);
    if (cur < data.quizzes.length - 1) {
      setCur(c => c + 1); setSel(null); setAnswered(false);
    } else {
      setFinalScore(newScore);
      setFinished(true);
      onComplete(newScore);
    }
  };

  const reset = () => { setCur(0); setSel(null); setAnswered(false); setFinished(false); setScore(0); setWrongs([]); setFinalScore(0); };

  if (finished) {
    const pct = Math.round((finalScore / data.quizzes.length) * 100);
    return (
      <div className="text-center space-y-6 py-4">
        <div className="text-7xl drop-shadow-lg animate-bounce">{pct >= 80 ? '🏆' : pct >= 60 ? '📚' : '💪'}</div>
        <div>
          <h3 className="text-3xl font-black text-slate-800">{pct >= 80 ? 'Excelente!' : pct >= 60 ? 'Bom trabalho!' : 'Continue estudando!'}</h3>
          <p className="text-slate-500 mt-2 text-lg">Você acertou <strong>{finalScore} de {data.quizzes.length}</strong> ({pct}%)</p>
        </div>
        <div className="flex justify-center gap-2 flex-wrap">
          {data.quizzes.map((_, i) => (
            <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shadow-md ${wrongs.includes(i) ? 'bg-red-500' : 'bg-green-500'}`}>{wrongs.includes(i) ? '✗' : '✓'}</div>
          ))}
        </div>
        {wrongs.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-left shadow-sm">
            <p className="font-black text-amber-800 mb-3 text-lg">📌 Dicas para rever:</p>
            <div className="space-y-2">
              {data.wrongAnswerHints.map((h, i) => <p key={i} className="text-amber-700 text-sm font-medium flex gap-2"><span className="text-amber-500">•</span> {h}</p>)}
            </div>
          </div>
        )}
        <button onClick={reset} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-700 hover:-translate-y-1 active:scale-95 transition-all shadow-xl">Refazer Quiz</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
        <span className="text-slate-500 font-black text-sm uppercase tracking-wider">Questão {cur + 1} de {data.quizzes.length}</span>
        <div className="flex gap-1.5">
          {data.quizzes.map((_, i) => <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i < cur ? 'bg-green-400 w-8' : i === cur ? 'bg-slate-800 w-10 shadow-sm' : 'bg-slate-200 w-6'}`} />)}
        </div>
      </div>
      <h3 className="text-2xl font-black text-slate-800 leading-tight">{q.question}</h3>
      <div className="grid gap-3">
        {q.options.map((opt, i) => {
          let cls = 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]';
          if (answered) {
            if (i === q.correct) cls = 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/30';
            else if (i === sel) cls = 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30';
            else cls = 'bg-slate-50 border-slate-100 text-slate-300 opacity-60';
          }
          return (
            <button key={i} onClick={() => handleSel(i)} className={`w-full text-left p-4 rounded-2xl font-bold text-[15px] transition-all duration-200 flex items-center gap-4 ${cls}`}>
              <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-xs flex-shrink-0 ${answered && i === q.correct ? 'border-white bg-white text-green-600' : answered && i === sel && i !== q.correct ? 'border-white bg-white text-red-600' : 'border-slate-300 text-slate-400'}`}>
                {answered && i === q.correct ? '✓' : answered && i === sel && i !== q.correct ? '✗' : 'ABCD'[i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm animate-[fadeUp_0.3s_ease]">
          <p className="font-black text-blue-800 mb-2 text-sm uppercase tracking-widest">💡 Explicação</p>
          <p className="text-blue-900 text-[15px] leading-relaxed font-medium">{q.explanation}</p>
        </div>
      )}
      {answered && (
        <button onClick={handleNext} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 hover:-translate-y-1 active:scale-95 transition-all shadow-xl">
          {cur < data.quizzes.length - 1 ? 'Próxima Questão →' : 'Ver Resultado Final'}
        </button>
      )}
    </div>
  );
}

// ── SIMULATORS ───────────────────────────────────────────────────────────────
function GoalballSim() {
  const [ball, setBall] = useState(null);
  const [score, setScore] = useState({ d: 0, a: 0 });
  const throwBall = (lane) => {
    if (ball) return;
    setBall(lane);
    setTimeout(() => { Math.random() > 0.35 ? setScore(s => ({ ...s, d: s.d + 1 })) : setScore(s => ({ ...s, a: s.a + 1 })); setBall(null); }, 2000);
  };
  return (
    <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl p-6 text-white space-y-6 shadow-2xl border border-indigo-500/20">
      <div className="flex justify-between items-center bg-black/20 p-4 rounded-2xl">
        <div><h4 className="font-black text-lg text-indigo-300">Simulador de Arremesso</h4><p className="text-slate-400 text-sm">A defesa tem ~65% de chance de bloqueio</p></div>
        <div className="flex gap-6 text-center">
          <div className="bg-emerald-500/10 px-4 py-2 rounded-xl"><div className="text-2xl font-black text-emerald-400">{score.d}</div><div className="text-xs text-emerald-500/70 font-bold uppercase tracking-widest">Defesas</div></div>
          <div className="bg-red-500/10 px-4 py-2 rounded-xl"><div className="text-2xl font-black text-red-400">{score.a}</div><div className="text-xs text-red-500/70 font-bold uppercase tracking-widest">Gols</div></div>
        </div>
      </div>
      <div className="relative bg-indigo-900/50 rounded-2xl border-2 border-indigo-600/50 overflow-hidden shadow-inner" style={{ minHeight: 260 }}>
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-indigo-400/20 dashed" /><div className="absolute top-0 bottom-0 left-2/3 w-px bg-indigo-400/20 dashed" />
        <div className={`absolute top-5 w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-xl shadow-[0_0_30px_rgba(239,68,68,0.8)] transition-all duration-[1800ms] ease-in-out ${ball === 'esquerda' ? 'left-[17%] translate-y-[180px] opacity-100 scale-125' : ball === 'centro' ? 'left-1/2 -translate-x-1/2 translate-y-[180px] opacity-100 scale-125' : ball === 'direita' ? 'right-[17%] translate-y-[180px] opacity-100 scale-125' : 'left-1/2 -translate-x-1/2 opacity-60'}`}>🔔</div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-6">
          {[{ e: ball === 'esquerda' || ball === 'centro', c: 'bg-blue-500' }, { e: ball === 'centro', c: 'bg-indigo-500' }, { e: ball === 'direita' || ball === 'centro', c: 'bg-purple-500' }].map((d, i) => (
            <div key={i} className={`h-10 ${d.c} rounded-full border-2 border-white/30 shadow-lg transition-all duration-500 ${d.e ? 'flex-1 scale-105' : 'w-16 opacity-50'}`} />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-slate-900/80 flex items-center justify-center border-t border-indigo-500/30"><span className="text-indigo-300 text-[10px] font-black uppercase tracking-widest">Linha do Gol — 9 metros</span></div>
      </div>
      <div className="flex gap-3">
        {['esquerda', 'centro', 'direita'].map(l => (
          <button key={l} onClick={() => throwBall(l)} disabled={!!ball} className="flex-1 py-4 bg-white/5 hover:bg-white/10 disabled:opacity-40 rounded-2xl font-black text-sm capitalize border border-white/10 transition-all hover:-translate-y-1 active:scale-95">
            {l === 'esquerda' ? '◀ Esq' : l === 'centro' ? '▼ Centro' : 'Dir ▶'}
          </button>
        ))}
      </div>
    </div>
  );
}

function FootballSim() {
  const [mode, setMode] = useState('society');
  const [cStep, setCStep] = useState(1);
  const [passing, setPassing] = useState(false);
  const fieldBg = { society: 'bg-green-700 border-green-800', futsal: 'bg-amber-700 border-amber-800', callejero: 'bg-slate-700 border-slate-800' }[mode];
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 text-white space-y-6 shadow-2xl border border-slate-700">
      <div className="flex gap-2 bg-black/30 p-1.5 rounded-2xl">
        {[{ id: 'society', l: '🌱 Society' }, { id: 'futsal', l: '⚡ Futsal' }, { id: 'callejero', l: '🤝 Callejero' }].map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} className={`flex-1 py-3 rounded-xl font-black text-sm transition-all duration-300 ${mode === m.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-100' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>{m.l}</button>
        ))}
      </div>
      <div className={`relative rounded-2xl border-8 shadow-inner overflow-hidden transition-colors duration-500 ${fieldBg}`} style={{ minHeight: 220 }}>
        {mode !== 'callejero' && <><div className="absolute inset-y-0 left-1/2 w-px bg-white/30 -translate-x-1/2" /><div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" /></>}
        {mode !== 'callejero' && (
          <>
            <div className={`absolute top-[40%] left-[15%] w-10 h-10 rounded-full border-2 border-white flex items-center justify-center font-black text-sm shadow-lg ${mode === 'society' ? 'bg-blue-600' : 'bg-red-600'}`}>1</div>
            <div className={`absolute w-10 h-10 rounded-full border-2 border-white flex items-center justify-center font-black text-sm shadow-lg transition-all duration-700 ${mode === 'society' ? 'bg-blue-600 top-[15%] right-[15%]' : 'bg-red-600 top-[60%] right-[35%]'}`}>2</div>
            <div className={`absolute w-5 h-5 bg-white rounded-full shadow-[0_0_15px_white] transition-all ease-in-out z-10 ${mode === 'society' ? (passing ? 'top-[17%] right-[17%] duration-[900ms]' : 'top-[42%] left-[19%] duration-0') : (passing ? 'top-[62%] right-[37%] duration-[400ms]' : 'top-[42%] left-[19%] duration-0')}`} />
          </>
        )}
        {mode === 'callejero' && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40">
            <div className="relative w-32 h-32">
              {[0,45,90,135,180,225,270,315].map((deg, i) => (
                <div key={i} className={`absolute top-1/2 left-1/2 w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-slate-900 ${i%2===0?'bg-amber-400':'bg-sky-400'} ${cStep===2?'opacity-30':''} transition-all duration-700 shadow-lg`} style={{ transform: `rotate(${deg}deg) translateY(${cStep===2?'-65px':'-40px'})` }} />
              ))}
              <div className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-lg transition-all">{cStep===1?'💬':cStep===2?'⚽':'🤝'}</div>
            </div>
          </div>
        )}
      </div>
      {mode !== 'callejero' ? (
        <button onClick={() => { setPassing(true); setTimeout(() => setPassing(false), 1100); }} className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 rounded-2xl font-black text-base transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-emerald-500/20">
          {mode === 'society' ? '⚽ Simular Passe Longo (Espaço Aberto)' : '⚡ Simular Triangulação (Espaço Reduzido)'}
        </button>
      ) : (
        <div className="space-y-3">
          {[{ s: 1, t: '1º Diálogo', d: 'Criam as regras juntos antes do jogo.' }, { s: 2, t: '2º Partida', d: 'Jogam sem árbitro externo.' }, { s: 3, t: '3º Reflexão', d: 'Quem respeitou mais ganha.' }].map(item => (
            <button key={item.s} onClick={() => setCStep(item.s)} className={`w-full text-left p-4 rounded-2xl border-2 flex items-center gap-4 transition-all hover:-translate-y-1 active:scale-[0.98] ${cStep===item.s?'bg-amber-500/20 border-amber-500':'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-base flex-shrink-0 shadow-md ${cStep===item.s?'bg-amber-500 text-slate-900':'bg-slate-700 text-white'}`}>{item.s}</div>
              <div><div className={`font-black text-base ${cStep===item.s?'text-amber-400':'text-white'}`}>{item.t}</div>{cStep===item.s&&<div className="text-sm mt-1 text-slate-300">{item.d}</div>}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HandballSim() {
  const [f, setF] = useState('6:0');
  const pos = {
    '6:0': [{x:14,y:66},{x:28,y:61},{x:43,y:56},{x:57,y:56},{x:72,y:61},{x:86,y:66}],
    '5:1': [{x:14,y:66},{x:30,y:61},{x:50,y:35},{x:70,y:61},{x:86,y:66},{x:50,y:57}],
    '3:3': [{x:22,y:66},{x:50,y:61},{x:78,y:66},{x:28,y:38},{x:50,y:32},{x:72,y:38}],
  };
  const desc = { '6:0': 'Barreira Clássica: 6 jogadores na linha de 6m. Forte contra arremessos curtos, vulnerável a arremessos de longa distância (9m).', '5:1': 'Com "Bico": 5 na linha + 1 adiantado pressionando o armador adversário para quebrar a organização.', '3:3': 'Duas linhas de 3. Ideal para iniciação escolar, pois dá a cada jogador uma responsabilidade de marcação individual clara.' };
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 text-white space-y-6 shadow-2xl border border-orange-500/20">
      <div className="flex justify-between items-center flex-wrap gap-4 bg-black/30 p-4 rounded-2xl">
        <div><h4 className="font-black text-lg text-orange-400">Prancheta Tática</h4><p className="text-slate-400 text-sm">Altere o sistema defensivo</p></div>
        <div className="flex bg-slate-800 p-1.5 rounded-xl border border-slate-700">
          {['6:0','5:1','3:3'].map(form => <button key={form} onClick={() => setF(form)} className={`px-5 py-2 rounded-lg font-black text-sm transition-all duration-300 ${f===form?'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-100':'text-slate-400 hover:text-white hover:bg-white/5'}`}>{form}</button>)}
        </div>
      </div>
      <div className="relative bg-rose-200/90 rounded-2xl border-4 border-slate-700 overflow-hidden shadow-inner" style={{ minHeight: 280 }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-t-[10px] border-x-[10px] border-white rounded-t-[140px] bg-rose-300 flex items-end justify-center pb-4" style={{width:'84%',height:165}}><span className="text-rose-600/60 font-black text-xs uppercase tracking-widest">Área do Goleiro (6m)</span></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-t-4 border-x-4 border-dashed border-rose-400 rounded-t-[160px]" style={{width:'94%',height:220}} />
        {pos[f].map((p, i) => (
          <div key={`${f}-${i}`} className="absolute w-12 h-12 bg-slate-900 rounded-full border-[3px] border-orange-400 shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center justify-center font-black text-white text-base transition-all duration-700"
            style={{left:`${p.x}%`,bottom:`${p.y}%`,transform:'translate(-50%, 50%)',transitionTimingFunction:'cubic-bezier(0.34,1.56,0.64,1)'}}>{i+1}</div>
        ))}
      </div>
      <div className="bg-slate-800 p-5 rounded-2xl border-l-4 border-orange-500 flex gap-4 shadow-md"><span className="text-2xl flex-shrink-0 animate-pulse">💡</span><p className="text-slate-300 text-[15px] leading-relaxed font-medium">{desc[f]}</p></div>
    </div>
  );
}

// ── CHAPTER CARD ─────────────────────────────────────────────────────────────
function ChapterCard({ chapter, accent, index }) {
  const [open, setOpen] = useState(false);
  const borderMap = { indigo: 'border-indigo-400 bg-indigo-50/50', emerald: 'border-emerald-400 bg-emerald-50/50', orange: 'border-orange-400 bg-orange-50/50' };
  const pillMap = { indigo: 'bg-indigo-600 shadow-indigo-500/30', emerald: 'bg-emerald-600 shadow-emerald-500/30', orange: 'bg-orange-600 shadow-orange-500/30' };
  return (
    <div className={`border-l-[5px] rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'bg-white shadow-lg border-slate-200' : borderMap[accent] + ' hover:shadow-md'}`}>
      <button onClick={() => setOpen(o => !o)} className="w-full text-left p-5 flex items-center gap-4 active:scale-[0.99] transition-transform">
        <div className={`w-10 h-10 ${pillMap[accent]} rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-lg`}>{index + 1}</div>
        <span className="text-2xl flex-shrink-0">{chapter.icon}</span>
        <span className="font-black text-slate-800 text-lg flex-1 text-left">{chapter.title}</span>
        <span className={`text-xl flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-slate-800' : 'text-slate-400'}`}>⌄</span>
      </button>
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-2 space-y-5 border-t border-slate-100 mx-5">
          <p className="text-slate-700 leading-relaxed text-[15px] font-medium">{chapter.body}</p>
          <ul className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-100">
            {chapter.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700"><span className="text-slate-400 mt-1 flex-shrink-0 text-xs">🟢</span><span className="text-[15px] leading-relaxed">{b}</span></li>
            ))}
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm">
            <p className="text-amber-900 font-bold text-[15px] leading-relaxed flex items-start gap-2"><span className="text-lg">🎯</span> <span>{chapter.proTip.replace('🎯 ', '')}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── REVISION SHEET ───────────────────────────────────────────────────────────
function RevisionSheet({ tab }) {
  const data = STUDY[tab];
  const headMap = { indigo: 'bg-indigo-600 shadow-indigo-500/30', emerald: 'bg-emerald-600 shadow-emerald-500/30', orange: 'bg-orange-600 shadow-orange-500/30' };
  const bgMap = { indigo: 'bg-indigo-50/50 border-indigo-100', emerald: 'bg-emerald-50/50 border-emerald-100', orange: 'bg-orange-50/50 border-orange-100' };
  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/4 -z-10" />
      <div className="flex items-center gap-5 mb-8 pb-8 border-b border-slate-100">
        <div className="text-6xl drop-shadow-md">{data.icon}</div>
        <div><h3 className="text-3xl font-black text-slate-800">Ficha de Revisão</h3><p className="text-slate-500 text-base font-medium mt-1">Todos os dados para consulta rápida antes da prova</p></div>
      </div>
      {data.revisionItems.map((section, i) => (
        <div key={i} className="mb-8">
          <div className={`inline-block ${headMap[data.accent]} text-white font-black px-5 py-2.5 rounded-xl mb-5 text-sm uppercase tracking-widest shadow-md`}>{section.category}</div>
          <div className="space-y-3">
            {section.items.map((item, j) => (
              <div key={j} className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 ${bgMap[data.accent]} border rounded-2xl px-5 py-4 hover:shadow-md transition-shadow`}>
                <span className="font-black text-slate-800 text-[15px] sm:w-64 flex-shrink-0">{item.q}</span>
                <span className="text-slate-600 text-[15px] leading-relaxed font-medium">{item.a}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mt-6 shadow-sm">
        <p className="font-black text-amber-900 mb-4 text-lg flex items-center gap-2"><span>🎯</span> Dicas Quentes para a Prova:</p>
        <div className="space-y-3">
          {data.chapters.map((c, i) => <p key={i} className="text-amber-800 text-[15px] font-medium leading-relaxed flex items-start gap-2"><span className="text-amber-400 mt-1">•</span> <span>{c.proTip.replace('🎯 ', '')}</span></p>)}
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ onSelect, quizScores, onExit }) {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Nunito:wght@400;600;700;800;900&display=swap');*{font-family:'Nunito',sans-serif;}.syne{font-family:'Syne',sans-serif;}@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}.fu{animation:fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;}::-webkit-scrollbar{width:8px;}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.2);border-radius:99px;}`}</style>
      
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0 z-50 shadow-xl">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-violet-500/20">✨</div>
            <div><div className="syne text-white font-black text-xl leading-none">Arena dos Sentidos</div><div className="text-white/50 text-xs font-bold mt-1">Esportes Paralímpicos & Inclusão</div></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-full border border-white/10 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]" />
              <span className="text-white/80 text-sm font-bold">{Object.values(quizScores).filter((s: number) => s >= 5).length}/3 dominados</span>
            </div>
            {/* NOVO BOTÃO DE SAIR */}
            <button 
              onClick={onExit} 
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-red-500/90 border border-white/10 hover:border-red-400 text-white rounded-full font-bold text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 group"
            >
              Sair <span className="text-lg leading-none group-hover:rotate-90 transition-transform">×</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-5 md:px-10 py-16 space-y-16 relative z-10">
        <div className="text-center space-y-6 fu">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2 rounded-full text-white/70 text-sm font-black uppercase tracking-widest shadow-sm">📚 Módulo de Esportes de Invasão</div>
          <h1 className="syne text-5xl md:text-7xl font-black text-white leading-tight">Dashboard dos<br /><span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">Módulos</span></h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-medium">Escolha um módulo para estudar. Cada um tem conteúdo completo, flashcards, simulador e quiz — tudo que você precisa para gabaritar a prova.</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 md:gap-6 fu" style={{ animationDelay: '0.1s' }}>
          {[{ label: 'Módulos Disponíveis', value: '3', icon: '📦' }, { label: 'Questões de Quiz', value: '18', icon: '🧠' }, { label: 'Flashcards no Total', value: '30', icon: '🃏' }].map((s, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-center shadow-lg hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="text-4xl font-black text-white">{s.value}</div>
              <div className="text-white/50 text-xs mt-2 font-bold uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
        
        <div className="space-y-8">
          <h2 className="syne text-3xl font-black text-white/90 px-2">Selecione um Módulo</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(STUDY).map(([id, mod], idx) => {
              const sc = quizScores[id];
              const done = sc >= 5;
              const pct = sc ? Math.round((sc / mod.quizzes.length) * 100) : 0;
              return (
                <button key={id} onClick={() => onSelect(id)}
                  className="group text-left bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden fu"
                  style={{ animationDelay: `${idx * 0.15 + 0.2}s` }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className={`w-20 h-20 bg-gradient-to-br ${mod.color} rounded-[1.5rem] flex items-center justify-center text-5xl shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>{mod.icon}</div>
                      {done && <div className="bg-green-500/20 border border-green-400/30 text-green-400 px-4 py-1.5 rounded-full text-xs font-black shadow-sm flex items-center gap-1"><span>✓</span> Concluído</div>}
                    </div>
                    <div>
                      <h3 className="syne text-3xl font-black text-white mb-2">{mod.label}</h3>
                      <p className="text-white/50 text-[15px] leading-relaxed font-medium">{mod.tagline}</p>
                    </div>
                    <div className="space-y-2.5 bg-black/20 p-4 rounded-2xl">
                      <div className="flex justify-between text-xs text-white/60 font-bold uppercase tracking-wider">
                        <span>{sc ? `Quiz: ${sc}/${mod.quizzes.length}` : 'Não iniciado'}</span><span>{pct}%</span>
                      </div>
                      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden shadow-inner"><div className={`h-full bg-gradient-to-r ${mod.color} transition-all duration-1000 rounded-full`} style={{ width: `${pct}%` }} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[`${mod.chapters.length} Capítulos`, `${mod.flashcards.length} Flashcards`, `${mod.quizzes.length} Questões`, 'Revisão Rápida'].map((item, j) => (
                        <div key={j} className="bg-white/5 border border-white/5 rounded-xl px-3 py-2.5 text-white/60 font-bold flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> {item}</div>
                      ))}
                    </div>
                    <div className={`w-full py-4 bg-gradient-to-r ${mod.color} text-white rounded-2xl font-black text-lg text-center shadow-lg group-hover:shadow-xl transition-all`}>
                      {done ? 'Revisar Módulo →' : 'Começar Agora →'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-violet-900/30 to-pink-900/30 border border-violet-500/20 rounded-[2.5rem] p-10 text-center shadow-2xl backdrop-blur-md">
          <div className="text-5xl mb-4 drop-shadow-md">🎯</div>
          <h3 className="syne text-3xl font-black text-white mb-3">Seu Roteiro de Estudo</h3>
          <p className="text-white/70 max-w-3xl mx-auto leading-relaxed text-base font-medium">Recomendamos seguir a jornada: <strong className="text-white bg-white/10 px-2 py-1 rounded-md mx-1">Início → Aprenda → Flashcards → Simulador → Quiz → Revisão</strong>. A Ficha de Revisão contém o "suco" da matéria, ideal para ler no ônibus ou minutos antes da prova.</p>
        </div>
      </main>
    </div>
  );
}

// ── MODULE PAGE ───────────────────────────────────────────────────────────────
function ModulePage({ tab, onBack, quizScore, onQuizScore }) {
  const data = STUDY[tab];
  const [section, setSection] = useState('intro');
  const mainRef = useRef(null);

  const nav = [
    { id: 'intro', label: 'Início', icon: '🏠' },
    { id: 'aprenda', label: 'Aprenda', icon: '📖' },
    { id: 'flashcards', label: 'Flashcards', icon: '🃏' },
    { id: 'simulador', label: 'Simule', icon: '🎮' },
    { id: 'quiz', label: 'Quiz', icon: '🧠' },
    { id: 'revisao', label: 'Revisão', icon: '📋' },
  ];

  const ac = {
    indigo: { pill: 'bg-indigo-600 shadow-indigo-500/30', text: 'text-indigo-600' },
    emerald: { pill: 'bg-emerald-600 shadow-emerald-500/30', text: 'text-emerald-600' },
    orange: { pill: 'bg-orange-600 shadow-orange-500/30', text: 'text-orange-600' },
  }[data.accent];

  const bgMap = { goalball: 'from-indigo-950 via-slate-900 to-indigo-950', futebol: 'from-emerald-950 via-slate-900 to-emerald-950', handebol: 'from-orange-950 via-slate-900 to-orange-950' };

  const nextMap = { intro: 'aprenda', aprenda: 'flashcards', flashcards: 'simulador', simulador: 'quiz', quiz: 'revisao', revisao: null };

  const go = (s) => { setSection(s); mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); };

  const NavBtn = ({ id, next }) => next && (
    <button onClick={() => go(next)} className={`w-full py-5 mt-4 ${ac.pill} text-white rounded-2xl font-black text-xl shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all`}>
      {nav.find(n => n.id === next)?.icon} Avançar para {nav.find(n => n.id === next)?.label} →
    </button>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgMap[tab]} transition-all duration-700 relative`}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Nunito:wght@400;600;700;800;900&display=swap');*{font-family:'Nunito',sans-serif;}.syne{font-family:'Syne',sans-serif;}@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}.fu{animation:fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;}::-webkit-scrollbar{width:8px;}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.2);border-radius:99px;}`}</style>

      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center gap-4 flex-wrap">
          <button onClick={onBack} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 flex-shrink-0 shadow-sm">
            ← Voltar
          </button>
          <div className="flex items-center gap-3 flex-1 min-w-0 border-l border-white/10 pl-4">
            <span className="text-2xl drop-shadow-md">{data.icon}</span>
            <span className="syne text-white font-black text-xl truncate">{data.label}</span>
          </div>
          <div className="flex gap-2 bg-black/30 p-1.5 rounded-full border border-white/5 overflow-x-auto hide-scrollbar">
            {nav.map(n => (
              <button key={n.id} onClick={() => go(n.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${section === n.id ? `${ac.pill} text-white shadow-md scale-100` : 'text-white/50 hover:text-white hover:bg-white/10'}`}>
                <span className="text-lg leading-none">{n.icon}</span><span className="hidden sm:inline">{n.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 flex-shrink-0 hidden md:block">
          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 sticky top-28 shadow-2xl space-y-2">
            <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-4 px-2">Navegação do Módulo</p>
            {nav.map(n => (
              <button key={n.id} onClick={() => go(n.id)} className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold flex items-center gap-4 transition-all text-[15px] ${section === n.id ? 'bg-white text-slate-900 shadow-xl scale-[1.02]' : 'text-white/60 hover:bg-white/10 hover:text-white hover:translate-x-1'}`}>
                <span className="text-xl">{n.icon}</span><span className="flex-1">{n.label}</span>
                {n.id === 'quiz' && quizScore > 0 && <span className={`text-xs font-black px-2 py-1 rounded-md ${quizScore >= 5 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{quizScore}/{data.quizzes.length}</span>}
              </button>
            ))}
            <div className="mt-6 pt-6 border-t border-white/10 px-2">
              <div className="flex justify-between text-xs text-white/50 font-bold mb-2"><span>Progresso Quiz</span> <span>{quizScore ? Math.round((quizScore / data.quizzes.length) * 100) : 0}%</span></div>
              <div className="h-2.5 bg-black/40 rounded-full overflow-hidden shadow-inner"><div className={`h-full ${ac.pill} transition-all duration-1000 rounded-full`} style={{ width: `${quizScore ? Math.round((quizScore / data.quizzes.length) * 100) : 0}%` }} /></div>
            </div>
          </div>
        </aside>

        <main ref={mainRef} className="flex-1 min-w-0 space-y-8 fu pb-20">

          {section === 'intro' && (
            <div className="space-y-8">
              <div className={`bg-gradient-to-br ${data.color} rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden border border-white/10`}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
                <div className="relative z-10">
                  <div className="text-7xl mb-6 drop-shadow-lg animate-[fadeUp_0.5s_ease]">{data.icon}</div>
                  <h2 className="syne text-5xl md:text-7xl font-black mb-4 leading-none">{data.label}</h2>
                  <p className="text-white/80 text-xl mb-8 font-bold tracking-wide">{data.tagline}</p>
                  <p className="text-white/90 text-lg leading-relaxed max-w-2xl font-medium bg-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">{data.heroText}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {data.stats.map((s, i) => <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center shadow-lg hover:bg-white/10 transition-colors"><div className="text-3xl mb-2">{s.icon}</div><div className="text-white font-black text-2xl">{s.value}</div><div className="text-white/50 text-[11px] mt-2 font-bold uppercase tracking-widest">{s.label}</div></div>)}
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {nav.slice(1).map(n => <button key={n.id} onClick={() => go(n.id)} className="bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 rounded-3xl p-6 text-left transition-all hover:-translate-y-1 hover:shadow-xl group"><div className="text-4xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 drop-shadow-md">{n.icon}</div><div className="text-white font-black text-lg">{n.label}</div><div className="text-white/40 text-xs mt-1 font-bold">Explorar seção →</div></button>)}
              </div>
              <NavBtn id="intro" next={nextMap['intro']} />
            </div>
          )}

          {section === 'aprenda' && (
            <div className="space-y-8">
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/4 -z-10" />
                <div className={`inline-flex items-center gap-2 ${ac.pill} text-white px-5 py-2 rounded-full text-sm font-black mb-6 shadow-md`}>📖 Conteúdo Completo</div>
                <h2 className="syne text-4xl font-black text-slate-800 mb-8">{data.label} — Tudo para a Prova</h2>
                <div className="space-y-6">{data.chapters.map((ch, i) => <ChapterCard key={i} chapter={ch} accent={data.accent} index={i} />)}</div>
              </div>
              <NavBtn id="aprenda" next={nextMap['aprenda']} />
            </div>
          )}

          {section === 'flashcards' && (
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 shadow-xl">
                <div className={`inline-flex items-center gap-2 ${ac.pill} text-white px-5 py-2 rounded-full text-sm font-black mb-4 shadow-md`}>🃏 Flashcards</div>
                <h2 className="syne text-3xl font-black text-white mb-2">Memorize o que Importa</h2>
                <p className="text-white/60 text-base font-medium">Estudo ativo: leia a pergunta, tente lembrar a resposta e clique na carta para virar. Separe o que você já sabe do que precisa revisar.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">{data.flashcards.map((fc, i) => <FlashCard key={i} front={fc.front} back={fc.back} index={i} />)}</div>
              <NavBtn id="flashcards" next={nextMap['flashcards']} />
            </div>
          )}

          {section === 'simulador' && (
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 shadow-xl">
                <div className={`inline-flex items-center gap-2 ${ac.pill} text-white px-5 py-2 rounded-full text-sm font-black mb-4 shadow-md`}>🎮 Simulador Interativo</div>
                <h2 className="syne text-3xl font-black text-white mb-2">Experimente na Prática</h2>
                <p className="text-white/60 text-base font-medium">A teoria fica mais clara quando você visualiza. Interaja com a quadra e as táticas do esporte.</p>
              </div>
              {tab === 'goalball' && <GoalballSim />}
              {tab === 'futebol' && <FootballSim />}
              {tab === 'handebol' && <HandballSim />}
              <NavBtn id="simulador" next={nextMap['simulador']} />
            </div>
          )}

          {section === 'quiz' && (
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 shadow-xl">
                <div className={`inline-flex items-center gap-2 ${ac.pill} text-white px-5 py-2 rounded-full text-sm font-black mb-4 shadow-md`}>🧠 Quiz de Fixação</div>
                <h2 className="syne text-3xl font-black text-white mb-2">Teste seu Conhecimento</h2>
                <p className="text-white/60 text-base font-medium">Separamos {data.quizzes.length} questões com o estilo e as pegadinhas que mais caem em provas. A meta é acertar 5 ou mais.</p>
              </div>
              <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl"><QuizSection tab={tab} onComplete={onQuizScore} /></div>
              {quizScore >= 5 && (
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400/30 rounded-[2.5rem] p-8 text-center space-y-5 shadow-lg backdrop-blur-sm animate-[fadeUp_0.5s_ease]">
                  <div className="text-6xl drop-shadow-md">🏆</div>
                  <div>
                    <h3 className="syne font-black text-white text-3xl mb-1">Módulo Dominado!</h3>
                    <p className="text-white/70 font-medium">Você mandou muito bem. Seu próximo passo é salvar a ficha de revisão.</p>
                  </div>
                  <button onClick={() => go('revisao')} className={`px-8 py-4 mt-2 ${ac.pill} text-white rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl`}>Acessar Ficha de Revisão →</button>
                </div>
              )}
            </div>
          )}

          {section === 'revisao' && (
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 shadow-xl">
                <div className={`inline-flex items-center gap-2 ${ac.pill} text-white px-5 py-2 rounded-full text-sm font-black mb-4 shadow-md`}>📋 Ficha de Revisão</div>
                <h2 className="syne text-3xl font-black text-white mb-2">O Resumo da Ópera</h2>
                <p className="text-white/60 text-base font-medium">Todos os dados técnicos, regras e dicas em formato ultracompacto. Leia isso antes de entrar na sala de prova.</p>
              </div>
              <RevisionSheet tab={tab} />
              <button onClick={onBack} className="w-full py-6 mt-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-3xl font-black text-xl hover:-translate-y-1 transition-all active:scale-[0.98] shadow-lg">
                ← Concluir e Voltar ao Dashboard
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('goalball');
  const [quizScores, setQuizScores] = useState({ goalball: 0, futebol: 0, handebol: 0 });

  const handleExit = () => {
    window.location.href = '/dashboard';
  };

  if (screen === 'dashboard') {
    return (
      <Dashboard 
        onSelect={(t) => { setActiveTab(t); setScreen('module'); }} 
        quizScores={quizScores} 
        onExit={handleExit}
      />
    );
  }
  
  return (
    <ModulePage 
      tab={activeTab} 
      onBack={() => setScreen('dashboard')} 
      quizScore={quizScores[activeTab]} 
      onQuizScore={(s) => setQuizScores(p => ({ ...p, [activeTab]: s }))} 
    />
  );
}