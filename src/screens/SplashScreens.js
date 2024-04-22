import { View, Text } from 'react-native';
import React, { useEffect, useCallback } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreens() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskSemiBold: require('../fonts/SpaceGrotesk-SemiBold.ttf'),
    SpaceGroteskBold: require('../fonts/SpaceGrotesk-Bold.ttf'),
    SpaceGroteskMedium: require('../fonts/SpaceGrotesk-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

    setTimeout(() => {
      navigation.navigate('Welcome'); // Navigate to HomeTab
    }, 3000); // 3 seconds delay
  }, [fontError, fontsLoaded, navigation]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      onLayout={onLayoutRootView}
      className="flex-1 bg-[#0303B2] justify-center items-center"
    >
      <Text className="text-white text-3xl font-extrabold uppercase">
        Noticiero Altavoz
      </Text>
    </View>
  );
}
