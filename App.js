import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width:SCREEN_WIDTH} = Dimensions.get("window");
//kwno screen width size

// console.log(SCREEN_WIDTH)
export default function App() {
  const [city, setCity] = useState("loading,,,")
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const permission = await Location.requestForegroundPermissionsAsync(); // request location permission
    console.log(permission)
    
    if (!permission.granted) { // granted 가 아니라면 
      setOk(false);
    } 

    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    setCity(location[0].city)
    console.log(location)
  }

  useEffect(()=>{
    getWeather();
  }, [])

  return ( 
      <View style={styles.container}>
        <StatusBar style='light'/>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView pagingEnabled showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}> 
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, backgroundColor:"tomato"
  },
  city:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  cityName:{
    fontSize:68,
    fontWeight:"500"

  },
  weather:{
  },
  day:{
    width:SCREEN_WIDTH,
    alignItems:"center",
  },
  temp:{
    marginTop:50,
    fontSize:178,
  },
  description:{
    marginTop:-30,
    fontSize:60,  
  },
});
