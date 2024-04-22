import {
  Image,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  // StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

const { height, width } = Dimensions.get('window');

export default function NewsDetails() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const { item, tituloCategoria } = useRoute().params;

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const runFirst = `(function(){

    const Header = document.querySelector("[data-elementor-id='36']");
    Header.remove();
    
    const ArbolNavegacion = document.querySelector("[data-id='6a5c232']");
    ArbolNavegacion.remove();

    const Footer = document.querySelector("[data-elementor-id='87']");
    Footer.remove();

    const LateralDerecho = document.querySelector("[data-id='bb28b33']");
    LateralDerecho.remove();
    
    const NoticiasRelacionadas = document.querySelector("[data-id='23d0ea9']");
    NoticiasRelacionadas.remove();

    const TituloNoticiasRelacionadas = document.querySelector("[data-id='d319abd']");
    TituloNoticiasRelacionadas.remove();

    const DivAnteriorSiguiente = document.querySelector("[data-id='0e00ed8']");
    DivAnteriorSiguiente.remove();

    const DivComentarios = document.querySelector("[data-id='b09ba3d']");
    DivComentarios.remove();

    const DivQueOpinas = document.querySelector("[data-id='3ed0f87']");
    DivQueOpinas.remove();

    const BtnWhatsapp = document.getElementsByClassName("joinchat__button")[0];
    BtnWhatsapp.remove();

    const IconosRedesSociales = document.querySelector("[data-id='69312eb']");
    IconosRedesSociales.remove();

    const HazPrimerComentario = document.querySelector('.elementor-post-info li:nth-child(3)');
    HazPrimerComentario.remove();

    const AutorFecha = document.querySelector("[data-id='63ff403']");
    
    const TituloNoticia = document.querySelector("[data-id='a86e2df']");
    TituloNoticia.style.width = "100%";

    const TituloNoticiaFont = document.querySelector("[class='elementor-heading-title elementor-size-default']");
    TituloNoticiaFont.style.fontSize = "24px";
    TituloNoticiaFont.style.width = "99%";
    
    const TextoNoticia = document.querySelector("[data-id='4a7d0f5']");
    TextoNoticia.style.marginTop = "3%";

    const FotoNoticia = document.querySelector("[data-id='27eacb1']");
    
    const contenedor = document.querySelector("[data-id='5694eb7']");
    contenedor.style.width = "100%";

    contenedor.insertBefore(TituloNoticia, FotoNoticia);
    contenedor.insertBefore(AutorFecha, FotoNoticia);

    const AutoriaFechaCuadro = document.querySelector(".elementor-inline-items.elementor-icon-list-items.elementor-post-info");
    AutoriaFechaCuadro.style.listStyle = "none";



    true; 
  })()
`;

  if (!fontsLoaded) {
    return <Text />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-row justify-between items-center px-2 pb-12 bg-[#0303B2] " />

      <View className="items-center bg-white">
        <Image
          source={require('../../assets/images/welcome/logo.png')}
          style={{
            resizeMode: 'contain',
            width: '60%',
          }}
        />
      </View>

      <View className="px-2 pb-0 bg-white">
        <View className="rounded-full ml-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={30} strokeWidth={3} color="blue" />
          </TouchableOpacity>
        </View>
        <Text
          className="mt-4 pl-4 text-[#0303B2]"
          style={{
            // fontFamily: 'SpaceGroteskBold',
            fontFamily: 'Poppins_400Regular',

            fontSize: 20,
          }}
        >
          {tituloCategoria}
        </Text>
      </View>

      <WebView
        source={{ uri: item.link }}
        injectedJavaScript={runFirst}
        onMessage={() => {}}
        style={{
          display: !visible ? 'flex' : 'none',
        }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
        onLoadProgress={() => console.log('en migben Load Progress')}
      />

      {visible ? (
        <ActivityIndicator
          size="large"
          color="blue"
          style={{
            position: 'absolute',
            top: height / 2,
            left: width / 2,
          }}
        />
      ) : null}
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
// });
