import { SafeAreaView, View, StyleSheet, Platform, StatusBar, useWindowDimensions, ImageBackground } from "react-native";
import { scale } from "react-native-size-matters";
import { SvgUri } from "react-native-svg";
import { RaceForm } from "../components/RaceForm";

function HomeScreen({ navigation }: any) {
  const { width, height } = useWindowDimensions();

  return <SafeAreaView style={styles.container}>
    <ImageBackground
      source={{ uri: "https://allenjoystudio.com/cdn/shop/files/Snowy_Winter_Scene_Photography_Backdrop_GB_NKWVW2T_Square.jpg?v=1718386693" }}
      resizeMode="cover"
      style={[styles.container, styles.bgImage]}
    >
      <View style={styles.overlay} />
      <SvgUri
        width={scale(500)}
        height={scale(50)}
        uri="https://busfor.ua/packs/_/assets/javascripts/new/app/react/components/Header/dotua_bbc_redirection_logo_white-8ac168364606ee78c0ccfc540d5d3031.svg"
      />
      <RaceForm orientation={(width > height) ? "landscape" : "portrait"} />
    </ImageBackground>
  </SafeAreaView>
}

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  bgImage: {
    gap: scale(50),
    alignItems: "center",
    paddingTop: Platform.select({
      ios: 0,
      default: StatusBar.currentHeight
    }),
    padding: scale(20)
  }
})