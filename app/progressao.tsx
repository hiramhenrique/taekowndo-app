import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type RegistroTreino = {
  id: string;
  variacao: string;
  tempo: string;
  data: string;
};

const VARIACOES = ['A - Dojang', 'A - Academia', 'B - Dojang', 'B - Academia'] as const;

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

function hojeFormatoBrasileiro() {
  const hoje = new Date();
  const dia = `${hoje.getDate()}`.padStart(2, '0');
  const mes = `${hoje.getMonth() + 1}`.padStart(2, '0');
  return `${dia}/${mes}/${hoje.getFullYear()}`;
}

export default function ProgressaoScreen() {
  const [variacaoSelecionada, setVariacaoSelecionada] = useState<(typeof VARIACOES)[number]>('A - Dojang');
  const [tempoGasto, setTempoGasto] = useState('40 min');
  const [dataRealizada, setDataRealizada] = useState(hojeFormatoBrasileiro());
  const [registros, setRegistros] = useState<RegistroTreino[]>([]);

  const adicionarRegistro = () => {
    if (!tempoGasto.trim() || !dataRealizada.trim()) {
      return;
    }

    const novoRegistro: RegistroTreino = {
      id: `${Date.now()}`,
      variacao: variacaoSelecionada,
      tempo: tempoGasto.trim(),
      data: dataRealizada.trim(),
    };

    setRegistros((estadoAnterior) => [novoRegistro, ...estadoAnterior]);
    setTempoGasto('40 min');
    setDataRealizada(hojeFormatoBrasileiro());
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Progressão</Text>
        <Text style={styles.subtitulo}>Registre seus treinos concluídos e acompanhe sua evolução semanal.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Novo registro de treino</Text>

          <Text style={styles.rotulo}>Variação</Text>
          <View style={styles.linhaBotoes}>
            {VARIACOES.map((variacao) => {
              const ativo = variacaoSelecionada === variacao;
              return (
                <Pressable
                  key={variacao}
                  style={[styles.botaoFiltro, ativo && styles.botaoFiltroAtivo]}
                  onPress={() => setVariacaoSelecionada(variacao)}
                >
                  <Text style={[styles.textoBotaoFiltro, ativo && styles.textoBotaoFiltroAtivo]}>{variacao}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.campo}>
            <Text style={styles.rotulo}>Tempo gasto</Text>
            <TextInput
              style={styles.input}
              value={tempoGasto}
              onChangeText={setTempoGasto}
              placeholder="Ex.: 45 min"
              placeholderTextColor="#64748B"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.rotulo}>Data realizada</Text>
            <TextInput
              style={styles.input}
              value={dataRealizada}
              onChangeText={setDataRealizada}
              placeholder="dd/mm/aaaa"
              placeholderTextColor="#64748B"
            />
          </View>

          <Pressable style={styles.botaoSalvar} onPress={adicionarRegistro}>
            <Text style={styles.botaoSalvarTexto}>Salvar registro</Text>
          </Pressable>
        </View>

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
              <Text style={[styles.colunaValor, styles.colVariacao]}>{registro.variacao}</Text>
              <Text style={[styles.colunaValor, styles.colTempo]}>{registro.tempo}</Text>
              <Text style={[styles.colunaValor, styles.colData]}>{registro.data}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Progressão - o que muda a cada semana</Text>
          <Text style={styles.cardHint}>Use sempre as séries e repetições das abas de treino, ajustando pelo que está nesta tabela.</Text>

          <View style={styles.progressaoHeader}>
            <Text style={[styles.colunaHeader, styles.colSemana]}>Semana</Text>
            <Text style={[styles.colunaHeader, styles.colFase]}>Fase</Text>
            <Text style={[styles.colunaHeader, styles.colSeries]}>Séries</Text>
            <Text style={[styles.colunaHeader, styles.colEsforco]}>Esforço</Text>
            <Text style={[styles.colunaHeader, styles.colOQueFazer]}>O que fazer</Text>
          </View>

          {PROGRESSAO_SEMANAL.map((item) => (
            <View key={item.semana} style={styles.progressaoLinha}>
              <Text style={[styles.colunaValor, styles.colSemana]}>{item.semana}</Text>
              <Text style={[styles.colunaValor, styles.colFase]}>{item.fase}</Text>
              <Text style={[styles.colunaValor, styles.colSeries]}>{item.series}</Text>
              <Text style={[styles.colunaValor, styles.colEsforco]}>{item.esforco}</Text>
              <Text style={[styles.colunaValor, styles.colOQueFazer]}>{item.oQueFazer}</Text>
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
    fontSize: 16,
    fontWeight: '700',
  },
  cardHint: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 2,
  },
  rotulo: {
    color: '#C7D2FE',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  linhaBotoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  botaoFiltro: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#0F172A',
  },
  botaoFiltroAtivo: {
    borderColor: '#38BDF8',
    backgroundColor: '#0C4A6E',
  },
  textoBotaoFiltro: {
    color: '#93C5FD',
    fontWeight: '700',
    fontSize: 12,
  },
  textoBotaoFiltroAtivo: {
    color: '#E0F2FE',
  },
  campo: {
    gap: 6,
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#E2E8F0',
    backgroundColor: '#0F172A',
    fontSize: 14,
  },
  botaoSalvar: {
    marginTop: 6,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#0284C7',
  },
  botaoSalvarTexto: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
  },
  tabelaHeader: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 8,
    marginTop: 2,
  },
  tabelaLinha: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 8,
    paddingBottom: 2,
  },
  semRegistros: {
    color: '#94A3B8',
    fontSize: 13,
    paddingTop: 8,
  },
  colunaHeader: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  colunaValor: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 17,
  },
  colVariacao: {
    flex: 1.6,
    paddingRight: 8,
  },
  colTempo: {
    flex: 0.8,
    paddingRight: 8,
  },
  colData: {
    flex: 1,
  },
  progressaoHeader: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 8,
    marginTop: 2,
  },
  progressaoLinha: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 8,
    paddingBottom: 2,
  },
  colSemana: {
    flex: 0.85,
    paddingRight: 6,
  },
  colFase: {
    flex: 1.2,
    paddingRight: 6,
  },
  colSeries: {
    flex: 2,
    paddingRight: 6,
  },
  colEsforco: {
    flex: 1.2,
    paddingRight: 6,
  },
  colOQueFazer: {
    flex: 3,
  },
  regraOuro: {
    marginTop: 10,
    color: '#FCA5A5',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },
});
