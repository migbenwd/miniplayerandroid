import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/welcome/reporter.jpg')}
      className="flex-1 justify-center items-center pb-6"
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      {/* <View className="flex-1 items-center justify-end max-w-[85%]  space-y-4 "> */}
      <View className="items-center max-w-[50%] mt-96">
        <Text
          className="font-bold shadow-2xl text-white text-center tracking-wider mt-18 mb-16"
          style={{
            fontSize: wp(6),
            fontFamily: 'SpaceGroteskBold',
          }}
        >
          Entérate de lo último de Sinaloa y el mundo
        </Text>
      </View>

      <TouchableOpacity
        className="bg-[#0303B2] rounded-full p-4 justify-center items-center w-[50%]"
        onPress={() => navigation.navigate('HomeTabs')}
      >
        <Text className="text-base text-white">Ver Noticias</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
