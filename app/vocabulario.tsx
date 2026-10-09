import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type Termo = {
  coreano: string;
  pt: string;
};

type BlocoVocabulario = {
  titulo: string;
  termos: Termo[];
};

const blocos: BlocoVocabulario[] = [
  {
    titulo: 'Insa (Cumprimento)',
    termos: [
      { coreano: 'Kiugné', pt: 'Saudação' },
      { coreano: 'Kuki e Derraio Kiugné', pt: 'Saudação as Bandeiras' },
      { coreano: 'Do-Djan Kiunhe', pt: 'Saudação a Sala de Aula' },
      { coreano: 'Kwan Ja Nim Kiugné', pt: 'Saudação ao Grão Mestre' },
      { coreano: 'Sa Bo Nim Kiugné', pt: 'Saudação ao Mestre' },
      { coreano: 'Kio Sa Nim Kiugné', pt: 'Saudação ao Instrutor' },
      { coreano: 'Jo Kio Nim Kiugné', pt: 'Saudação ao Assistente' },
      { coreano: 'Anhión Rasseio', pt: 'Tudo bem' },
      { coreano: 'Gansa Ram Nida', pt: 'Obrigado' },
      { coreano: 'Nê ou Ié', pt: 'Sim' },
    ],
  },
  {
    titulo: 'Contagem',
    termos: [
      { coreano: 'Hanná', pt: 'Um' },
      { coreano: 'Tull', pt: 'Dois' },
      { coreano: 'Sêt', pt: 'Três' },
      { coreano: 'Nêt', pt: 'Quatro' },
      { coreano: 'Dasôt', pt: 'Cinco' },
      { coreano: 'Iosôt', pt: 'Seis' },
      { coreano: 'Ilgôb', pt: 'Sete' },
      { coreano: 'Iodoll', pt: 'Oito' },
      { coreano: 'Ahop', pt: 'Nove' },
      { coreano: 'Iol', pt: 'Dez' },
    ],
  },
  {
    titulo: 'Ordens de comando',
    termos: [
      { coreano: 'Kuryong', pt: 'Comando' },
      { coreano: 'Tchariot', pt: 'Sentido' },
      { coreano: 'Son-So', pt: 'Juramento' },
      { coreano: 'Murub Kuro', pt: 'Ajoelhar-se' },
      { coreano: 'Irossôt', pt: 'Levantar-se' },
      { coreano: 'Kalhyo', pt: 'Separar' },
      { coreano: 'Ki Rab', pt: 'Grito' },
      { coreano: 'Retchio', pt: 'Debandar, abrir' },
      { coreano: 'Shijak', pt: 'Começar' },
      { coreano: 'Shiô', pt: 'Descansar' },
      { coreano: 'Bal Bakugui', pt: 'Trocar de Perna' },
      { coreano: 'Jua-u-Hyang-u', pt: 'Ficar frente à frente' },
      { coreano: 'Kuman', pt: 'Parar' },
      { coreano: 'Tirô Tora', pt: 'Meia volta' },
      { coreano: 'Jumbi', pt: 'Preparar' },
      { coreano: 'Barô', pt: 'voltar, parar' },
      { coreano: 'Kesok', pt: 'continuar' },
    ],
  },
  {
    titulo: 'Bang Hyang (Direções) e Nopi (Altura)',
    termos: [
      { coreano: 'Orun', pt: 'Lado Direito' },
      { coreano: 'Uen', pt: 'Lado Esquerdo' },
      { coreano: 'Olgul', pt: 'Rosto' },
      { coreano: 'Monton', pt: 'Tronco' },
      { coreano: 'Arê', pt: 'Baixo' },
      { coreano: 'Yop', pt: 'Lado' },
      { coreano: 'Dui', pt: 'Atrás' },
      { coreano: 'Ap', pt: 'Frente' },
      { coreano: 'Pakat', pt: 'Fora' },
      { coreano: 'An', pt: 'Dentro' },
      { coreano: 'Pitrô', pt: 'Diagonal p/ Fora' },
      { coreano: 'Aproka', pt: 'Deslocar-se p/ frente' },
    ],
  },
  {
    titulo: 'Sogui: Base',
    termos: [
      { coreano: 'Pyoni Sogui', pt: 'Base à vontade' },
      { coreano: 'Tchariôt Sogui', pt: 'Base de sentido' },
      { coreano: 'Moa Sogui', pt: 'Base com os pés fechados (unidos)' },
      { coreano: 'Naran-hi Sogui', pt: 'Base com os pés abertos na largura do ombro' },
      { coreano: 'Jutchum Sogui', pt: 'Base sentado (agachado)' },
      { coreano: 'Orun Sogui', pt: 'Base pelo lado direito' },
      { coreano: 'Uen Sogui', pt: 'Base pelo lado esquerdo' },
      { coreano: 'Ap Sogui', pt: 'Base frontal (passo norma)' },
      { coreano: 'Ap kubi', pt: 'Base de passo penetrado' },
      { coreano: 'Duit kubi', pt: 'Base em "L"' },
      { coreano: 'Boom Sogui', pt: 'Base de leopardo' },
      { coreano: 'Natchuo Sogui', pt: 'Base mais agachado do que o Jutchum Sogui' },
      { coreano: 'Kyot Dari Sogui', pt: 'Base encostada entre dois pés' },
      { coreano: 'Duit Koa Sogui', pt: 'Base com os pés cruzados por trás' },
      { coreano: 'Ap Koa Sogui', pt: 'Base com os pés cruzados pela frente' },
      { coreano: 'Hakdari Sogui', pt: 'Base c/ um pé no chão e outra perna próxima a lateral do joelho' },
      { coreano: 'Ogum Sogui', pt: 'Base c/ um pé no chão e outra perna na região proplítea do joelho' },
    ],
  },
  {
    titulo: 'Kibon Donjak (Aplicação Movimentos)',
    termos: [
      { coreano: 'Jirugui', pt: 'Soco' },
      { coreano: 'Tchigui', pt: 'Bater' },
      { coreano: 'Jirgui', pt: 'Perfurar' },
      { coreano: 'Rulki', pt: 'Arranhar' },
      { coreano: 'Makki', pt: 'Defesa' },
      { coreano: 'Rurigui', pt: 'Arrancar' },
      { coreano: 'Pegui', pt: 'Retirar' },
      { coreano: 'Tchagui', pt: 'Chute' },
      { coreano: 'Oligui', pt: 'Levantar' },
      { coreano: 'Milgui', pt: 'Empurrar' },
      { coreano: 'Pyogui', pt: 'Abrir' },
    ],
  },
];

