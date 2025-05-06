import { db } from "@/config/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Restaurant() {
  const { restaurant } = useLocalSearchParams();
  const flatListRef = useRef(null);
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [slotsData, setSlotsData] = useState({});

  const windowWidth = Dimensions.get("window").width;

  const carouselItem = ({ item }) => {
    return (
      <View
        style={{ width: windowWidth - 2 }}
        className="h-64 relative rounded-[25px]"
      >
        <View style={styles.carouselBody}>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </View>
        <Image
          source={{ uri: item }}
          style={styles.carouselImage}
          className="h-64"
        />
      </View>
    );
  };

  const getRestaurantData = async () => {
    try {
      const restaurantQuery = query(
        collection(db, "restaurants"),
        where("name", "==", restaurant)
      );
      const restaurantSnapshot = await getDocs(restaurantQuery);

      if (restaurantSnapshot.empty) {
        console.log("Eşleşen restoran bulunamadı.");
        return;
      }

      for (const doc of restaurantSnapshot.docs) {
        const restaurantData = doc.data();
        setRestaurantData(restaurantData);

        const carouselQuery = query(
          collection(db, "carousel"),
          where("res_id", "==", doc.ref)
        );
        const carouselSnapshot = await getDocs(carouselQuery);
        const carouselImages = [];

        if (carouselSnapshot.empty) {
          console.log("Eşleşen fotoğraf bulunamadı.");
          return;
        }

        carouselSnapshot.forEach((carouselDoc) => {
          carouselImages.push(carouselDoc.data());
        });
        setCarouselData(carouselImages);

        const slotsQuery = query(
          collection(db, "slots"),
          where("ref_id", "==", doc.ref)
        );
        const slotsSnapshot = await getDocs(slotsQuery);
        const slots = [];

        if (slotsSnapshot.empty) {
          console.log("Eşleşen zaman dilimi bulunamadı.");
          return;
        }

        slotsSnapshot.forEach((slotDoc) => {
          slots.push(slotDoc.data());
        });
        setSlotsData(slots);
      }
    } catch (error) {
      console.log("Veri alma hatası", error);
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2">
          <Text className="text-xl text-[#f49b33] mr-2 font-semibold">
            {restaurant}
          </Text>
          <View className="border-b border-[#f49b33]" />
        </View>
        <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
          <FlatList
            ref={flatListRef}
            data={carouselData[0]?.images}
            renderItem={carouselItem}
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={{ borderRadius: 25 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  carouselBody: {
    position: "absolute",
    top: "50%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 50,
    padding: 5,
    zIndex: 10,
    right: "6%",
  },
  carouselImage: {
    opacity: 0.5,
    backgroundColor: "black",
    marginRight: 20,
    marginLeft: 5,
  },
  container: {
    backgroundColor: "#2b2b2b",
    paddingBottom:
      Platform.OS === "android" ? 55 : Platform.OS === "ios" ? 20 : 0,
  },
});
