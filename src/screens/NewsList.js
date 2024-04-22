import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import { useQuery } from '@tanstack/react-query';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import { categories } from '../constants';
import CategoriesCard from '../components/CategoriesCard';
import NewsSection from '../components/NewsSection/NewsSection';
import { fetchDiscoverNewsAV } from '../services/NewsApi';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  const { colorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState('50');
  const [selectedCategoryTitle, setSelectedCategoryTitle] =
    useState('Nacional');
  const [discoverNewsAV, setDiscoverNewsAV] = useState([]);

  useEffect(() => {
    console.log('active category', activeCategory);
  }, [activeCategory]);

  const handleChangeCategory = (category) => {
    console.log('en category', category);
    setActiveCategory(category.id);
    setDiscoverNewsAV([]);
    setSelectedCategoryTitle(category.title);
  };

  const { isLoading: isDiscoverLoading } = useQuery({
    queryKey: ['discoverNews', activeCategory], // Include the category as part of the key
    queryFn: () => fetchDiscoverNewsAV(activeCategory), // You can skip the query if the category is "business"
    onSuccess: (data) => {
      const filteredNewsAV = data;
      setDiscoverNewsAV(filteredNewsAV);
    },
    onError: (error) => {
      console.log('Error fetching discover news', error);
    },
  });

  if (!fontsLoaded) {
    return <Text />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-row justify-between items-center px-2 pb-12 bg-[#0303B2]" />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View style={styles.container}>
        <View>
          <Image
            source={require('../../assets/images/welcome/logo.png')}
            style={{
              resizeMode: 'contain',
              height: 100,
              width: 200,
            }}
          />
        </View>
      </View>

      <View className="p-2">
        <CategoriesCard
          categories={categories}
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />

        <Text
          className="text-xl dark:text-white mb-2 mt-2"
          style={{ fontFamily: 'Poppins_300Light' }}
        >
          {selectedCategoryTitle}
        </Text>
        {isDiscoverLoading ? (
          <View className="mt-8 flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(35),
            }}
          >
            <NewsSection
              categories={categories}
              newsMainAV={discoverNewsAV}
              label="Discovery"
              tituloCategoria={selectedCategoryTitle}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '10%',
    textAlign: 'center',
    backgroundColor: 'white',
  },

  poppinsthin: {
    fontFamily: 'Poppins-Thin',
    fontSize: 30,
  },
});
