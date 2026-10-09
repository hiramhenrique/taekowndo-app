import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type TrainingKey = 'A' | 'B';
type PlaceKey = 'dojang' | 'academia';

type TrainingBlock = {
  id: string;
  titulo: string;
  duracao: string;
  detalhes: string;
};

type TrainingPlan = Record<TrainingKey, Record<PlaceKey, TrainingBlock[]>>;

const PLANOS: TrainingPlan = {
  A: {
    dojang: [
      {
        id: 'a-dojang-1',
        titulo: 'Aquecimento e mobilidade',
        duracao: '12 min',
        detalhes: 'Pular corda, mobilidade de quadril e tornozelo, ativacao de core.',
      },
      {
        id: 'a-dojang-2',
        titulo: 'Tecnica de base',
        duracao: '20 min',
        detalhes: 'Ap chagui, dollyo chagui e combinacoes em deslocamento.',
      },
      {
        id: 'a-dojang-3',
        titulo: 'Poomsae',
        duracao: '15 min',
        detalhes: 'Repeticoes do poomsae do seu nivel com foco em ritmo e postura.',
      },
      {
        id: 'a-dojang-4',
        titulo: 'Sparring tecnico',
        duracao: '18 min',
        detalhes: 'Rounds leves com foco em distancia, tempo e contra-ataque.',
      },
      {
        id: 'a-dojang-5',
        titulo: 'Alongamento final',
        duracao: '10 min',
        detalhes: 'Cadeia posterior, adutores e respiracao para recuperar.',
      },
    ],
    academia: [
      {
        id: 'a-academia-1',
        titulo: 'Aquecimento cardiovascular',
        duracao: '10 min',
        detalhes: 'Esteira ou bike em intensidade moderada.',
      },
      {
        id: 'a-academia-2',
        titulo: 'Forca de pernas',
        duracao: '22 min',
        detalhes: 'Agachamento, afundo e extensora com tecnica controlada.',
      },
      {
        id: 'a-academia-3',
        titulo: 'Core e estabilidade',
        duracao: '15 min',
        detalhes: 'Prancha, dead bug e rotacoes de tronco com carga leve.',
      },
      {
        id: 'a-academia-4',
        titulo: 'Finalizacao de chute no saco',
        duracao: '15 min',
        detalhes: 'Series curtas de potencia com pausa curta.',
      },
      {
        id: 'a-academia-5',
        titulo: 'Desaceleracao',
        duracao: '8 min',
        detalhes: 'Caminhada leve e alongamentos.',
      },
    ],
  },
  B: {
    dojang: [
      {
        id: 'b-dojang-1',
        titulo: 'Aquecimento dinamico',
        duracao: '12 min',
        detalhes: 'Skipping, deslocamentos laterais e mobilidade geral.',
      },
      {
        id: 'b-dojang-2',
        titulo: 'Tecnica avancada de chutes',
        duracao: '22 min',
        detalhes: 'Bandal, yop e giro com foco em alinhamento e retorno rapido.',
      },
      {
        id: 'b-dojang-3',
        titulo: 'Manoplas e alvo',
        duracao: '18 min',
        detalhes: 'Combinacoes curtas em velocidade com precisao.',
      },
      {
        id: 'b-dojang-4',
        titulo: 'Combate por situacao',
        duracao: '18 min',
        detalhes: 'Entrada, saida e resposta em rounds dirigidos.',
      },
      {
        id: 'b-dojang-5',
        titulo: 'Respiracao e flexibilidade',
        duracao: '10 min',
        detalhes: 'Alongamento ativo e respiracao diafragmatica.',
      },
    ],
    academia: [
      {
        id: 'b-academia-1',
        titulo: 'Aquecimento intervalado',
        duracao: '10 min',
        detalhes: 'Bike com blocos de 30s forte e 30s leve.',
      },
      {
        id: 'b-academia-2',
        titulo: 'Forca explosiva',
        duracao: '20 min',
        detalhes: 'Levantamento terra leve, salto no caixote e swing.',
      },
      {
        id: 'b-academia-3',
        titulo: 'Membros superiores',
        duracao: '15 min',
        detalhes: 'Remada, desenvolvimento e puxada para estabilidade.',
      },
      {
        id: 'b-academia-4',
        titulo: 'Condicionamento',
        duracao: '12 min',
        detalhes: 'Circuito funcional com pouco descanso.',
      },
      {
        id: 'b-academia-5',
        titulo: 'Alongamento final',
        duracao: '8 min',
        detalhes: 'Foco em quadril, posterior e lombar.',
      },
    ],
  },
};

export default function App() {
  const [treinoSelecionado, setTreinoSelecionado] = useState<TrainingKey>('A');
  const [localSelecionado, setLocalSelecionado] = useState<PlaceKey>('dojang');
  const [concluidos, setConcluidos] = useState<Record<string, boolean>>({});

  const treinoAtual = useMemo(
    () => PLANOS[treinoSelecionado][localSelecionado],
    [treinoSelecionado, localSelecionado]
  );

  const totalConcluidos = treinoAtual.filter((item) => concluidos[item.id]).length;

  const alternarConcluido = (id: string) => {
    setConcluidos((estadoAnterior) => ({
      ...estadoAnterior,
      [id]: !estadoAnterior[id],
    }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.bgTop} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>Taekwondo Treinos</Text>
        <Text style={styles.subtitulo}>Planejamento semanal com treino A e treino B</Text>

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

        <View style={styles.cardResumo}>
          <Text style={styles.resumoTitulo}>Progresso do treino atual</Text>
          <Text style={styles.resumoTexto}>
            {totalConcluidos} de {treinoAtual.length} blocos concluido(s)
          </Text>
        </View>

        {treinoAtual.map((bloco, indice) => {
          const feito = Boolean(concluidos[bloco.id]);
          return (
            <Pressable
              key={bloco.id}
              style={[styles.cardTreino, feito && styles.cardTreinoConcluido]}
              onPress={() => alternarConcluido(bloco.id)}
            >
              <View style={styles.cardTopo}>
                <Text style={styles.numeroBloco}>Bloco {indice + 1}</Text>
                <View style={[styles.selo, feito && styles.seloConcluido]}>
                  <Text style={styles.seloTexto}>{feito ? 'Concluido' : bloco.duracao}</Text>
                </View>
              </View>
              <Text style={styles.cardTitulo}>{bloco.titulo}</Text>
              <Text style={styles.cardDetalhes}>{bloco.detalhes}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
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
  grupoBotoes: {
    marginTop: 8,
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
  cardResumo: {
    marginTop: 4,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#0B1220',
  },
  resumoTitulo: {
    color: '#E2E8F0',
    fontWeight: '700',
    fontSize: 14,
  },
  resumoTexto: {
    color: '#38BDF8',
    marginTop: 6,
    fontSize: 16,
    fontWeight: '700',
  },
  cardTreino: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#111827',
    padding: 14,
  },
  cardTreinoConcluido: {
    borderColor: '#22C55E',
    backgroundColor: '#052E1A',
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  numeroBloco: {
    color: '#A5B4FC',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  selo: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  seloConcluido: {
    backgroundColor: '#166534',
  },
  seloTexto: {
    color: '#DBEAFE',
    fontSize: 12,
    fontWeight: '700',
  },
  cardTitulo: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  cardDetalhes: {
    color: '#CBD5E1',
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
});
