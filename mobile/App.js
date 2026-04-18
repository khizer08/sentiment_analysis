import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen     from './src/screens/HomeScreen';
import AnalyzerScreen from './src/screens/AnalyzerScreen';
import HistoryScreen  from './src/screens/HistoryScreen';
import AboutScreen    from './src/screens/AboutScreen';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();

const TAB_ICONS = { Home: '⊞', Analyzer: '◎', History: '≡', About: '?' };

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 18, color: focused ? colors.cyan : colors.textMuted }}>
              {TAB_ICONS[route.name]}
            </Text>
          ),
          tabBarActiveTintColor: colors.cyan,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            paddingBottom: 4,
            height: 58,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          headerStyle: {
            backgroundColor: colors.bg,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          headerRight: () => (
            <Text style={{
              color: colors.cyan, fontSize: 11, fontWeight: '700',
              marginRight: 16, backgroundColor: colors.cyanDim,
              paddingHorizontal: 8, paddingVertical: 3,
              borderRadius: 99, borderWidth: 1, borderColor: colors.cyan, overflow: 'hidden',
            }}>
              NLP
            </Text>
          ),
        })}
      >
        <Tab.Screen name="Home"     component={HomeScreen}     options={{ title: 'SentiScope',  tabBarLabel: 'Home' }} />
        <Tab.Screen name="Analyzer" component={AnalyzerScreen} options={{ title: 'Analyzer',    tabBarLabel: 'Analyze' }} />
        <Tab.Screen name="History"  component={HistoryScreen}  options={{ title: 'History',     tabBarLabel: 'History' }} />
        <Tab.Screen name="About"    component={AboutScreen}    options={{ title: 'About',       tabBarLabel: 'About' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
