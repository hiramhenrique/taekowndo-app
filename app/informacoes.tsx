import { ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const comoFunciona = [
  {
    titulo: 'Frequência',
    texto: '2 treinos por semana: Treino A e Treino B. Deixe 1 dia de folga entre eles.',
  },
  {
    titulo: 'Onde treinar',
    texto: 'Cada treino tem 2 versões: Dojang (peso do corpo) e Academia (halteres/máquinas).',
  },
  {
    titulo: 'Ordem do dia',
    texto: 'Aquecimento -> Treino A ou B -> Alongamento leve no final.',
  },
  {
    titulo: 'Duração',
    texto: 'Programa de 8 semanas com evolução gradual.',
  },
];

const palavras = [
  'Série: bloco de repetições.',
  'Repetição (rep): movimento completo.',
  'Descanso: pausa entre séries para manter a qualidade.',
  'Cada lado/perna: faça um lado e depois o outro.',
  'Core: abdômen, lombar e quadril.',
  'Explosão/Pliometria: saltos rápidos para potência.',
];

const escala = [
  { zona: '0-4', nivel: 'Leve', dica: 'Dá para conversar tranquilo.' },
  { zona: '5-6', nivel: 'Moderado', dica: 'Cansou, mas ainda sobrariam 4-5 reps.' },
  { zona: '7-8', nivel: 'Forte', dica: 'Sobram 2-3 reps com boa técnica.' },
  { zona: '9-10', nivel: 'Máximo', dica: 'Evite chegar aqui neste programa.' },
];

const regras = [
  'Dor fina/pontada em articulação: pare e avise o professor.',
  'Técnica primeiro: melhor menos reps bem feitas.',
  'Respiração: solte o ar na fase de esforço.',
  'Saltos: aterrisse macio, joelhos alinhados.',
  'Carga: escolha peso que permite boa técnica em todas as reps.',
  'Hidratação: beba água aos poucos durante o treino.',
];

export default function InformacoesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.credito}>Crédito: Prof. Liniker</Text>
        <Text style={styles.titulo}>Informações do treino físico</Text>
        <Text style={styles.subtitulo}>Guia rápido e visual para usar o treino físico de forma simples e segura.</Text>

        <View style={styles.headerCard}>
          <Text style={styles.headerCardTitle}>Plano da semana</Text>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>Treino A</Text>
            <Text style={styles.badge}>Treino B</Text>
            <Text style={styles.badge}>8 semanas</Text>
          </View>
          <Text style={styles.headerCardText}>Dojang e Academia têm o mesmo objetivo: evoluir técnica e preparo físico.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Como funciona</Text>
          {comoFunciona.map((item) => (
            <View key={item.titulo} style={styles.rowItem}>
              <Text style={styles.rowTitle}>{item.titulo}</Text>
              <Text style={styles.rowText}>{item.texto}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Palavras que você vai ver</Text>
          {palavras.map((item) => (
            <Text key={item} style={styles.listItem}>• {item}</Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Escala de esforço (0 a 10)</Text>
          {escala.map((item) => (
            <View key={item.zona} style={styles.escalaRow}>
              <Text style={styles.escalaZona}>{item.zona}</Text>
              <View style={styles.escalaInfo}>
                <Text style={styles.escalaNivel}>{item.nivel}</Text>
                <Text style={styles.escalaDica}>{item.dica}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Regras de segurança</Text>
          {regras.map((item) => (
            <Text key={item} style={styles.listItem}>• {item}</Text>
          ))}
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
  credito: {
    color: '#93C5FD',
    fontSize: 13,
    fontWeight: '700',
  },
  subtitulo: {
    color: '#BFDBFE',
    fontSize: 14,
  },
  headerCard: {
    backgroundColor: '#10233E',
    borderColor: '#1D4ED8',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  headerCardTitle: {
    color: '#E0F2FE',
    fontSize: 17,
    fontWeight: '800',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: '#1E3A8A',
    color: '#DBEAFE',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },
  headerCardText: {
    color: '#BFDBFE',
    fontSize: 13,
    lineHeight: 19,
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
  rowItem: {
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 8,
    gap: 4,
  },
  rowTitle: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rowText: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 20,
  },
  listItem: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 20,
  },
  escalaRow: {
    flexDirection: 'row',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 8,
  },
  escalaZona: {
    minWidth: 44,
    color: '#FCD34D',
    fontSize: 14,
    fontWeight: '800',
  },
  escalaInfo: {
    flex: 1,
    gap: 2,
  },
  escalaNivel: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
  },
  escalaDica: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
});