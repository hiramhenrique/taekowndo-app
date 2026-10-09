import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const poomsaes = ['Taegeuk Il Jang', 'Taegeuk Yi Jang', 'Taegeuk Sam Jang', 'Taegeuk Sa Jang'];

export default function PonseaScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Ponsea</Text>
        <Text style={styles.subtitulo}>Sequencia de estudo tecnico por repeticao.</Text>

        <View style={styles.card}>
          {poomsaes.map((nome, idx) => (
            <Text key={nome} style={styles.item}>
              {idx + 1}. {nome}
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
