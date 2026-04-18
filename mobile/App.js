import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen     from './src/screens/HomeScreen';
import AnalyzerScreen from './src/screens/AnalyzerScreen';
import HistoryScreen  from './src/screens/HistoryScreen';
import AboutScreen    from './src/screens/AboutScreen';
import { colors } from './src/theme';
import { TOP_TAB_HEIGHT } from './src/navLayout';

const Tab = createBottomTabNavigator();
const TAB_ICONS = { Home: '⊞', Analyzer: '◎', History: '≡', About: '?' };

function AppContent() {
  const insets = useSafeAreaInsets();
  const topReservedSpace = TOP_TAB_HEIGHT + insets.top;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 16, color: focused ? colors.cyan : colors.textMuted }}>
              {TAB_ICONS[route.name]}
            </Text>
          ),
          tabBarActiveTintColor: colors.cyan,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarPosition: 'bottom',
          tabBarStyle: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            paddingTop: insets.top,
            height: topReservedSpace,
          },
          tabBarItemStyle: { paddingVertical: 4 },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
          sceneContainerStyle: { paddingTop: 0 },
          sceneStyle: { paddingTop: 0 },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'SentiScope', tabBarLabel: 'Home' }} />
        <Tab.Screen name="Analyzer" component={AnalyzerScreen} options={{ title: 'Analyzer', tabBarLabel: 'Analyze' }} />
        <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'History', tabBarLabel: 'History' }} />
        <Tab.Screen name="About" component={AboutScreen} options={{ title: 'About', tabBarLabel: 'About' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
