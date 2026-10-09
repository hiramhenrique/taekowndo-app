import { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Alert } from 'react-native';
import { addTrainingRecord, formatDuration } from './state/trainingRecordsStore';

type TrainingKey = 'A' | 'B';
type PlaceKey = 'dojang' | 'academia';

type WarmupItem = {
  id: number;
  exercicio: string;
  quanto: string;
  comoFazer: string;
  atencao: string;
};

type TrainingExercise = {
  id: string;
  exercicio: string;
  seriesReps: string;
  descanso: string;
  comoFazer: string[];
  cuidadoErroComum: string;
  paraQueServe: string;
  achouDificil: string;
};

const AQUECIMENTO: WarmupItem[] = [
  {
    id: 1,
    exercicio: 'Polichinelo',
    quanto: '1 minuto',
    comoFazer: 'Abra e feche pernas e braços no mesmo ritmo. Aterrisse leve na ponta dos pés.',
    atencao: 'Evite bater o calcanhar no chão.',
  },
  {
    id: 2,
    exercicio: 'Corrida no lugar com joelho alto',
    quanto: '2 x 30 seg',
    comoFazer: 'Corra parado elevando os joelhos até a altura do quadril, com tronco reto.',
    atencao: 'Não jogue o corpo para trás durante a corrida.',
  },
  {
    id: 3,
    exercicio: 'Abrir e fechar o portão',
    quanto: '8 cada perna',
    comoFazer: 'Suba o joelho à frente, abra para o lado e depois feche no caminho contrário.',
    atencao: 'Se precisar, segure em uma parede para manter o equilíbrio.',
  },
  {
    id: 4,
    exercicio: 'Agachamento lento',
    quanto: '10 reps',
    comoFazer: 'Desça controlado em 3 segundos e suba mantendo joelhos alinhados aos pés.',
    atencao: 'Mantenha os calcanhares no chão e os joelhos na linha dos pés.',
  },
  {
    id: 5,
    exercicio: 'Afundo com giro de tronco',
    quanto: '6 cada lado',
    comoFazer: 'Faça um passo à frente, desça e gire o tronco para o lado da perna da frente.',
    atencao: 'O joelho da frente não deve ultrapassar muito a ponta do pé.',
  },
  {
    id: 6,
    exercicio: 'Balanço de perna (frente e lado)',
    quanto: '10 cada direção',
    comoFazer: 'Apoie na parede e balance a perna para frente/trás e depois para o lado.',
    atencao: 'Comece com amplitude pequena e aumente aos poucos.',
  },
  {
    id: 7,
    exercicio: 'Saltitos na base de luta',
    quanto: '30 seg',
    comoFazer: 'Fique na base e quique leve na ponta dos pés com joelhos levemente dobrados.',
    atencao: 'Movimento leve e solto, sem rigidez.',
  },
  {
    id: 8,
    exercicio: 'Chutes leves',
    quanto: '10 cada perna',
    comoFazer: 'Aplique ap tchagui e bandal tchagui com 50% de força e altura média.',
    atencao: 'É aquecimento: sem força máxima e sem buscar altura máxima.',
  },
];

