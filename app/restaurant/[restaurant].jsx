import DatePickerComponent from "@/components/restaurant/DatePickerComponent";
import FindSlots from "@/components/restaurant/FindSlots";
import GuestPickerComponent from "@/components/restaurant/GuestPickerComponent";
import { db } from "@/config/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
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
  const windowWidth = Dimensions.get("window").width;
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [slotsData, setSlotsData] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [selectedNumber, setSelectedNumber] = useState(2);

  const handleNextImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (!carouselLength) return;

    if (currentIndex < carouselLength - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      const nextIndex = 0;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlePrevImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (!carouselLength) return;

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = carouselLength - 1;
    }

    setCurrentIndex(prevIndex);
    flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
  };

  const carouselItem = ({ item }) => {
    return (
      <View style={{ width: windowWidth - 2 }} className="h-64 relative">
        <View style={styles.imageNext}>
          <Ionicons
            onPress={handleNextImage}
            name="arrow-forward"
            size={24}
            color="white"
          />
        </View>
        <View style={styles.imagePrev}>
          <Ionicons
            onPress={handlePrevImage}
            name="arrow-back"
            size={24}
            color="white"
          />
        </View>
        <View style={styles.imageIndicator}>
          {carouselData[0].images?.map((_, i) => (
            <View
              key={i}
              className={`bg-white h-2 w-2 ${
                i == currentIndex && "h-3 w-3"
              } p-1 mx-1 rounded-full`}
            />
          ))}
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
        setSlotsData(slots[0]?.slot);
      }
    } catch (error) {
      console.log("Veri alma hatası", error);
    }
  };

  const handleLocation = async () => {
    const url = "https://maps.app.goo.gl/kxsLxnRyXjMyyEos9";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Bu URL açılamıyor:", url);
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
        <View className="flex-1 flex-row mt-2 p-2">
          <Ionicons name="location-sharp" size={24} color="#f49b33" />
          <Text className="max-w-[75%] text-white">
            {restaurantData?.address} |{" "}
            <Text
              onPress={handleLocation}
              className="underline flex items-center mt-1 text-[#f49b33] italic font-semibold"
            >
              Yol Tarifi Al
            </Text>
          </Text>
        </View>
        <View className="flex-1 flex-row p-2">
          <Ionicons name="time" size={20} color="#f49b33" />
          <Text className="max-w-[75%] mx-2 font-semibold text-white">
            {restaurantData?.opening} - {restaurantData?.closing}
          </Text>
        </View>
        <View className="flex-1 border m-2 p-2 border-[#f49b33] rounded-lg">
          <View className="flex-1 flex-row m-2 p-2 justify-end items-center">
            <View className="flex-1 flex-row">
              <Ionicons name="calendar" size={20} color="#f49b33" />
              <Text className="text-white mx-2 text-base">
                Rezervasyon tarihini seçin:
              </Text>
            </View>
            <DatePickerComponent date={date} setDate={setDate} />
          </View>
          <View className="flex-1 flex-row bg-[#474747] rounded-lg m-2 p-2 justify-end items-center">
            <View className="flex-1 flex-row">
              <Ionicons name="people" size={20} color="#f49b33" />
              <Text className="text-white mx-2 text-base">Kişi Sayısı:</Text>
            </View>
            <GuestPickerComponent
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
            />
          </View>
        </View>
        <View className="flex-1">
          <FindSlots
            date={date}
            selectedNumber={selectedNumber}
            slots={slotsData}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageNext: {
    position: "absolute",
    top: "50%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 50,
    padding: 5,
    zIndex: 10,
    right: "6%",
  },
  imagePrev: {
    position: "absolute",
    top: "50%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 50,
    padding: 5,
    zIndex: 10,
    left: "2%",
  },
  imageIndicator: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    transform: [{ translateX: -50 }],
    zIndex: 10,
    bottom: 15,
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
