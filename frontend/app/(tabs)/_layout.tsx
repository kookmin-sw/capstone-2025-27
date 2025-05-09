import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AppIcon from '@/components/AppIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const mainHeaderStyle = {
    fontSize: 30,
    fontWeight: 'bold'
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'CASHQ&A',
          tabBarShowLabel: false,
          headerTitleStyle: mainHeaderStyle,
          tabBarIcon: () => <AppIcon />,
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: '마이페이지',
          tabBarShowLabel: false,
          headerTitleStyle: mainHeaderStyle,
          tabBarIcon: ({ color } : any) => <IconSymbol size={28} name="person" color={color} />,
        }}
      />
      <Tabs.Screen
        name="question"
        options={{
          title: 'Q',
          href: null,
        }} 
      />
      <Tabs.Screen
        name="postquestion"
        options={{
          title: '질문하기',
          href: null,
        }} 
      />
    </Tabs>
  );
}