const TREINO_A_DOJANG: TrainingExercise[] = [
  {
    id: 'a-dojang-1',
    exercicio: 'Salto vertical',
    seriesReps: '3 x 5',
    descanso: '1min30',
    comoFazer: [
      'Pés na largura do quadril.',
      'Agache rápido até 1/4 da altura, jogando os braços pra trás.',
      'Salte o mais alto que puder, braços pra cima.',
      'Aterrisse macio e PARE 2 seg antes do próximo salto.',
    ],
    cuidadoErroComum:
      'Aterrissar com o joelho entortando pra dentro. Cada salto é no máximo de força, por isso são poucas reps.',
    paraQueServe:
      'Força explosiva das pernas: chute mais rápido e saída rápida pra atacar ou esquivar.',
    achouDificil: 'Salto menor, sem jogar os braços.',
  },
  {
    id: 'a-dojang-2',
    exercicio: 'Agachamento livre',
    seriesReps: '3 x 15',
    descanso: '1 min',
    comoFazer: [
      'Pés na largura dos ombros, pontas levemente pra fora.',
      'Braços à frente, empurre o quadril pra trás e desça.',
      'Desça até a coxa ficar paralela ao chão (ou o máximo que conseguir com as costas retas).',
      'Empurre o chão e suba.',
    ],
    cuidadoErroComum: 'Tirar o calcanhar do chão ou arredondar as costas.',
    paraQueServe: 'Base forte e estável; ajuda a manter a base de luta sem cansar.',
    achouDificil: 'Agache até sentar num banco/cadeira e levante.',
  },
  {
    id: 'a-dojang-3',
    exercicio: 'Afundo alternado (passada)',
    seriesReps: '3 x 10 cada perna',
    descanso: '1 min',
    comoFazer: [
      'Em pé, dê um passo grande à frente.',
      'Desça até os dois joelhos ficarem dobrados em 90° (joelho de trás quase no chão).',
      'Empurre com a perna da frente e volte.',
      'Troque a perna.',
    ],
    cuidadoErroComum: 'Joelho da frente caindo pra dentro. Tronco caindo pra frente.',
    paraQueServe:
      'Força de uma perna só: no taekwondo você chuta e se apoia numa perna.',
    achouDificil: 'Faça parado (sem voltar), segurando uma parede.',
  },
  {
    id: 'a-dojang-4',
    exercicio: 'Ponte de glúteo',
    seriesReps: '3 x 12',
    descanso: '1 min',
    comoFazer: [
      'Deitado de costas, joelhos dobrados, pés no chão.',
      'Aperte o bumbum e suba o quadril até formar uma linha reta joelho-quadril-ombro.',
      'Segure 2 seg lá em cima.',
      'Desça devagar.',
    ],
    cuidadoErroComum: 'Subir arqueando a lombar em vez de usar o glúteo.',
    paraQueServe: 'Glúteo forte = chute mais potente e proteção da lombar.',
    achouDificil: 'Diminua a altura da subida. Mais difícil: com uma perna só.',
  },
  {
    id: 'a-dojang-5',
    exercicio: 'Equilíbrio na câmara do chute',
    seriesReps: '3 x 20 seg cada perna',
    descanso: '45 seg',
    comoFazer: [
      'Na base de luta, suba o joelho de trás na posição de câmara (como se fosse chutar).',
      'Segure parado nessa posição, braços em guarda.',
      'Mantenha o tronco firme.',
    ],
    cuidadoErroComum:
      'Inclinar muito o tronco ou deixar a perna de apoio totalmente travada (deixe o joelho levemente dobrado).',
    paraQueServe: 'Controle e equilíbrio no chute; perna de apoio mais estável.',
    achouDificil: 'Toque um dedo na parede. Mais difícil: olhos fechados.',
  },
  {
    id: 'a-dojang-6',
    exercicio: 'Panturrilha em uma perna',
    seriesReps: '3 x 15 cada perna',
    descanso: '45 seg',
    comoFazer: [
      'Em pé numa perna, segure numa parede.',
      'Suba na ponta do pé o mais alto que puder.',
      'Desça devagar (2 seg).',
    ],
    cuidadoErroComum: 'Fazer rápido e curto. O movimento tem que ser completo.',
    paraQueServe: 'Mobilidade na ponta dos pés, giro no chute e proteção do tornozelo.',
    achouDificil: 'Faça com as duas pernas juntas.',
  },
  {
    id: 'a-dojang-7',
    exercicio: 'Prancha frontal',
    seriesReps: '3 x 30 seg',
    descanso: '45 seg',
    comoFazer: [
      'Apoie antebraços e ponta dos pés no chão.',
      'Corpo reto como uma tábua, da cabeça ao calcanhar.',
      'Aperte o abdômen e o bumbum.',
      'Respire normalmente.',
    ],
    cuidadoErroComum: 'Quadril caindo (dói a lombar) ou bumbum muito alto.',
    paraQueServe: 'Core firme: transfere a força do quadril pro chute e aguenta impacto.',
    achouDificil: 'Apoie os joelhos no chão.',
  },
  {
    id: 'a-dojang-8',
    exercicio: 'Inseto morto',
    seriesReps: '3 x 8 cada lado',
    descanso: '45 seg',
    comoFazer: [
      'Deitado de costas, braços esticados pro teto, joelhos dobrados em 90° no ar.',
      'Cole a lombar no chão.',
      'Estique um braço pra trás e a perna do lado oposto pra frente, devagar.',
      'Volte e troque o lado.',
    ],
    cuidadoErroComum:
      'Lombar sair do chão. Se isso acontecer, diminua a distância do movimento.',
    paraQueServe: 'Controle do abdômen enquanto braços e pernas se mexem, igual na luta.',
    achouDificil: 'Mexa só as pernas, braços parados.',
  },
];

