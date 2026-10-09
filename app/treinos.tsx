import { useMemo, useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type TrainingKey = 'A' | 'B';
type PlaceKey = 'dojang' | 'academia';

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

export default function TreinosScreen() {
  const [treinoSelecionado, setTreinoSelecionado] = useState<TrainingKey>('A');
  const [localSelecionado, setLocalSelecionado] = useState<PlaceKey>('dojang');
  const [aquecimentoConcluidos, setAquecimentoConcluidos] = useState<Record<number, boolean>>({});
  const [aquecimentoFinalizado, setAquecimentoFinalizado] = useState(false);
  const [aquecimentoExpandido, setAquecimentoExpandido] = useState(true);
  const [infoExercicioId, setInfoExercicioId] = useState<number | null>(null);

  const totalAquecimentoConcluidos = AQUECIMENTO.filter((item) => aquecimentoConcluidos[item.id]).length;
  const aquecimentoPodeFinalizar = totalAquecimentoConcluidos === AQUECIMENTO.length;
  const exercicioSelecionado = AQUECIMENTO.find((item) => item.id === infoExercicioId) ?? null;

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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.bgTop} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
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

          <Text style={styles.aquecimentoAviso}>
            Importante: este bloco deve ser feito antes de qualquer treino.
          </Text>
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
