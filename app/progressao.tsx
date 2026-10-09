import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const marcos = [
  'Consistencia: 4 semanas sem falhar',
  'Tecnica: melhorar equilibrio em chutes de giro',
  'Condicionamento: reduzir pausa entre rounds',
  'Controle: manter guarda ativa no sparring',
];

export default function ProgressaoScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Progressao</Text>
        <Text style={styles.subtitulo}>Acompanhe sua evolucao por etapas.</Text>

        <View style={styles.card}>
          {marcos.map((item, idx) => (
            <Text key={item} style={styles.item}>
              {idx + 1}. {item}
            </Text>
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
  item: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 20,
  },
});