const TREINO_A_ACADEMIA: TrainingExercise[] = [
  {
    id: 'a-academia-1',
    exercicio: 'Salto vertical',
    seriesReps: '3 x 5',
    descanso: '1min30',
    comoFazer: [
      'Pés na largura do quadril.',
      'Agache rápido até 1/4 da altura, jogando os braços pra trás.',
      'Salte o mais alto que puder.',
      'Aterrisse macio e PARE 2 seg antes do próximo.',
    ],
    cuidadoErroComum: 'Joelho entortando pra dentro na aterrissagem.',
    paraQueServe: 'Força explosiva: chute mais rápido e saída rápida.',
    achouDificil: 'Salto menor, sem jogar os braços.',
  },
  {
    id: 'a-academia-2',
    exercicio: 'Agachamento com halter (goblet)',
    seriesReps: '3 x 10',
    descanso: '1min30',
    comoFazer: [
      'Segure um halter em pé, colado no peito, com as duas mãos.',
      'Pés na largura dos ombros.',
      'Desça empurrando o quadril pra trás, cotovelos por dentro dos joelhos.',
      'Suba empurrando o chão.',
    ],
    cuidadoErroComum: 'Costas arredondando ou calcanhar saindo do chão.',
    paraQueServe: 'Força das pernas e base de luta firme.',
    achouDificil: 'Faça sem peso ou sentando num banco.',
  },
  {
    id: 'a-academia-3',
    exercicio: 'Stiff com halteres',
    seriesReps: '3 x 10',
    descanso: '1min30',
    comoFazer: [
      'Em pé, um halter em cada mão na frente das coxas.',
      'Joelhos levemente dobrados (e parados assim).',
      'Empurre o quadril pra trás e desça os halteres rente às pernas até sentir alongar atrás da coxa.',
      'Suba apertando o bumbum.',
    ],
    cuidadoErroComum: 'Arredondar as costas. Coluna sempre reta, olhar pra frente/baixo.',
    paraQueServe: 'Posterior de coxa forte: chutes altos com menos risco de lesão.',
    achouDificil: 'Use halteres mais leves e desça menos.',
  },
  {
    id: 'a-academia-4',
    exercicio: 'Agachamento búlgaro',
    seriesReps: '3 x 8 cada perna',
    descanso: '1 min',
    comoFazer: [
      'De costas pra um banco, apoie o peito do pé de trás nele.',
      'Halteres nas mãos (ou sem peso no começo).',
      'Desça reto até o joelho de trás quase tocar o chão.',
      'Suba empurrando com a perna da frente.',
    ],
    cuidadoErroComum: 'Pé da frente muito perto do banco. Joelho caindo pra dentro.',
    paraQueServe: 'Força e equilíbrio em uma perna = a perna de apoio do chute.',
    achouDificil: 'Faça sem halteres, segurando num apoio.',
  },
  {
    id: 'a-academia-5',
    exercicio: 'Elevação de quadril no banco',
    seriesReps: '3 x 10',
    descanso: '1min30',
    comoFazer: [
      'Sente no chão com as costas (parte de cima) apoiadas num banco.',
      'Halter ou anilha sobre o quadril, joelhos dobrados.',
      'Suba o quadril até o tronco ficar reto, apertando o bumbum.',
      'Desça controlando.',
    ],
    cuidadoErroComum: 'Arquear a lombar no topo. Queixo levemente pra baixo ajuda.',
    paraQueServe: 'Glúteo potente = chute com mais força.',
    achouDificil: 'Faça sem peso ou no chão (ponte de glúteo).',
  },
  {
    id: 'a-academia-6',
    exercicio: 'Panturrilha em pé',
    seriesReps: '3 x 15',
    descanso: '45 seg',
    comoFazer: [
      'Na máquina de panturrilha (ou segurando um halter, numa perna só).',
      'Suba na ponta do pé o máximo.',
      'Segure 1 seg.',
      'Desça devagar até alongar.',
    ],
    cuidadoErroComum: 'Movimento curto e rápido.',
    paraQueServe: 'Ponta dos pés forte: movimentação e giro no chute.',
    achouDificil: 'Menos peso.',
  },
  {
    id: 'a-academia-7',
    exercicio: 'Prancha frontal',
    seriesReps: '3 x 30-40 seg',
    descanso: '45 seg',
    comoFazer: [
      'Antebraços e ponta dos pés no chão.',
      'Corpo reto da cabeça ao calcanhar.',
      'Aperte abdômen e bumbum, respire normal.',
    ],
    cuidadoErroComum: 'Quadril caindo ou muito alto.',
    paraQueServe: 'Core firme pra transferir força e aguentar impacto.',
    achouDificil: 'Apoie os joelhos.',
  },
  {
    id: 'a-academia-8',
    exercicio: 'Pallof (antirrotação no cabo)',
    seriesReps: '3 x 10 cada lado',
    descanso: '45 seg',
    comoFazer: [
      'De lado pro cabo (polia na altura do peito), segure o pegador com as duas mãos no peito.',
      'Afaste-se até o cabo ficar esticado.',
      'Empurre as mãos pra frente, esticando os braços, SEM deixar o corpo girar.',
      'Volte devagar.',
    ],
    cuidadoErroComum: 'Deixar o tronco girar na direção do cabo. Use pouco peso.',
    paraQueServe: 'Resistir a giros: estabilidade ao receber chutes e ao girar no ataque.',
    achouDificil: 'Menos peso, ou pés mais afastados.',
  },
];

