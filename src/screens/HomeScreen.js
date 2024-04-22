/* eslint-disable global-require */

import {
  View,
  Text,
  Image,
  ActivityIndicator,
  // StyleSheet,
  SectionList,
  TouchableOpacity,
  // Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
// import Carousel from 'react-native-snap-carousel';
import CategoriesCard from '../components/CategoriesCard';
import NewsSection, {
  RenderNewsItem,
} from '../components/NewsSection/NewsSection';

import {
  getNewsByCategoryId,
  getCategories,
  // getPublicidad,
} from '../services/NewsApi';

// import { openInBrowser } from '../utils/openInBrowser';

// const { width } = Dimensions.get('screen');
// function wp(percentage) {
//   const value = (percentage * width) / 100;
//   return Math.round(value);
// }

// const slideWidth = wp(75);
// const itemHorizontalMargin = wp(2);
// const itemWidth = slideWidth + itemHorizontalMargin * 2;

const CATEGORY_DEFAULT = { id: '77', title: 'Portada' };

const getTheFirstFiveNewsByCategories = async () => {
  const categories = await getCategories();
  const newsByCategoriesId = [CATEGORY_DEFAULT, ...categories].map(
    async (category) => {
      const news = await getNewsByCategoryId(category.id);
      return {
        title: category.title,
        id: category.id,
        data: news.slice(0, 5),
      };
    }
  );

  return Promise.all(newsByCategoriesId);
};

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const { colorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState(CATEGORY_DEFAULT);
  const [isLoading, setIsLoading] = useState(true);
  const [discoverNewsAV, setDiscoverNewsAV] = useState([]);
  const [newsPortada, setNewsPortada] = useState([]);
  // const [adPublicidad, setadPublicidad] = useState([]);

  function fetchNewsByCategory(categoryId) {
    setIsLoading(true);

    if (categoryId === CATEGORY_DEFAULT.id) {
      return getTheFirstFiveNewsByCategories().then((data) => {
        setIsLoading(false);
        setNewsPortada(data);
      });
    }

    getNewsByCategoryId(categoryId)
      .then((data) => {
        setIsLoading(false);
        setDiscoverNewsAV(data);
      })
      .catch((err) => {
        console.log('Error fetching news by category id', err);
      });
  }

  const handleChangeCategory = (category) => {
    setDiscoverNewsAV([]);
    setActiveCategory(category);
    fetchNewsByCategory(category.id);
  };

  useEffect(() => {
    // getPublicidad().then(setadPublicidad);
    fetchNewsByCategory(CATEGORY_DEFAULT.id);
  }, []);

  if (!fontsLoaded) {
    return <Text />;
  }

  // const renderItem = ({ item }) => {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.6}
  //       onPress={() => openInBrowser(item.src)}
  //     >
  //       <Image
  //         source={{ uri: item.image }}
  //         style={{ aspectRatio: 4 / 3, flex: 1 }}
  //         resizeMode="cover"
  //       />
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <SafeAreaView style={{ flex: 1 }} edge={['bottom']}>
      <View className="flex-row justify-between items-center px-2 pb-12 bg-[#0303B2]" />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <View className="items-center mb-2  bg-white">
        <Image
          source={require('../../assets/images/welcome/logo.png')}
          style={{
            resizeMode: 'contain',
            width: '60%',
          }}
        />
      </View>

      <View className="p-2">
        <CategoriesCard
          activeCategory={activeCategory.id}
          handleChangeCategory={handleChangeCategory}
        />

        {activeCategory.id === CATEGORY_DEFAULT.id ? null : (
          <Text
            className="dark:text-white ml-2 mb-2 mt-4"
            style={{
              fontSize: hp(3.25),
              fontFamily: 'Poppins_700Bold',
            }}
          >
            {activeCategory.title}
          </Text>
        )}
      </View>
      {isLoading ? (
        <View className="mt-8 flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : activeCategory.id === CATEGORY_DEFAULT.id ? (
        <SectionList
          sections={newsPortada}
          keyExtractor={(item) => item.id}
          renderSectionFooter={({
            section: { id: categoryId, title: categoryTitle },
          }) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() =>
                    handleChangeCategory({
                      id: categoryId,
                      title: categoryTitle,
                    })
                  }
                  className="flex items-center space-y-1"
                >
                  <View
                    className="mb-6 py-2 px-4 border-2 bg-slate-50  w-50"
                    style={{ borderRadius: 50 }}
                  >
                    <Text
                      style={{
                        fontSize: hp(2),
                        fontFamily: 'Poppins_400Regular',
                      }}
                    >
                      Ver Más
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <View className="mb-10 " style={{ alignItems: 'center' }}>
                  <Carousel
                    data={adPublicidad}
                    renderItem={renderItem}
                    sliderWidth={slideWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages
                    containerCustomStyle={styles.slider}
                    loop
                    loopClonesPerSide={2}
                    autoplay
                    autoplayDelay={500}
                    autoplayInterval={3000}
                  />
                </View> */}
              </>
            );
          }}
          renderItem={({ item, index }) => (
            <RenderNewsItem
              item={item}
              tituloCategoria={activeCategory.title}
              activeCategoryId={activeCategory.id}
              indexso={index}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            // -------------- category tittle
            <View className="flex-row">
              <Text
                className="bg-[#FFCC29] uppercase rounded ml-2 py-0 px-7 mt-0 mb-4"
                style={{
                  fontSize: hp(2),
                  fontFamily: 'Poppins_700Bold',
                }}
              >
                {title}
              </Text>
            </View>
          )}
        />
      ) : (
        <NewsSection
          data={discoverNewsAV}
          tituloCategoria={activeCategory.title}
          activeCategoryId={activeCategory.id}
        />
      )}
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     height: '10%',
//     textAlign: 'center',
//     backgroundColor: 'white',
//   },
//   slider: {
//     overflow: 'hidden',
//   },
// });
