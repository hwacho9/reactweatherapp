import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const { width:SCREEN_WIDTH} = Dimensions.get("window");
//kwno screen width size

const API_KEY = "d437a794b2b3ea71301453062adb4a81"

const icons = { 
  Clouds : "cloudy",
  Rain : "rainy-outline",
  Clear : "ios-sunny-outline"
}
// console.log(SCREEN_WIDTH)
export default function App() {
  const [city, setCity] = useState("loading,,,")
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const permission = await Location.requestForegroundPermissionsAsync(); // request location permission
    // console.log(permission)
    
    if (!permission.granted ) { // granted 가 아니라면 
      setOk(false);
    } 

    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    // reverseGEocode 위도와 경도를 주소로 변환해줌
    setCity(location[0].city)
    const response =  await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    const json = await response.json()
    // console.log(location)

    // console.log(json)
    setDays(json.list.filter((weather)=> {
      if(weather.dt_txt.includes("09:00:00")) {
        return  weather;
      }
    }))
  }

  
  useEffect(()=>{
    getWeather();
  }, [])
  // console.log(days[3])
  console.log(days[0])
  
  return ( 
      <View style={styles.container}>
        <StatusBar style='light'/>
        {/* <View>
          {ok === false ? (
            <Text></Text>
          ) : () }
        </View> */}
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView pagingEnabled showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.weather}>
        
          {days.length === 0 ? ( <View style={styles.day}>
            <ActivityIndicator color="white" size="large" style={{marginTop:10}} />
          </View>) : (
            days.map((day, index) =>
            <View key={index} style={styles.day}> 
              <Text stlye>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
              <View style={{ flexDirection:'row', alignItems:'center', justifyContent:"center", width:"100%"}}>
                <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
                <Ionicons name={icons[day.weather[0].main]} size={50} color="white" /> 
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.description2}>{day.weather[0].description}</Text>
            </View>)
          )}
          
          
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
    fontWeight:"500",
    color:"white"
  },
  weather:{
  },
  day:{
    width:SCREEN_WIDTH,
    alignItems:"center",
  },
  temp:{
    marginTop:50,
    fontSize:120,
    color:"white",
    marginRight:30
  },
  description:{
    marginTop:-30,
    fontSize:50, 
    color:"white" 
  },
  description2:{
    fontSize:20,
    color:"white"
  },
  date:{
    fontSize:100
  }
});