const TREINO_B_DOJANG: TrainingExercise[] = [
  {
    id: 'b-dojang-1',
    exercicio: 'Deslocamento lateral na base',
    seriesReps: '4 x 15 seg',
    descanso: '45 seg',
    comoFazer: [
      'Na base de luta, guarda alta.',
      'Desloque-se rápido para um lado por uns 3 metros e volte, sem cruzar os pés.',
      'Fique na ponta dos pés o tempo todo.',
    ],
    cuidadoErroComum: 'Cruzar os pés ou ficar com as pernas esticadas.',
    paraQueServe: 'Movimentação rápida na área de luta.',
    achouDificil: 'Mais devagar, focando em não cruzar os pés.',
  },
  {
    id: 'b-dojang-2',
    exercicio: 'Salto do patinador',
    seriesReps: '3 x 8 cada lado',
    descanso: '1 min',
    comoFazer: [
      'Em pé numa perna.',
      'Salte de lado e aterrisse na outra perna.',
      'Segure 1 seg equilibrado e salte de volta.',
    ],
    cuidadoErroComum: 'Aterrissar com o joelho caindo pra dentro.',
    paraQueServe: 'Explosão lateral e controle ao aterrissar numa perna.',
    achouDificil: 'Passo lateral grande em vez de salto.',
  },
  {
    id: 'b-dojang-3',
    exercicio: 'Flexão de braço',
    seriesReps: '3 x 8-12',
    descanso: '1 min',
    comoFazer: [
      'Mãos no chão um pouco mais abertas que os ombros.',
      'Corpo reto da cabeça ao pé.',
      'Desça o peito até perto do chão, cotovelos a ~45° do corpo.',
      'Empurre e suba.',
    ],
    cuidadoErroComum: 'Quadril caindo ou cotovelos muito abertos (pra fora).',
    paraQueServe: 'Força de braço e ombro pra guarda e pra empurrar o oponente no clinch.',
    achouDificil: 'Apoie os joelhos ou faça com as mãos na parede/banco.',
  },
  {
    id: 'b-dojang-4',
    exercicio: 'Super-homem com Y',
    seriesReps: '3 x 10',
    descanso: '45 seg',
    comoFazer: [
      'Deitado de barriga pra baixo, braços esticados acima da cabeça em forma de Y.',
      'Tire braços e peito um pouco do chão, apertando as costas.',
      'Segure 2 seg e desça.',
    ],
    cuidadoErroComum: 'Jogar a cabeça pra trás. Olhe pro chão.',
    paraQueServe: 'Costas fortes: postura e ombros protegidos na guarda.',
    achouDificil: 'Suba só os braços.',
  },
  {
    id: 'b-dojang-5',
    exercicio: 'Prancha lateral',
    seriesReps: '3 x 20-30 seg cada lado',
    descanso: '45 seg',
    comoFazer: [
      'Deitado de lado, apoie o antebraço (cotovelo embaixo do ombro).',
      'Suba o quadril até o corpo ficar reto.',
      'Segure, respirando normal.',
    ],
    cuidadoErroComum: 'Quadril caindo pro chão.',
    paraQueServe: 'Lateral do core: força no chute circular e no giro.',
    achouDificil: 'Joelhos dobrados e apoiados no chão.',
  },
  {
    id: 'b-dojang-6',
    exercicio: 'Escalador',
    seriesReps: '3 x 20 seg',
    descanso: '40 seg',
    comoFazer: [
      'Na posição de flexão (braços esticados).',
      'Traga um joelho em direção ao peito e volte, alternando rápido, como se corresse.',
    ],
    cuidadoErroComum: 'Bumbum muito alto. Mantenha o corpo reto.',
    paraQueServe: 'Condicionamento e core juntos.',
    achouDificil: 'Mais devagar, um joelho de cada vez.',
  },
  {
    id: 'b-dojang-7',
    exercicio: 'Abdominal bicicleta',
    seriesReps: '3 x 10 cada lado',
    descanso: '45 seg',
    comoFazer: [
      'Deitado de costas, mãos atrás da cabeça (sem puxar o pescoço).',
      'Leve o cotovelo em direção ao joelho oposto enquanto estica a outra perna.',
      'Alterne devagar.',
    ],
    cuidadoErroComum: 'Puxar a cabeça com as mãos. Fazer correndo.',
    paraQueServe: 'Rotação do tronco presente nos chutes.',
    achouDificil: 'Pés no chão, só o giro do tronco.',
  },
  {
    id: 'b-dojang-8',
    exercicio: 'Rounds de chute (final)',
    seriesReps: '6 a 8 rounds de 20 seg',
    descanso: '40 seg entre rounds',
    comoFazer: [
      'Na base de luta, em frente a um saco/aparador ou no ar.',
      '20 seg: bandal tchagui alternando as pernas, o mais rápido possível COM técnica.',
      '40 seg: descanso andando.',
      'Repita.',
    ],
    cuidadoErroComum: 'Perder a técnica no cansaço. Se o chute ficou feio, diminua o ritmo.',
    paraQueServe: 'Simula o esforço da luta: aguentar rounds com chute rápido até o fim.',
    achouDificil: 'Comece com 4 rounds e aumente 1 por semana.',
  },
];

const TREINO_B_ACADEMIA: TrainingExercise[] = [
  {
    id: 'b-academia-1',
    exercicio: 'Deslocamento lateral na base',
    seriesReps: '4 x 15 seg',
    descanso: '45 seg',
    comoFazer: [
      'Na base de luta, guarda alta.',
      'Desloque-se rápido para um lado por uns 3 metros e volte, sem cruzar os pés.',
    ],
    cuidadoErroComum: 'Cruzar os pés ou pernas esticadas.',
    paraQueServe: 'Movimentação rápida na área de luta.',
    achouDificil: 'Mais devagar.',
  },
  {
    id: 'b-academia-2',
    exercicio: 'Salto do patinador',
    seriesReps: '3 x 8 cada lado',
    descanso: '1 min',
    comoFazer: [
      'Em pé numa perna.',
      'Salte de lado e aterrisse na outra.',
      'Segure 1 seg e volte.',
    ],
    cuidadoErroComum: 'Joelho caindo pra dentro.',
    paraQueServe: 'Explosão lateral e controle numa perna.',
    achouDificil: 'Passo lateral grande em vez de salto.',
  },
  {
    id: 'b-academia-3',
    exercicio: 'Supino com halteres',
    seriesReps: '3 x 10',
    descanso: '1min30',
    comoFazer: [
      'Deitado no banco, um halter em cada mão na altura do peito.',
      'Pés firmes no chão.',
      'Empurre os halteres pra cima até esticar os braços.',
      'Desça devagar até a altura do peito.',
    ],
    cuidadoErroComum: 'Cotovelos muito abertos. Bater um halter no outro lá em cima.',
    paraQueServe: 'Força de empurrar: guarda firme e afastar o oponente.',
    achouDificil: 'Halteres mais leves ou flexão de braço.',
  },
  {
    id: 'b-academia-4',
    exercicio: 'Remada unilateral com halter (serrote)',
    seriesReps: '3 x 10 cada lado',
    descanso: '1 min',
    comoFazer: [
      'Joelho e mão do mesmo lado apoiados no banco, costas retas.',
      'Halter na outra mão, braço esticado.',
      'Puxe o halter em direção ao quadril, cotovelo rente ao corpo.',
      'Desça devagar.',
    ],
    cuidadoErroComum: 'Girar o tronco pra levantar o peso. Costas arredondadas.',
    paraQueServe: 'Costas fortes: postura, equilíbrio entre frente e trás do ombro.',
    achouDificil: 'Halter mais leve.',
  },
  {
    id: 'b-academia-5',
    exercicio: 'Puxada na frente (pulley)',
    seriesReps: '3 x 10',
    descanso: '1min30',
    comoFazer: [
      'Sentado na máquina, coxas presas, segure a barra um pouco mais aberta que os ombros.',
      'Peito pra cima.',
      'Puxe a barra até a altura do queixo/peito, levando os cotovelos pra baixo.',
      'Suba controlando.',
    ],
    cuidadoErroComum: 'Jogar o corpo pra trás pra puxar. Puxar atrás da cabeça.',
    paraQueServe: 'Costas e braços: segurar e controlar no clinch.',
    achouDificil: 'Menos peso.',
  },
  {
    id: 'b-academia-6',
    exercicio: 'Prancha lateral',
    seriesReps: '3 x 30 seg cada lado',
    descanso: '45 seg',
    comoFazer: [
      'De lado, antebraço apoiado (cotovelo embaixo do ombro).',
      'Quadril pra cima, corpo reto.',
      'Segure respirando.',
    ],
    cuidadoErroComum: 'Quadril caindo.',
    paraQueServe: 'Força no chute circular e no giro.',
    achouDificil: 'Joelhos apoiados.',
  },
  {
    id: 'b-academia-7',
    exercicio: 'Abdominal no cabo ajoelhado',
    seriesReps: '3 x 12',
    descanso: '45 seg',
    comoFazer: [
      'Ajoelhado de frente pra polia alta, segure a corda perto da testa.',
      'Enrole o tronco pra baixo, levando os cotovelos em direção às coxas.',
      'Volte devagar.',
    ],
    cuidadoErroComum: 'Sentar nos calcanhares (usar o quadril). O movimento é só do abdômen.',
    paraQueServe: 'Abdômen forte pra subir a perna no chute e aguentar golpes.',
    achouDificil: 'Abdominal comum no chão.',
  },
  {
    id: 'b-academia-8',
    exercicio: 'Bike intervalada (final)',
    seriesReps: '6 a 8 rounds de 20 seg',
    descanso: '40 seg pedalando leve',
    comoFazer: [
      'Na bicicleta ergométrica, pedale 3 min leve pra aquecer.',
      '20 seg: pedale o mais rápido que conseguir.',
      '40 seg: pedale bem leve.',
      'Repita. (Se a academia tiver saco de pancada, pode fazer os rounds de chute no lugar.)',
    ],
    cuidadoErroComum: 'Começar forte demais e não aguentar os últimos rounds. Mantenha o mesmo ritmo em todos.',
    paraQueServe: 'Condicionamento parecido com o da luta: esforço forte + recuperação.',
    achouDificil: 'Comece com 4 rounds e aumente 1 por semana.',
  },
];

