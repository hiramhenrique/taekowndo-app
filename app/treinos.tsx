import { useMemo, useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type TrainingKey = 'A' | 'B';
type PlaceKey = 'dojang' | 'academia';

type TrainingBlock = {
  id: string;
  titulo: string;
  duracao: string;
  detalhes: string;
};

type TrainingPlan = Record<TrainingKey, Record<PlaceKey, TrainingBlock[]>>;

type WarmupItem = {
  id: number;
  exercicio: string;
  quanto: string;
  comoFazer: string;
  atencao: string;
};

const AQUECIMENTO: WarmupItem[] = [
  {
    id: 1,
    exercicio: 'Polichinelo',
    quanto: '1 minuto',
    comoFazer: 'Abra e feche pernas e bracos no mesmo ritmo. Aterrise leve na ponta dos pes.',
    atencao: 'Evite bater o calcanhar no chao.',
  },
  {
    id: 2,
    exercicio: 'Corrida no lugar com joelho alto',
    quanto: '2 x 30 seg',
    comoFazer: 'Corra parado elevando os joelhos ate a altura do quadril, com tronco reto.',
    atencao: 'Nao jogue o corpo para tras durante a corrida.',
  },
  {
    id: 3,
    exercicio: 'Abrir e fechar o portao',
    quanto: '8 cada perna',
    comoFazer: 'Suba o joelho a frente, abra para o lado e depois feche no caminho contrario.',
    atencao: 'Se precisar, segure em uma parede para manter o equilibrio.',
  },
  {
    id: 4,
    exercicio: 'Agachamento lento',
    quanto: '10 reps',
    comoFazer: 'Desca controlado em 3 segundos e suba mantendo joelhos alinhados aos pes.',
    atencao: 'Mantenha os calcanhares no chao e os joelhos na linha dos pes.',
  },
  {
    id: 5,
    exercicio: 'Afundo com giro de tronco',
    quanto: '6 cada lado',
    comoFazer: 'Faca um passo a frente, desca e gire o tronco para o lado da perna da frente.',
    atencao: 'O joelho da frente nao deve ultrapassar muito a ponta do pe.',
  },
  {
    id: 6,
    exercicio: 'Balanco de perna (frente e lado)',
    quanto: '10 cada direcao',
    comoFazer: 'Apoie na parede e balance a perna para frente/tras e depois para o lado.',
    atencao: 'Comece com amplitude pequena e aumente aos poucos.',
  },
  {
    id: 7,
    exercicio: 'Saltitos na base de luta',
    quanto: '30 seg',
    comoFazer: 'Fique na base e quique leve na ponta dos pes com joelhos levemente dobrados.',
    atencao: 'Movimento leve e solto, sem rigidez.',
  },
  {
    id: 8,
    exercicio: 'Chutes leves',
    quanto: '10 cada perna',
    comoFazer: 'Aplique ap tchagui e bandal tchagui com 50% de forca e altura media.',
    atencao: 'E aquecimento: sem forca maxima e sem buscar altura maxima.',
  },
];

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

export default function TreinosScreen() {
  const [treinoSelecionado, setTreinoSelecionado] = useState<TrainingKey>('A');
  const [localSelecionado, setLocalSelecionado] = useState<PlaceKey>('dojang');
  const [concluidos, setConcluidos] = useState<Record<string, boolean>>({});
  const [aquecimentoConcluidos, setAquecimentoConcluidos] = useState<Record<number, boolean>>({});
  const [aquecimentoFinalizado, setAquecimentoFinalizado] = useState(false);
  const [aquecimentoExpandido, setAquecimentoExpandido] = useState(true);
  const [infoExercicioId, setInfoExercicioId] = useState<number | null>(null);

  const treinoAtual = useMemo(
    () => PLANOS[treinoSelecionado][localSelecionado],
    [treinoSelecionado, localSelecionado]
  );

  const totalConcluidos = treinoAtual.filter((item) => concluidos[item.id]).length;
  const totalAquecimentoConcluidos = AQUECIMENTO.filter((item) => aquecimentoConcluidos[item.id]).length;
  const aquecimentoPodeFinalizar = totalAquecimentoConcluidos === AQUECIMENTO.length;
  const exercicioSelecionado = AQUECIMENTO.find((item) => item.id === infoExercicioId) ?? null;

  const alternarConcluido = (id: string) => {
    setConcluidos((estadoAnterior) => ({
      ...estadoAnterior,
      [id]: !estadoAnterior[id],
    }));
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

  const concluirAquecimento = () => {
    if (!aquecimentoPodeFinalizar) {
      return;
    }
    setAquecimentoFinalizado(true);
    setAquecimentoExpandido(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.bgTop} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>Treinos</Text>
        <Text style={styles.subtitulo}>Treino A/B com versao Dojang e Academia</Text>

        <View style={styles.cardAquecimento}>
          <View style={styles.aquecimentoCabecalhoLinha}>
            <View style={styles.aquecimentoCabecalhoTextos}>
              <Text style={styles.aquecimentoTitulo}>Aquecimento</Text>
              <Text style={styles.aquecimentoSubtitulo}>
                Faca antes de todos os treinos (Treino A e Treino B)
              </Text>
            </View>
            <Pressable
              style={styles.botaoExpandir}
              onPress={() => setAquecimentoExpandido((estadoAnterior) => !estadoAnterior)}
            >
              <Text style={styles.botaoExpandirTexto}>{aquecimentoExpandido ? 'Ocultar' : 'Abrir'}</Text>
            </Pressable>
          </View>

          <Text style={styles.aquecimentoAviso}>
            Importante: este bloco deve ser feito antes de qualquer treino.
          </Text>
          <Text style={styles.progressoAquecimento}>
            {totalAquecimentoConcluidos}/{AQUECIMENTO.length} exercicios concluidos
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
                            {feito ? 'Concluido' : 'Concluir'}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              })}

              {aquecimentoPodeFinalizar && !aquecimentoFinalizado && (
                <Pressable style={styles.botaoFinalizarAquecimento} onPress={concluirAquecimento}>
                  <Text style={styles.botaoFinalizarAquecimentoTexto}>Concluir aquecimento</Text>
                </Pressable>
              )}
            </>
          )}

          {aquecimentoFinalizado && (
            <Text style={styles.aquecimentoFinalizadoTexto}>
              Aquecimento finalizado. Card recolhido para seguir no treino.
            </Text>
          )}
        </View>

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

      <Modal visible={infoExercicioId !== null} transparent animationType="fade" onRequestClose={() => setInfoExercicioId(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>{exercicioSelecionado?.exercicio}</Text>
            <Text style={styles.modalSubtitulo}>Quantidade: {exercicioSelecionado?.quanto}</Text>

            <Text style={styles.modalRotulo}>Como fazer</Text>
            <Text style={styles.modalTexto}>{exercicioSelecionado?.comoFazer}</Text>

            <Text style={styles.modalRotulo}>Atencao</Text>
            <Text style={styles.modalTexto}>{exercicioSelecionado?.atencao}</Text>

            <Pressable style={styles.botaoFecharModal} onPress={() => setInfoExercicioId(null)}>
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
  aquecimentoAviso: {
    color: '#FDE68A',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
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
