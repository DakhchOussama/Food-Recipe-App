import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView, Image, StyleSheet, TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState('beef');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getCategories();
        getRecipes();
    }, []);

    const handleselectcategorie = categorie => {
        getRecipes(categorie);
        setActiveCategory(categorie);
        setMeals([]);
    }

    const getCategories = async () => {
        try {
            const response = await fetch('https://themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
            if (data && data.categories) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log('error: ', error.message);
        }
    };

    const getRecipes = async (meal = "beef") => {
        try {
            const response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${meal}`);
            const data = await response.json();
            if (data && data.meals) {
                setMeals(data.meals);
            }
        } catch (error) {
            console.log('error: ', error.message);
        }
    };

    return (
        <View style={styles.home}>
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                style={styles.scroll}
            >
                {/* avatar */}
                <View style={styles.header}>
                    <Image source={require('../../img/profile.png')}
                        style={{ height: hp(5.5), width: hp(5.5), marginLeft: hp(0.7) }}
                    />
                    <BellIcon size={hp(4)} color="gray"></BellIcon>
                </View>
                {/* greeting */}
                <View style={styles.greeting}>
                    <Text style={styles.name}>
                        Hello, Oussama!
                    </Text>
                    <Text style={styles.term}>
                        Make your own food, stay at <Text style={styles.homeworld}>home</Text>
                    </Text>
                </View>
                {/* search bar */}
                <View style={styles.searchbar}>
                    <TextInput
                        placeholder="Search any recipe"
                        placeholderTextColor={'gray'}
                        style={styles.input}
                    />
                    <View style={styles.search}>
                        <MagnifyingGlassIcon size={hp(2.4)} strokeWidth={3} color="gray" />
                    </View>
                </View>
                {/* categories  */}
                <View>
                    {categories && <Categories categories={categories} activeCategory={activeCategory} handleSelectCategory={handleselectcategorie} />}
                </View>
                {/* recipes */}
                <View>
                    <Recipes meals={meals} categories={categories}></Recipes>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: 'white',
    },
    scroll: {
        marginTop: hp(1),
        paddingTop: hp(3)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
        marginRight: hp(1)
    },
    greeting: {
        marginLeft: hp(1)
    },
    name: {
        fontSize: hp(2),
        color: '#5B5B5B'
    },
    term: {
        fontWeight: '500',
        color: 'black',
        fontSize: hp(4.8)
    },
    homeworld: {
        color: '#FFD315'
    },
    searchbar: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        padding: hp(0.1),
        backgroundColor: '#E2E2DD',
        borderRadius: 9999,
        marginLeft: hp(1),
        marginRight: hp(1),
        marginTop: hp(2)
    },
    input: {
        fontSize: hp(1.5),
        flex: 1,
        marginLeft: hp(1)
    },
    search: {
        backgroundColor: '#F5F4F4',
        padding: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: hp(0.5),
        borderRadius: 9999,
        width: hp(6),
        height: hp(6),
        marginTop: hp(0.3)
    }
});
