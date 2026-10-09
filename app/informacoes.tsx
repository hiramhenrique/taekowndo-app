import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function InformacoesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Informacoes</Text>
        <Text style={styles.subtitulo}>Seu plano de taekwondo em 2 treinos por semana.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Estrutura semanal</Text>
          <Text style={styles.cardTexto}>• Treino A</Text>
          <Text style={styles.cardTexto}>• Treino B</Text>
          <Text style={styles.cardTexto}>• Cada treino com versao Dojang e Academia</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Como usar</Text>
          <Text style={styles.cardTexto}>1. Abra a aba Treinos.</Text>
          <Text style={styles.cardTexto}>2. Escolha A ou B e o ambiente.</Text>
          <Text style={styles.cardTexto}>3. Marque os blocos como concluidos.</Text>
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
    gap: 8,
  },
  cardTitulo: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '700',
  },
  cardTexto: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 20,
  },
});