import { useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type LinkExercicio = {
  treino: string;
  exercicio: string;
  url: string;
};

const LINKS_EXERCICIOS: LinkExercicio[] = [
  { treino: 'Aquecimento', exercicio: 'Polichinelo', url: 'https://www.youtube.com/results?search_query=Polichinelo+tecnica+execucao' },
  { treino: 'Aquecimento', exercicio: 'Corrida no lugar com joelho alto', url: 'https://www.youtube.com/results?search_query=Corrida+no+lugar+com+joelho+alto+tecnica+execucao' },
  { treino: 'Aquecimento', exercicio: 'Abrir e fechar o portão', url: 'https://www.youtube.com/results?search_query=abrir+e+fechar+o+portao+mobilidade+quadril+tecnica+execucao' },
  { treino: 'Aquecimento', exercicio: 'Agachamento lento', url: 'https://www.youtube.com/results?search_query=Agachamento+lento+tecnica+execucao' },
  { treino: 'Aquecimento', exercicio: 'Afundo com giro de tronco', url: 'https://www.youtube.com/results?search_query=Afundo+com+giro+de+tronco+tecnica+execucao' },
  { treino: 'Aquecimento', exercicio: 'Balanço de perna (frente e lado)', url: 'https://www.youtube.com/results?search_query=Balanco+de+perna+%28frente+e+lado%29+tecnica+execucao' },
  { treino: 'Aquecimento', exercicio: 'Saltitos na base de luta', url: 'https://www.youtube.com/results?search_query=base+de+luta+taekwondo+saltito+tecnica+execucao' },
  { treino: 'Aquecimento', exercicio: 'Chutes leves', url: 'https://www.youtube.com/results?search_query=ap+tchagui+bandal+tchagui+tecnica+execucao' },

  { treino: 'A - Dojang', exercicio: 'Salto vertical', url: 'https://www.youtube.com/results?search_query=Salto+vertical+tecnica+execucao' },
  { treino: 'A - Dojang', exercicio: 'Agachamento livre', url: 'https://www.youtube.com/results?search_query=Agachamento+livre+tecnica+execucao' },
  { treino: 'A - Dojang', exercicio: 'Afundo alternado (passada)', url: 'https://www.youtube.com/results?search_query=Afundo+alternado+%28passada%29+tecnica+execucao' },
  { treino: 'A - Dojang', exercicio: 'Ponte de glúteo', url: 'https://www.youtube.com/results?search_query=Ponte+de+gluteo+tecnica+execucao' },
  { treino: 'A - Dojang', exercicio: 'Equilíbrio na câmara do chute', url: 'https://www.youtube.com/results?search_query=camara+do+chute+taekwondo+equilibrio+tecnica+execucao' },
  { treino: 'A - Dojang', exercicio: 'Panturrilha em uma perna', url: 'https://www.youtube.com/results?search_query=Panturrilha+em+uma+perna+tecnica+execucao' },
  { treino: 'A - Dojang', exercicio: 'Prancha frontal', url: 'https://www.youtube.com/results?search_query=Prancha+frontal+tecnica+execucao' },
  { treino: 'A - Dojang', exercicio: 'Inseto morto', url: 'https://www.youtube.com/results?search_query=dead+bug+inseto+morto+exercicio+tecnica+execucao' },

  { treino: 'A - Academia', exercicio: 'Salto vertical', url: 'https://www.youtube.com/results?search_query=Salto+vertical+tecnica+execucao' },
  { treino: 'A - Academia', exercicio: 'Agachamento com halter (goblet)', url: 'https://www.youtube.com/results?search_query=agachamento+goblet+tecnica+execucao' },
  { treino: 'A - Academia', exercicio: 'Stiff com halteres', url: 'https://www.youtube.com/results?search_query=Stiff+com+halteres+tecnica+execucao' },
  { treino: 'A - Academia', exercicio: 'Agachamento búlgaro', url: 'https://www.youtube.com/results?search_query=Agachamento+bulgaro+tecnica+execucao' },
  { treino: 'A - Academia', exercicio: 'Elevação de quadril no banco', url: 'https://www.youtube.com/results?search_query=Elevacao+de+quadril+no+banco+tecnica+execucao' },
  { treino: 'A - Academia', exercicio: 'Panturrilha em pé', url: 'https://www.youtube.com/results?search_query=Panturrilha+em+pe+tecnica+execucao' },
  { treino: 'A - Academia', exercicio: 'Prancha frontal', url: 'https://www.youtube.com/results?search_query=Prancha+frontal+tecnica+execucao' },
  { treino: 'A - Academia', exercicio: 'Pallof (antirrotação no cabo)', url: 'https://www.youtube.com/results?search_query=pallof+press+tecnica+execucao' },

  { treino: 'B - Dojang', exercicio: 'Deslocamento lateral na base', url: 'https://www.youtube.com/results?search_query=deslocamento+lateral+taekwondo+tecnica+execucao' },
  { treino: 'B - Dojang', exercicio: 'Salto do patinador', url: 'https://www.youtube.com/results?search_query=Salto+do+patinador+tecnica+execucao' },
  { treino: 'B - Dojang', exercicio: 'Flexão de braço', url: 'https://www.youtube.com/results?search_query=Flexao+de+braco+tecnica+execucao' },
  { treino: 'B - Dojang', exercicio: 'Super-homem com Y', url: 'https://www.youtube.com/results?search_query=superman+Y+exercicio+tecnica+execucao' },
  { treino: 'B - Dojang', exercicio: 'Prancha lateral', url: 'https://www.youtube.com/results?search_query=Prancha+lateral+tecnica+execucao' },
  { treino: 'B - Dojang', exercicio: 'Escalador', url: 'https://www.youtube.com/results?search_query=Escalador+tecnica+execucao' },
  { treino: 'B - Dojang', exercicio: 'Abdominal bicicleta', url: 'https://www.youtube.com/results?search_query=Abdominal+bicicleta+tecnica+execucao' },
  { treino: 'B - Dojang', exercicio: 'Rounds de chute (final)', url: 'https://www.youtube.com/results?search_query=bandal+tchagui+alternado+rapido+tecnica+execucao' },

  { treino: 'B - Academia', exercicio: 'Deslocamento lateral na base', url: 'https://www.youtube.com/results?search_query=deslocamento+lateral+taekwondo+tecnica+execucao' },
  { treino: 'B - Academia', exercicio: 'Salto do patinador', url: 'https://www.youtube.com/results?search_query=Salto+do+patinador+tecnica+execucao' },
  { treino: 'B - Academia', exercicio: 'Supino com halteres', url: 'https://www.youtube.com/results?search_query=Supino+com+halteres+tecnica+execucao' },
  { treino: 'B - Academia', exercicio: 'Remada unilateral com halter (serrote)', url: 'https://www.youtube.com/results?search_query=Remada+unilateral+com+halter+%28serrote%29+tecnica+execucao' },
  { treino: 'B - Academia', exercicio: 'Puxada na frente (pulley)', url: 'https://www.youtube.com/results?search_query=Puxada+na+frente+%28pulley%29+tecnica+execucao' },
  { treino: 'B - Academia', exercicio: 'Prancha lateral', url: 'https://www.youtube.com/results?search_query=Prancha+lateral+tecnica+execucao' },
  { treino: 'B - Academia', exercicio: 'Abdominal no cabo ajoelhado', url: 'https://www.youtube.com/results?search_query=Abdominal+no+cabo+ajoelhado+tecnica+execucao' },
  { treino: 'B - Academia', exercicio: 'Bike intervalada (final)', url: 'https://www.youtube.com/results?search_query=bike+ergometrica+intervalada+HIIT+tecnica+execucao' },
];

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
  const [linksExpandido, setLinksExpandido] = useState(false);

  const abrirYoutube = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Não foi possível abrir o link', 'Tente copiar e abrir no navegador.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.credito}>Crédito: Prof. Liniker</Text>
        <Text style={styles.titulo}>Informações do treino físico</Text>
        <Text style={styles.subtitulo}>Guia rápido e visual para usar o treino físico de forma simples e segura.</Text>

        <View style={styles.headerCard}>
          <Text style={styles.headerCardTitle}>Plano e treino</Text>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>Treino A</Text>
            <Text style={styles.badge}>Treino B</Text>
            <Text style={styles.badge}>8 semanas</Text>
          </View>
          <Text style={styles.headerCardText}>Dojang e Academia têm o mesmo objetivo: evoluir técnica e preparo físico. Ao salvar o treino, você poderá acompanhar sua progressão física dentro do taekwondo.</Text>
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

        <View style={styles.card}>
          <Pressable style={styles.linksHeader} onPress={() => setLinksExpandido((estado) => !estado)}>
            <View style={styles.linksHeaderTextos}>
              <Text style={styles.cardTitulo}>Se tiver alguma dúvida durante o treino, é só ver o link correspondente ao exercício.</Text>
              <Text style={styles.linksAjuda}>Toque no botão abaixo para {linksExpandido ? 'ocultar' : 'ver'} os links dos exercícios.</Text>
            </View>

            <View style={styles.linksBotaoExpandir}>
              <Text style={styles.linksBotaoExpandirTexto}>{linksExpandido ? 'Ocultar links ▲' : 'Ver links ▼'}</Text>
            </View>
          </Pressable>

          {linksExpandido && (
            <>
              <Text style={styles.cardHint}>Toque no botão YouTube para abrir direto o link do exercício.</Text>

              {LINKS_EXERCICIOS.map((item, index) => (
                <View key={`${item.treino}-${item.exercicio}-${index}`} style={styles.linkRow}>
                  <View style={styles.linkRowTopo}>
                    <View style={styles.linkInfo}>
                      <Text style={styles.linkTreino}>{item.treino}</Text>
                      <Text style={styles.linkExercicio}>{item.exercicio}</Text>
                    </View>

                    <Pressable style={styles.linkButton} onPress={() => abrirYoutube(item.url)}>
                      <Text style={styles.linkButtonText}>▶ YouTube</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </>
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
  cardHint: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 4,
  },
  linksHeader: {
    gap: 10,
  },
  linksHeaderTextos: {
    gap: 6,
  },
  linksAjuda: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '600',
  },
  linksBotaoExpandir: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E3A8A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#60A5FA',
  },
  linksBotaoExpandirTexto: {
    color: '#DBEAFE',
    fontSize: 12,
    fontWeight: '800',
  },
  linkRow: {
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 8,
    gap: 8,
  },
  linkRowTopo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  linkInfo: {
    flex: 1,
    gap: 2,
  },
  linkTreino: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  linkExercicio: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
  },
  linkButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#DC2626',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  linkButtonText: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
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