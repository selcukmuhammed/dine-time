import { useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/dinetimelogo.png";
import entryImage from "../assets/images/Frame.png";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className={`bg-[#2b2b2b] h-full`}>
      <ScrollView style={styles.contentContainer}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={styles.image} />
          <View className="w-3/4">
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              className="p-2 my-2 bg-[#f49b33] text-black rounded-lg"
            >
              <Text className="text-lg font-semibold text-center">
                Kayıt Ol
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/home")}
              className="p-2 my-2 bg-[#2b2b2b] border border-[#f49b33] rounded-lg"
            >
              <Text className="text-lg font-semibold text-[#f49b33] text-center">
                Misafir Kullanıcı
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-base font-semibold my-4 text-white">
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
              veya{" "}
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
            </Text>
          </View>
          <TouchableOpacity
            className="flex flex-row justify-center items-center"
            onPress={() => router.push("/login")}
          >
            <Text className="text-white font-semibold">
              Zaten bir kullanıcı mısın?
            </Text>
            <Text className="text-base font-semibold underline text-[#f49b33]">
              Giriş Yap
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1">
          <Image
            source={entryImage}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    height: "100%",
  },
  image: {
    width: 300,
    height: 300,
  },
});
