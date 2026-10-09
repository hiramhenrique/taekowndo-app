import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
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
      }}
    >
      <Tabs.Screen name="informacoes" options={{ title: 'Informacoes' }} />
      <Tabs.Screen name="treinos" options={{ title: 'Treinos' }} />
      <Tabs.Screen name="progressao" options={{ title: 'Progressao' }} />
      <Tabs.Screen name="ponsea" options={{ title: 'Ponsea' }} />
      <Tabs.Screen name="vocabulario" options={{ title: 'Vocabulario' }} />
    </Tabs>
  );
}