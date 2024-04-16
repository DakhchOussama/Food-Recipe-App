import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';

export default function RecipeDetailsScreen(props) {
    const item = props.route.params;
    const [isFavorite, setisFavorite] = useState(false);
    const navigate = useNavigation();
    const [meal, setmeal] = useState(null);
    const [loading, setloading] = useState(true);


    useEffect(() => {
        getMealData(item.idMeal);
    }, []);

    const getmealdata = (meal) => {
        if (!meal) return [];

        let indexes = [];

        for (let i = 0; i <= 20; i++){
            if (meal['strIngredient'+i])
                indexes.push(i);
        }

        return indexes;
    };

    const getMealData = async (id) => {
        try{
            const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            if (data) {
                setmeal(data.meals[0]);
                setloading(false);
            }
        }catch(error){
            console.log('error : ', error);
        }
    }
  return (
    <ScrollView
        style={{backgroundColor: 'white', flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
    >
        <StatusBar style={"light"} />

    {/* recipe image */}

    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
            source={{uri: item.strMealThumb}}
            style={{width: wp(98), height: hp(50), borderRadius: 8, borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}
        />
    </View>

    {/* back button */}

    <View style={{width: '100%', position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp(3)}}>
        <TouchableOpacity onPress={() => navigate.goBack()} style={{padding: 3, backgroundColor: 'white', borderRadius: 9999, marginLeft: 10, alignItems: 'center', justifyContent: 'center'}}>
            <ChevronLeftIcon strokeWidth={4.5} size={hp(3.5)} color="#F5CA0D"></ChevronLeftIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setisFavorite(!isFavorite)} style={{padding: 3, backgroundColor: 'white', borderRadius: 9999, marginLeft: 10, alignItems: 'center', marginRight: 10}}>
            <HeartIcon size={hp(3.5)} strokeWidth={5} color={isFavorite ? "red" : "gray"}></HeartIcon>
        </TouchableOpacity>
    </View>

    {/* meal description */}

    {
        loading ? (<Loading size="large" />) : (
            <View style={{flex: 1, marginLeft: 15, marginTop: 20}}>
                {/* name and area */}
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: hp(3), color: 'black'}}>{meal?.strMeal}</Text>
                    <Text style={{fontSize: hp(2), fontWeight: '500'}}>{meal?.strArea}</Text>
                </View>

                {/* misk */}

                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                    <View style={{backgroundColor: '#F5CA0D', padding: 4, borderRadius: 999}}>
                        <View style={{height: hp(6), width: hp(6) ,marginBottom: 3 ,backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center'}}>
                            <ClockIcon size={hp(4)} strokeWidth={2.5} color="#40403F"></ClockIcon>
                        </View>
                        <View style={{alignItems: 'center', paddingBottom: 4}}>
                            <Text style={{fontWeight: 'bold', fontSize: hp(1.8)}}>35</Text>
                            <Text style={{fontWeight: 'bold', fontSize: hp(1.4)}}>Mins</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#F5CA0D', padding: 4, borderRadius: 999}}>
                        <View style={{height: hp(6), width: hp(6) ,marginBottom: 3 ,backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center'}}>
                            <UserIcon size={hp(4)} strokeWidth={2.5} color="#40403F"></UserIcon>
                        </View>
                        <View style={{alignItems: 'center', paddingBottom: 4}}>
                            <Text style={{fontWeight: 'bold', fontSize: hp(1.8)}}>03</Text>
                            <Text style={{fontWeight: 'bold', fontSize: hp(1.4)}}>Servings</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#F5CA0D', padding: 4, borderRadius: 999}}>
                        <View style={{height: hp(6), width: hp(6) ,marginBottom: 3 ,backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center'}}>
                            <FireIcon size={hp(4)} strokeWidth={2.5} color="#40403F"></FireIcon>
                        </View>
                        <View style={{alignItems: 'center', paddingBottom: 4}}>
                            <Text style={{fontWeight: 'bold', fontSize: hp(1.8)}}>103</Text>
                            <Text style={{fontWeight: 'bold', fontSize: hp(1.4)}}>Cal</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#F5CA0D', padding: 4, borderRadius: 999}}>
                        <View style={{height: hp(6), width: hp(6) ,marginBottom: 3 ,backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center'}}>
                            <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#40403F"></Square3Stack3DIcon>
                        </View>
                        <View style={{alignItems: 'center', paddingBottom: 4}}>
                            <Text style={{fontWeight: 'bold', fontSize: hp(1.8)}}>103</Text>
                            <Text style={{fontWeight: 'bold', fontSize: hp(1.4)}}>Easy</Text>
                        </View>
                    </View>
                </View>

                {/* ingredients */}

                <View style={{marginTop: 5, alignItems: 'flex-start'}}>
                    <Text style={{fontWeight: 'bold', color: 'black', fontSize: hp(2), marginBottom: 5}}>Ingredients</Text>
                    <View style={{alignItems: 'flex-start', marginLeft: 14}}>
                        {
                            getmealdata(meal).map(i => {
                                return (
                                    <View key={i} style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{backgroundColor: '#F5CA0D', width: hp(1), height: hp(1), borderRadius: 9999, marginRight: 10}} />
                                        <Text style={{fontWeight: 'bold', marginBottom: 2, color: '#2D2D2D'}}>{meal['strMeasure'+i]}</Text>
                                        <Text style={{marginBottom: 2, marginLeft: 5}}>{meal['strIngredient'+i]}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        ) 
    }
    </ScrollView>
  )
}