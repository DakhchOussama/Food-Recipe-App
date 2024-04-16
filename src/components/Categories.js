import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Categories({ categories, activeCategory, handleSelectCategory }) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={{ marginRight: hp(2) }}
      >
        {
          categories.map((category, index) => {
            let isActive = category.strCategory === activeCategory;
            let activeButtonColor = isActive ? '#FBC601' : '#C4C3BE';
            return (
              <TouchableOpacity
                key={index}
                style={styles.touchable}
                onPress={() => handleSelectCategory(category.strCategory)}
              >
                <View style={styles.categoryContainer}>
                  <View style={[styles.button, { backgroundColor: activeButtonColor }]}>
                    <Image
                      source={{ uri: category.strCategoryThumb }}
                      style={styles.image}
                    />
                  </View>
                  <Text style={styles.categoryName}>{category.strCategory}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  touchable: {
    marginTop: 10,
    alignItems: 'center',
  },
  categoryContainer: {
    padding: hp(1),
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#C4C3BE',
    borderRadius: 999,
    width: hp(6.5),
    height: hp(6.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: hp(5.8),
    height: hp(5.8),
    borderRadius: 9999,
  },
  categoryName: {
    color: '#868686',
    fontSize: hp(1.6),
    marginTop: hp(0.7),
    marginLeft: hp(0.5),
  },
});
