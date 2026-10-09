import { useSyncExternalStore } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getTrainingRecordsSnapshot, subscribeTrainingRecords } from '../state/trainingRecordsStore';

const PROGRESSAO_SEMANAL = [
  {
    semana: '1 e 2',
    fase: 'Adaptação',
    series: 'Faça só 2 séries de cada exercício.',
    esforco: '5-6 (moderado)',
    oQueFazer: 'Aprender os movimentos. Sem pressa, foco total em técnica. Rounds finais: 4-5.',
  },
  {
    semana: '3 e 4',
    fase: 'Construção',
    series: '3 séries (como está nas abas).',
    esforco: '6-7',
    oQueFazer: 'Academia: se ficou fácil, aumente um pouco o peso. Dojang: +2 reps ou +5 seg. Rounds finais: 6.',
  },
  {
    semana: '5 e 6',
    fase: 'Evolução',
    series: '3 séries.',
    esforco: '7-8 (forte)',
    oQueFazer: 'Aumente peso/reps de novo se a técnica estiver boa. Rounds finais: 7.',
  },
  {
    semana: '7',
    fase: 'Pico',
    series: '3 séries.',
    esforco: '7-8',
    oQueFazer: 'Semana mais puxada. Rounds finais: 8.',
  },
  {
    semana: '8',
    fase: 'Semana leve',
    series: 'Volte para 2 séries.',
    esforco: '5 (moderado)',
    oQueFazer: 'Recuperar o corpo. Depois desta semana, fale com o professor para montar a próxima fase.',
  },
];

export default function ProgressaoScreen() {
  const registros = useSyncExternalStore(subscribeTrainingRecords, getTrainingRecordsSnapshot);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Progressão</Text>
        <Text style={styles.subtitulo}>Os registros aparecem automaticamente ao concluir treino selecionado na aba Treinos.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Treinos concluídos</Text>

          <View style={styles.tabelaHeader}>
            <Text style={[styles.colunaHeader, styles.colVariacao]}>Variação</Text>
            <Text style={[styles.colunaHeader, styles.colTempo]}>Tempo</Text>
            <Text style={[styles.colunaHeader, styles.colData]}>Data</Text>
          </View>

          {registros.length === 0 && (
            <Text style={styles.semRegistros}>Nenhum treino registrado ainda.</Text>
          )}

          {registros.map((registro) => (
            <View key={registro.id} style={styles.tabelaLinha}>
              <Text style={[styles.colunaValor, styles.colVariacao]}>{registro.variation}</Text>
              <Text style={[styles.colunaValor, styles.colTempo]}>{registro.durationLabel}</Text>
              <Text style={[styles.colunaValor, styles.colData]}>{registro.dateLabel}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Progressão - o que muda a cada semana</Text>
          <Text style={styles.cardHint}>Use sempre as séries e repetições das abas de treino, ajustando pelo que está nesta tabela.</Text>

          {PROGRESSAO_SEMANAL.map((item) => (
            <View key={item.semana} style={styles.progressaoCardItem}>
              <View style={styles.progressaoCardHeader}>
                <Text style={styles.progressaoSemana}>Semana {item.semana}</Text>
                <Text style={styles.progressaoFase}>{item.fase}</Text>
              </View>

              <Text style={styles.progressaoLinhaTexto}>
                <Text style={styles.progressaoRotulo}>Séries: </Text>
                {item.series}
              </Text>
              <Text style={styles.progressaoLinhaTexto}>
                <Text style={styles.progressaoRotulo}>Esforço: </Text>
                {item.esforco}
              </Text>
              <Text style={styles.progressaoLinhaTexto}>
                <Text style={styles.progressaoRotulo}>O que fazer: </Text>
                {item.oQueFazer}
              </Text>
            </View>
          ))}

          <Text style={styles.regraOuro}>
            Regra de ouro: só aumente peso ou repetições quando conseguir fazer TODAS as séries com boa técnica e esforço dentro da nota da semana.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#081022',
  },
  container: {
    padding: 18,
    paddingBottom: 28,
    gap: 14,
  },
  titulo: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#BFDBFE',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#111827',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  cardTitulo: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '700',
  },
  cardHint: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 4,
  },
  tabelaHeader: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 10,
    marginTop: 4,
  },
  tabelaLinha: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 10,
    paddingBottom: 6,
  },
  semRegistros: {
    color: '#94A3B8',
    fontSize: 14,
    paddingTop: 8,
  },
  colunaHeader: {
    color: '#93C5FD',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  colunaValor: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 21,
  },
  colVariacao: {
    flex: 1.8,
    paddingRight: 10,
  },
  colTempo: {
    flex: 1,
    paddingRight: 10,
  },
  colData: {
    flex: 1,
  },
  progressaoCardItem: {
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 10,
    paddingBottom: 10,
    gap: 6,
  },
  progressaoCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  progressaoSemana: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '800',
  },
  progressaoFase: {
    color: '#7DD3FC',
    fontSize: 13,
    fontWeight: '700',
  },
  progressaoLinhaTexto: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 21,
  },
  progressaoRotulo: {
    color: '#93C5FD',
    fontWeight: '800',
  },
  regraOuro: {
    marginTop: 10,
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },
});