export default function VocabularioScreen() {
  const [busca, setBusca] = useState('');

  const termo = busca.trim().toLowerCase();
  const blocosFiltrados = blocos
    .map((bloco) => ({
      ...bloco,
      termos: bloco.termos.filter((item) => {
        if (!termo) {
          return true;
        }

        return item.coreano.toLowerCase().includes(termo) || item.pt.toLowerCase().includes(termo);
      }),
    }))
    .filter((bloco) => bloco.termos.length > 0);

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

        {blocosFiltrados.map((bloco) => (
          <View key={bloco.titulo} style={styles.card}>
            <Text style={styles.cardTitulo}>{bloco.titulo}</Text>

            {bloco.termos.map((item) => (
              <View key={`${bloco.titulo}-${item.coreano}`} style={styles.linha}>
                <Text style={styles.coreano}>{item.coreano}</Text>
                <Text style={styles.portugues}>{item.pt}</Text>
              </View>
            ))}
          </View>
        ))}

        {blocosFiltrados.length === 0 && (
          <View style={styles.card}>
            <Text style={styles.semResultados}>Nenhum termo encontrado para essa pesquisa.</Text>
          </View>
        )}
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
    alignSelf: 'flex-start',
    color: '#E0F2FE',
    backgroundColor: '#0C4A6E',
    borderWidth: 1,
    borderColor: '#38BDF8',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
    elevation: 1,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  coreano: {
    flex: 1,
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '800',
  },
  portugues: {
    color: '#93C5FD',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
  },
  semResultados: {
    color: '#94A3B8',
    fontSize: 14,
    paddingTop: 4,
  },
});
