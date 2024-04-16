import { View, Text, Pressable, Image } from 'react-native'
import React from 'react';
import { categoryData } from '../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated ,{ FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({meals, categories}) {

  const navigation = useNavigation();
  return (
    <View style={{ marginTop: hp(0.5) ,marginLeft: hp(1.5)}}>
      <Text style={{fontSize: hp(2.5), fontWeight: 'bold'}}>Recipes</Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (<Loading />) : (
              <MasonryList
              data={meals}
              keyExtractor={(item) => item.idMeal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
              // refreshing={isLoadingNext}
              // onRefresh={() => refetch({first: ITEM_CNT})}
              onEndReachedThreshold={0.1}
              // onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  )
}

const RecipeCard = ({item, index, navigation}) => {
    let isEven = index %2 == 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable
                style={{width: '100%', flex: 1, justifyContent: 'center', marginTop: hp(1), 
                paddingLeft: isEven ? 0 : 8}}
                onPress={() => navigation.navigate('RecipeDetail', {...item})}
            >
                <Image
                    source={{uri: item.strMealThumb}}
                    style={{width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: 35}}
                >
                </Image>
                <Text style={{fontWeight: 'bold', color: '#8F8F8F', marginLeft: hp(1), marginTop: hp(0.5)}}>
                    {
                        item.strMeal.length> 20 ? item.strMeal.slice(0,20) + '...' : item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}