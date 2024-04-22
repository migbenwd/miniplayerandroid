import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { categories } from '../constants';
import CategoriesCard from '../components/CategoriesCard';
import NewsSection from '../components/NewsSection/NewsSection';
import { fetchDiscoverNewsAV } from '../services/NewsApi';

export default function DiscoverScreen() {
  const { colorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState('business');
  const [discoverNewsAV, setDiscoverNewsAV] = useState([]);

  useEffect(() => {
    console.log('active category', activeCategory);
  }, [activeCategory]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    setDiscoverNewsAV([]);
    console.log('category', category);
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

  return (
    <SafeAreaView className="pt-8 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <View>
        {/* Header */}
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-3xl text-green-800 dark:text-white"
            style={{
              fontFamily: 'SpaceGroteskBold',
            }}
          >
            Descubre La Noticia
          </Text>

          <Text
            className="text-base text-gray-600 dark:text-neutral-300 "
            style={{
              fontFamily: 'SpaceGroteskMedium',
            }}
          >
            Noticias De Todo Mexico
          </Text>
        </View>

        {/* Search */}
        <View className="mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full">
          <TouchableOpacity className="pl-2">
            <Icon name="magnify" size="25" color="gray" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search for news"
            placeholderTextColor="gray"
            className="pl-4 flex-1 font-medium text-black tracking-wider"
          />
        </View>

        {/* Categories */}
        <View className="flex-row mx-4">
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        <View className="h-full">
          {/* News */}
          <View className="my-4 mx-4 flex-row justify-between items-center">
            <Text
              className="text-xl dark:text-white"
              style={{
                fontFamily: 'SpaceGroteskBold',
              }}
            >
              Descubre Altavoz
            </Text>

            <Text
              className="text-base text-green-800 dark:text-neutral-300"
              style={{
                fontFamily: 'SpaceGroteskBold',
              }}
            >
              View all
            </Text>
          </View>

          {isDiscoverLoading ? (
            <View className="mt-8 flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: hp(70),
              }}
            >
              <NewsSection
                categories={categories}
                newsMainAV={discoverNewsAV}
                label="Discovery"
              />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
