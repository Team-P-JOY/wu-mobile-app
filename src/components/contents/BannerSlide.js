import { View, Image, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

const BannerSlide = () => {
  const data = [
    {
      url: "https://clib.psu.ac.th/greenlibrary/images/2023/02/17/banner-green.png",
    },
    {
      url: "https://dszw1qtcnsa5e.cloudfront.net/community/20250124/10003ce7-01ef-4f5b-b18b-8bf4ca421792/381.png",
    },
    {
      url: "https://n2nsp.com/wp-content/uploads/2021/12/20211209_n2nsp_page_ocr-768x256.jpg",
    },
  ];

  return (
    <Carousel
      width={width}
      height={width / 3}
      data={data}
      renderItem={({ index }) => (
        <View style={styles.itemContainer}>
          <Image
            index={index}
            source={{
              uri: data[index].url,
            }}
            style={styles.itemImage}
          />
        </View>
      )}
      loop={true}
      autoPlay={true}
      autoPlayInterval={5000}
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
    height: width / 3,
  },
});

export default BannerSlide;