const TREINOS: Record<TrainingKey, Partial<Record<PlaceKey, TrainingExercise[]>>> = {
  A: {
    dojang: TREINO_A_DOJANG,
    academia: TREINO_A_ACADEMIA,
  },
  B: {
    dojang: TREINO_B_DOJANG,
    academia: TREINO_B_ACADEMIA,
  },
};

export default function TreinosScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [treinoSelecionado, setTreinoSelecionado] = useState<TrainingKey>('A');
  const [localSelecionado, setLocalSelecionado] = useState<PlaceKey>('dojang');
  const [aquecimentoConcluidos, setAquecimentoConcluidos] = useState<Record<number, boolean>>({});
  const [aquecimentoFinalizado, setAquecimentoFinalizado] = useState(false);
  const [aquecimentoExpandido, setAquecimentoExpandido] = useState(true);
  const [infoExercicioId, setInfoExercicioId] = useState<number | null>(null);
  const [treinoConcluidos, setTreinoConcluidos] = useState<Record<string, boolean>>({});
  const [treinoInfoId, setTreinoInfoId] = useState<string | null>(null);
  const [treinoIniciado, setTreinoIniciado] = useState(false);
  const [inicioTreinoEm, setInicioTreinoEm] = useState<number | null>(null);
  const [tempoTreinoSegundos, setTempoTreinoSegundos] = useState(0);

  const totalAquecimentoConcluidos = AQUECIMENTO.filter((item) => aquecimentoConcluidos[item.id]).length;
  const aquecimentoPodeFinalizar = totalAquecimentoConcluidos === AQUECIMENTO.length;
  const exercicioSelecionado = AQUECIMENTO.find((item) => item.id === infoExercicioId) ?? null;

  const chaveTreinoAtual = `${treinoSelecionado}-${localSelecionado}`;
  const treinoAtual = TREINOS[treinoSelecionado][localSelecionado] ?? null;
  const treinoSelecionadoInfo = treinoAtual?.find((item) => item.id === treinoInfoId) ?? null;
  const totalTreinoConcluido = treinoAtual
    ? treinoAtual.filter((item) => treinoConcluidos[item.id]).length
    : 0;
  const treinoPodeFinalizar = Boolean(treinoAtual && totalTreinoConcluido === treinoAtual.length);

  useEffect(() => {
    if (!treinoIniciado || inicioTreinoEm === null) {
      return;
    }

    const intervalId = setInterval(() => {
      setTempoTreinoSegundos(Math.floor((Date.now() - inicioTreinoEm) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [treinoIniciado, inicioTreinoEm]);

  const resetarTelaParaInicio = () => {
    setTreinoSelecionado('A');
    setLocalSelecionado('dojang');
    setAquecimentoConcluidos({});
    setAquecimentoFinalizado(false);
    setAquecimentoExpandido(true);
    setInfoExercicioId(null);
    setTreinoConcluidos({});
    setTreinoInfoId(null);
    setTreinoIniciado(false);
    setInicioTreinoEm(null);
    setTempoTreinoSegundos(0);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const alternarConcluidoAquecimento = (id: number) => {
    if (aquecimentoFinalizado) {
      return;
    }
    setAquecimentoConcluidos((estadoAnterior) => ({
      ...estadoAnterior,
      [id]: !estadoAnterior[id],
    }));
  };

  const concluirTreino = () => {
    if (!aquecimentoPodeFinalizar) {
      return;
    }
    setAquecimentoFinalizado(true);
    setAquecimentoExpandido(false);
  };

  const alternarConcluidoTreino = (id: string) => {
    if (!treinoIniciado) {
      return;
    }
    setTreinoConcluidos((estadoAnterior) => ({
      ...estadoAnterior,
      [id]: !estadoAnterior[id],
    }));
  };

  const iniciarTreinoSelecionado = () => {
    if (!treinoAtual || treinoIniciado) {
      return;
    }

    setTreinoConcluidos({});
    setTreinoInfoId(null);
    setTreinoIniciado(true);
    setInicioTreinoEm(Date.now());
    setTempoTreinoSegundos(0);
  };

  const finalizarTreinoSelecionado = () => {
    if (!treinoPodeFinalizar || !treinoAtual || !treinoIniciado) {
      return;
    }

    const nomeLocal = localSelecionado === 'dojang' ? 'Dojang' : 'Academia';
    const variacao = `Treino ${treinoSelecionado} - ${nomeLocal}`;

    addTrainingRecord({
      variation: variacao,
      durationSeconds: tempoTreinoSegundos,
      date: new Date(),
    });

    Alert.alert(
      'Parabens',
      'Voce concluiu o treino. Continue se esforcando.',
      [
        {
          text: 'OK',
          onPress: resetarTelaParaInicio,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.bgTop} />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>Treinos</Text>
        <Text style={styles.subtitulo}>Treino A/B com versão Dojang e Academia</Text>

        <View style={styles.cardAquecimento}>
          <View style={styles.aquecimentoCabecalhoLinha}>
            <View style={styles.aquecimentoCabecalhoTextos}>
              <Text style={styles.aquecimentoTitulo}>Aquecimento</Text>
              <Text style={styles.aquecimentoSubtitulo}>
                Faça antes de todos os treinos (Treino A e Treino B)
              </Text>
            </View>
            <Pressable
              style={styles.botaoExpandir}
              onPress={() => setAquecimentoExpandido((estadoAnterior) => !estadoAnterior)}
            >
              <Text style={styles.botaoExpandirTexto}>{aquecimentoExpandido ? 'Ocultar' : 'Como começar'}</Text>
            </Pressable>
          </View>

          <Text style={styles.progressoAquecimento}>
            {totalAquecimentoConcluidos}/{AQUECIMENTO.length} exercícios concluídos
          </Text>

          {aquecimentoExpandido && (
            <>
              {AQUECIMENTO.map((item) => {
                const feito = Boolean(aquecimentoConcluidos[item.id]);
                return (
                  <View key={item.id} style={styles.aquecimentoItem}>
                    <View style={styles.aquecimentoTopo}>
                      <Text style={styles.aquecimentoNumero}>{item.id}.</Text>
                      <Text style={styles.aquecimentoExercicio}>{item.exercicio}</Text>
                    </View>

                    <View style={styles.aquecimentoLinhaAcao}>
                      <Text style={styles.aquecimentoQuanto}>{item.quanto}</Text>

                      <View style={styles.aquecimentoBotoesAcao}>
                        <Pressable
                          style={styles.botaoInfo}
                          onPress={() => setInfoExercicioId(item.id)}
                        >
                          <Text style={styles.botaoInfoTexto}>i</Text>
                        </Pressable>

                        <Pressable
                          style={[styles.botaoConcluir, feito && styles.botaoConcluirAtivo]}
                          onPress={() => alternarConcluidoAquecimento(item.id)}
                        >
                          <Text style={[styles.botaoConcluirTexto, feito && styles.botaoConcluirTextoAtivo]}>
                            {feito ? 'Concluído' : 'Concluir'}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              })}

              {aquecimentoPodeFinalizar && !aquecimentoFinalizado && (
                <Pressable style={styles.botaoFinalizarAquecimento} onPress={concluirTreino}>
                  <Text style={styles.botaoFinalizarAquecimentoTexto}>Concluir treino</Text>
                </Pressable>
              )}
            </>
          )}

          {aquecimentoFinalizado && (
            <Text style={styles.aquecimentoFinalizadoTexto}>
              Aquecimento finalizado. Acesso ao Treino A/B liberado.
            </Text>
          )}
        </View>

        <View style={styles.cardAcessoTreino}>
          <Text style={styles.cardAcessoTitulo}>Treinos A e B</Text>

          {!aquecimentoFinalizado && (
            <Text style={styles.cardAcessoBloqueadoTexto}>
              Conclua o aquecimento para liberar o acesso ao Treino A ou B.
            </Text>
          )}

          {aquecimentoFinalizado && (
            <>
              <View style={styles.grupoBotoes}>
                <Text style={styles.rotulo}>Escolha o treino</Text>
                <View style={styles.linhaBotoes}>
                  {(['A', 'B'] as const).map((treino) => (
                    <Pressable
                      key={treino}
                      style={[
                        styles.botaoFiltro,
                        treinoSelecionado === treino && styles.botaoFiltroAtivo,
                      ]}
                      onPress={() => setTreinoSelecionado(treino)}
                    >
                      <Text
                        style={[
                          styles.textoBotaoFiltro,
                          treinoSelecionado === treino && styles.textoBotaoFiltroAtivo,
                        ]}
                      >
                        Treino {treino}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.grupoBotoes}>
                <Text style={styles.rotulo}>Ambiente</Text>
                <View style={styles.linhaBotoes}>
                  {([
                    { key: 'dojang', label: 'Dojang' },
                    { key: 'academia', label: 'Academia' },
                  ] as const).map((item) => (
                    <Pressable
                      key={item.key}
                      style={[
                        styles.botaoFiltro,
                        localSelecionado === item.key && styles.botaoFiltroAtivo,
                      ]}
                      onPress={() => setLocalSelecionado(item.key)}
                    >
                      <Text
                        style={[
                          styles.textoBotaoFiltro,
                          localSelecionado === item.key && styles.textoBotaoFiltroAtivo,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.cardResumoLiberado}>
                <Text style={styles.cardResumoLiberadoTitulo}>Acesso liberado</Text>
                <Text style={styles.cardResumoLiberadoTexto}>
                  Treino {treinoSelecionado} - {localSelecionado === 'dojang' ? 'Dojang' : 'Academia'}
                </Text>
              </View>

              {treinoAtual && (
                <View style={styles.cardTreinoDetalhado}>
                  <Text style={styles.cardTreinoDetalhadoTitulo}>
                    Treino {treinoSelecionado} - {localSelecionado === 'dojang' ? 'Dojang' : 'Academia'}
                  </Text>
                  <Text style={styles.cardTreinoDetalhadoSubtitulo}>
                    Faça os exercícios na ordem da lista e conclua cada bloco.
                  </Text>
                  <Text style={styles.cronometroLabel}>
                    Cronometro: {formatDuration(tempoTreinoSegundos)}
                  </Text>
                  <Text style={styles.cardTreinoDetalhadoProgresso}>
                    {totalTreinoConcluido}/{treinoAtual.length} exercícios concluídos
                  </Text>

                  {!treinoIniciado && (
                    <Pressable style={styles.botaoIniciarTreino} onPress={iniciarTreinoSelecionado}>
                      <Text style={styles.botaoIniciarTreinoTexto}>Iniciar treino selecionado</Text>
                    </Pressable>
                  )}

                  {treinoAtual.map((item, indice) => {
                    const feito = Boolean(treinoConcluidos[item.id]);
                    return (
                      <View key={item.id} style={styles.itemTreino}>
                        <View style={styles.itemTreinoTopo}>
                          <Text style={styles.itemTreinoNumero}>{indice + 1}.</Text>
                          <Text style={styles.itemTreinoNome}>{item.exercicio}</Text>
                        </View>

                        <View style={styles.itemTreinoBadges}>
                          <Text style={styles.itemTreinoBadge}>{item.seriesReps}</Text>
                          <Text style={styles.itemTreinoBadge}>{item.descanso}</Text>
                        </View>

                        <View style={styles.itemTreinoAcoes}>
                          <Pressable style={styles.botaoInfo} onPress={() => setTreinoInfoId(item.id)}>
                            <Text style={styles.botaoInfoTexto}>i</Text>
                          </Pressable>

                          <Pressable
                            style={[styles.botaoConcluir, feito && styles.botaoConcluirAtivo]}
                            onPress={() => alternarConcluidoTreino(item.id)}
                          >
                            <Text style={[styles.botaoConcluirTexto, feito && styles.botaoConcluirTextoAtivo]}>
                              {feito ? 'Concluído' : 'Concluir'}
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    );
                  })}

                  {treinoPodeFinalizar && treinoIniciado && (
                    <Pressable style={styles.botaoFinalizarAquecimento} onPress={finalizarTreinoSelecionado}>
                      <Text style={styles.botaoFinalizarAquecimentoTexto}>Concluir treino selecionado</Text>
                    </Pressable>
                  )}
                </View>
              )}

              {!treinoAtual && (
                <View style={styles.cardTreinoIndisponivel}>
                  <Text style={styles.cardTreinoIndisponivelTitulo}>Treino em preparação</Text>
                  <Text style={styles.cardTreinoIndisponivelTexto}>
                    Esta combinação ainda não foi cadastrada. Adicione os próximos treinos em sequência.
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>

      <Modal visible={infoExercicioId !== null} transparent animationType="fade" onRequestClose={() => setInfoExercicioId(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>{exercicioSelecionado?.exercicio}</Text>
            <Text style={styles.modalSubtitulo}>Quantidade: {exercicioSelecionado?.quanto}</Text>

            <Text style={styles.modalRotulo}>Como fazer</Text>
            <Text style={styles.modalTexto}>{exercicioSelecionado?.comoFazer}</Text>

            <Text style={styles.modalRotulo}>Atenção</Text>
            <Text style={styles.modalTexto}>{exercicioSelecionado?.atencao}</Text>

            <Pressable style={styles.botaoFecharModal} onPress={() => setInfoExercicioId(null)}>
              <Text style={styles.botaoFecharModalTexto}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={treinoInfoId !== null} transparent animationType="fade" onRequestClose={() => setTreinoInfoId(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>{treinoSelecionadoInfo?.exercicio}</Text>
            <Text style={styles.modalSubtitulo}>
              {treinoSelecionadoInfo?.seriesReps} | Descanso: {treinoSelecionadoInfo?.descanso}
            </Text>

            <Text style={styles.modalRotulo}>Como fazer (passo a passo)</Text>
            {treinoSelecionadoInfo?.comoFazer.map((passo, index) => (
              <Text key={`${treinoSelecionadoInfo.id}-passo-${index}`} style={styles.modalTexto}>
                {index + 1}) {passo}
              </Text>
            ))}

            <Text style={styles.modalRotulo}>Cuidado / erro comum</Text>
            <Text style={styles.modalTexto}>{treinoSelecionadoInfo?.cuidadoErroComum}</Text>

            <Text style={styles.modalRotulo}>Pra que serve no taekwondo</Text>
            <Text style={styles.modalTexto}>{treinoSelecionadoInfo?.paraQueServe}</Text>

            <Text style={styles.modalRotulo}>Achou difícil? Faça assim</Text>
            <Text style={styles.modalTexto}>{treinoSelecionadoInfo?.achouDificil}</Text>

            <Pressable style={styles.botaoFecharModal} onPress={() => setTreinoInfoId(null)}>
              <Text style={styles.botaoFecharModalTexto}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#081022',
  },
  bgTop: {
    position: 'absolute',
    top: -140,
    right: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#DC2626',
    opacity: 0.35,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 34,
    gap: 14,
  },
  titulo: {
    color: '#F8FAFC',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  subtitulo: {
    color: '#BFDBFE',
    fontSize: 14,
    marginTop: 4,
  },
  cardAquecimento: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1D4ED8',
    backgroundColor: '#0A1A33',
    padding: 14,
    gap: 8,
  },
  aquecimentoCabecalhoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  aquecimentoCabecalhoTextos: {
    flex: 1,
    gap: 4,
  },
  aquecimentoTitulo: {
    color: '#E0F2FE',
    fontSize: 20,
    fontWeight: '800',
  },
  aquecimentoSubtitulo: {
    color: '#BFDBFE',
    fontSize: 13,
    fontWeight: '700',
  },
  progressoAquecimento: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  botaoExpandir: {
    backgroundColor: '#1E3A8A',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  botaoExpandirTexto: {
    color: '#DBEAFE',
    fontSize: 12,
    fontWeight: '700',
  },
  aquecimentoItem: {
    borderTopWidth: 1,
    borderTopColor: '#1E3A8A',
    paddingTop: 8,
    gap: 4,
  },
  aquecimentoTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aquecimentoNumero: {
    color: '#93C5FD',
    fontWeight: '800',
    fontSize: 13,
  },
  aquecimentoExercicio: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  aquecimentoLinhaAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  aquecimentoQuanto: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '800',
  },
  aquecimentoBotoesAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  botaoInfo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C4A6E',
  },
  botaoInfoTexto: {
    color: '#E0F2FE',
    fontWeight: '800',
    fontSize: 14,
  },
  botaoConcluir: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#0F172A',
  },
  botaoConcluirAtivo: {
    borderColor: '#22C55E',
    backgroundColor: '#14532D',
  },
  botaoConcluirTexto: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
  },
  botaoConcluirTextoAtivo: {
    color: '#DCFCE7',
  },
  botaoFinalizarAquecimento: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#0284C7',
  },
  botaoFinalizarAquecimentoTexto: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
  },
  aquecimentoFinalizadoTexto: {
    marginTop: 8,
    color: '#BBF7D0',
    fontSize: 12,
    fontWeight: '700',
  },
  cardAcessoTreino: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#111827',
    padding: 14,
    gap: 10,
  },
  cardAcessoTitulo: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '800',
  },
  cardAcessoBloqueadoTexto: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
  cardResumoLiberado: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#166534',
    backgroundColor: '#052E1A',
    padding: 12,
    marginTop: 4,
  },
  cardResumoLiberadoTitulo: {
    color: '#BBF7D0',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardResumoLiberadoTexto: {
    color: '#DCFCE7',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
  },
  cardTreinoDetalhado: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#0B1220',
    padding: 12,
    gap: 8,
  },
  cardTreinoDetalhadoTitulo: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
  },
  cardTreinoDetalhadoSubtitulo: {
    color: '#BFDBFE',
    fontSize: 12,
  },
  cronometroLabel: {
    color: '#FCD34D',
    fontSize: 13,
    fontWeight: '700',
  },
  cardTreinoDetalhadoProgresso: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
  },
  botaoIniciarTreino: {
    marginTop: 4,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#0E7490',
  },
  botaoIniciarTreinoTexto: {
    color: '#F0FDFF',
    fontSize: 14,
    fontWeight: '800',
  },
  itemTreino: {
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 8,
    gap: 6,
  },
  itemTreinoTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemTreinoNumero: {
    color: '#93C5FD',
    fontWeight: '800',
    fontSize: 13,
  },
  itemTreinoNome: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  itemTreinoBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  itemTreinoBadge: {
    backgroundColor: '#1E293B',
    color: '#DBEAFE',
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: '700',
  },
  itemTreinoAcoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  cardTreinoIndisponivel: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0F172A',
    padding: 12,
    gap: 6,
  },
  cardTreinoIndisponivelTitulo: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
  },
  cardTreinoIndisponivelTexto: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 19,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.75)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#0F172A',
    padding: 16,
    gap: 8,
  },
  modalTitulo: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  modalSubtitulo: {
    color: '#93C5FD',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalRotulo: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalTexto: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 20,
  },
  botaoFecharModal: {
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 11,
    backgroundColor: '#1E293B',
  },
  botaoFecharModalTexto: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
  },
  grupoBotoes: {
    marginTop: 4,
  },
  rotulo: {
    color: '#C7D2FE',
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  linhaBotoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoFiltro: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },
  botaoFiltroAtivo: {
    borderColor: '#38BDF8',
    backgroundColor: '#0C4A6E',
  },
  textoBotaoFiltro: {
    color: '#93C5FD',
    fontWeight: '700',
    fontSize: 15,
  },
  textoBotaoFiltroAtivo: {
    color: '#E0F2FE',
  },
});
