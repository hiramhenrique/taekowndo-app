import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const termos = [
  { coreano: 'Charyeot', pt: 'Atenção' },
  { coreano: 'Kyong-rye', pt: 'Cumprimentar' },
  { coreano: 'Joon-bi', pt: 'Preparar' },
  { coreano: 'Sijak', pt: 'Começar' },
  { coreano: 'Baro', pt: 'Voltar' },
  { coreano: 'Keuman', pt: 'Parar' },
];

export default function VocabularioScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Vocabulario</Text>
        <Text style={styles.subtitulo}>Comandos comuns no dojang.</Text>

        <View style={styles.card}>
          {termos.map((item) => (
            <View key={item.coreano} style={styles.linha}>
              <Text style={styles.coreano}>{item.coreano}</Text>
              <Text style={styles.portugues}>{item.pt}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#081022',
  },
  container: {
    flex: 1,
    padding: 18,
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
    gap: 10,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  coreano: {
    color: '#E2E8F0',
    fontSize: 15,
    fontWeight: '700',
  },
  portugues: {
    color: '#93C5FD',
    fontSize: 14,
  },
});
