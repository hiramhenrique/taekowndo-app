import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const termos = [
  { coreano: 'Charyeot', pt: 'Atenção' },
  { coreano: 'Kyong-rye', pt: 'Cumprimentar' },
  { coreano: 'Joon-bi', pt: 'Preparar' },
  { coreano: 'Sijak', pt: 'Começar' },
  { coreano: 'Baro', pt: 'Voltar' },
  { coreano: 'Keuman', pt: 'Parar' },
];

export default function VocabularioScreen() {
  const [busca, setBusca] = useState('');

  const termosFiltrados = termos.filter((item) => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return true;
    }

    return item.coreano.toLowerCase().includes(termo) || item.pt.toLowerCase().includes(termo);
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Vocabulario</Text>
        <Text style={styles.subtitulo}>Comandos e termos comuns no dojang.</Text>

        <View style={styles.banner}>
          <Text style={styles.bannerTopo}>Tradução de Taekwondo</Text>
          <Text style={styles.bannerTitulo}>Caminho dos pés e das mãos</Text>
          <Text style={styles.bannerTexto}>
            Tae = pé • Kwon = mão • Do = caminho
          </Text>
        </View>

        <View style={styles.buscaBox}>
          <Text style={styles.buscaIcone}>🔎</Text>
          <TextInput
            value={busca}
            onChangeText={setBusca}
            placeholder="Pesquisar termo ou tradução"
            placeholderTextColor="#64748B"
            style={styles.buscaInput}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Vocabulário básico</Text>

          {termosFiltrados.map((item) => (
            <View key={item.coreano} style={styles.linha}>
              <View style={styles.textosLinha}>
                <Text style={styles.coreano}>{item.coreano}</Text>
                <Text style={styles.portugues}>{item.pt}</Text>
              </View>
            </View>
          ))}

          {termosFiltrados.length === 0 && (
            <Text style={styles.semResultados}>Nenhum termo encontrado para essa pesquisa.</Text>
          )}
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
  banner: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#0EA5E9',
    backgroundColor: '#0A1A33',
    padding: 16,
    gap: 6,
  },
  bannerTopo: {
    color: '#7DD3FC',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bannerTitulo: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
  },
  bannerTexto: {
    color: '#BAE6FD',
    fontSize: 14,
    lineHeight: 20,
  },
  buscaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
  },
  buscaIcone: {
    fontSize: 18,
  },
  buscaInput: {
    flex: 1,
    color: '#E2E8F0',
    fontSize: 15,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#111827',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  cardTitulo: {
    color: '#E2E8F0',
    fontSize: 17,
    fontWeight: '800',
  },
  linha: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  textosLinha: {
    gap: 4,
  },
  coreano: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '800',
  },
  portugues: {
    color: '#93C5FD',
    fontSize: 14,
    lineHeight: 20,
  },
  semResultados: {
    color: '#94A3B8',
    fontSize: 14,
    paddingTop: 4,
  },
});
