import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import entryImage from "../../assets/images/Frame.png";
import validationSchema from "../../utils/authSchema";

const Login = () => {
  const router = useRouter();
  const handleLogin = () => {};
  return (
    <SafeAreaView className={`bg-[#2b2b2b] h-full`}>
      <ScrollView style={styles.contentContainer}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={styles.image} />
          <Text className="text-lg text-center text-white font-bold mb-10">
            Hadi Başlayalım
          </Text>

          <View className="w-5/6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="w-full">
                  <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                  <TextInput
                    className="h-10 border border-white text-white rounded px-2"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                  />
                  {errors.email && touched.email && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.email}
                    </Text>
                  )}
                  <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                  <TextInput
                    className="h-10 border border-white text-white rounded px-2"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                  />
                  {errors.password && touched.password && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-2 my-2 bg-[#f49b33] text-black rounded-lg mt-10"
                  >
                    <Text className="text-lg font-semibold text-center">
                      Giriş Yap
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View className="flex justify-center items-center">
              <TouchableOpacity
                className="flex flex-row justify-center mt-5 p-2 items-center"
                onPress={() => router.push("/signup")}
              >
                <Text className="text-white font-semibold">
                  Yeni kullanıcı mısın?
                </Text>
                <Text className="text-base font-semibold underline text-[#f49b33]">
                  Kayıt Ol
                </Text>
              </TouchableOpacity>

              <Text className="text-center text-base font-semibold mb-4 text-white">
                <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
                veya{" "}
                <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
              </Text>

              <TouchableOpacity
                className="flex flex-row justify-center mb-5 p-2 items-center"
                onPress={() => router.push("/home")}
              >
                <Text className="text-white font-semibold">Misafir</Text>
                <Text className="text-base font-semibold underline text-[#f49b33]">
                  {" "}
                  Kullanıcı
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
};

export default Login;

const styles = StyleSheet.create({
  contentContainer: {
    height: "100%",
  },
  image: {
    width: 200,
    height: 100,
  },
});
