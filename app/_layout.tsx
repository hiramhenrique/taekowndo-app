import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

type TabName = 'informacoes' | 'treinos' | 'progressao' | 'ponsea' | 'vocabulario';

const icones: Record<TabName, { active: string; idle: string }> = {
  informacoes: { active: 'ℹ️', idle: 'ℹ' },
  treinos: { active: '🏋', idle: '🏋' },
  progressao: { active: '📈', idle: '📊' },
  ponsea: { active: '🥋', idle: '🥋' },
  vocabulario: { active: '📘', idle: '📖' },
};

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const nomeRota = route.name as TabName;
        const icon = icones[nomeRota];

        return {
          headerStyle: { backgroundColor: '#081022' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: '700' },
          tabBarStyle: {
            backgroundColor: '#0B1220',
            borderTopColor: '#1E293B',
            height: 72,
            paddingTop: 8,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: '#38BDF8',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
          },
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                minWidth: 34,
                minHeight: 34,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: focused ? '#0C4A6E' : 'transparent',
                transform: [{ scale: focused ? 1.07 : 1 }],
              }}
            >
              <Text
                style={{
                  fontSize: size,
                  color,
                  fontWeight: focused ? '800' : '600',
                }}
              >
                {focused ? icon.active : icon.idle}
              </Text>
            </View>
          ),
        };
      }}
    >
      <Tabs.Screen name="informacoes" options={{ title: 'Informações' }} />
      <Tabs.Screen name="treinos" options={{ title: 'Treinos' }} />
      <Tabs.Screen name="progressao" options={{ title: 'Progressão' }} />
      <Tabs.Screen name="ponsea" options={{ title: 'Ponsea' }} />
      <Tabs.Screen name="vocabulario" options={{ title: 'Vocabulário' }} />
    </Tabs>
  );
}