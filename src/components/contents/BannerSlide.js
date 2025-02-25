import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

const BannerSlide = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://e-jpas.wu.ac.th/img.php");
        const result = await response.json();
        setData(result.map((item) => ({ url: item.src }))); // แปลงโครงสร้างข้อมูล
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Carousel
      width={width}
      height={width / 2.3}
      data={data}
      renderItem={({ index }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: data[index].url }} style={styles.itemImage} />
        </View>
      )}
      loop={true}
      autoPlay={true}
      autoPlayInterval={2000}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemImage: {
    width: width,
    height: width / 2.3,
    resizeMode: "cover",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BannerSlide;
