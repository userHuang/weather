import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, PixelRatio, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from './util';

const windowSize = Dimensions.get('window');
const pixel = 2 / PixelRatio.get();

export default class Weather extends Component {
  constructor (props) {
    super(props)
    this.state = {
      weatherData: Util.weatherData
    }
  }

  // componentDidMount () {
  //   this.fetchData()
  // }

  // fetchData () {
  //   const REQUEST_URL = `https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise&province=%E6%B1%9F%E8%8B%8F%E7%9C%81&city=%E5%8D%97%E4%BA%AC%E5%B8%82&county=&callback=jQuery1113027862026349638835_1564044459821&_=1564044459823`;
  //   fetch(REQUEST_URL)
  //     .then(reps => reps.json())
  //     .then(repsData => {
  //       console.log(repsData.json(), '===repsData====')
  //     })
  // }

  render () {
    const weatherData = this.state.weatherData;
    const weatherAreaItem = weatherData.map((item, index) => {
      const hourItem = item.weather_24.map((hour, hourIndex) => {
        return (
          <View style={styles.hourTempItem} key={hourIndex}>
            <Text style={styles.hourTempItemText}>{hour.time}</Text>
            <Icon name={hour.icon} size={25} style={[styles.withinDayHoursIcon,{color:hour.color}]}></Icon>
            <Text style={styles.hourTempItemText}>{hour.degree}</Text>
          </View>
        )
      })

      const dayItem = item.weather_week.map((day, dayIndex) => {
        return (
          <View style={styles.itemDay} key={dayIndex}>
            <Text style={styles.colorFFF}>{day.time}</Text>
            <Icon name={day.icon} size={25} style={[styles.withinDayHoursIcon,{color:day.color}]}></Icon>
            <View style={styles.itemMaxMin}>
              <Text style={[styles.colorFFF, styles.mr20]}>{day.max}</Text>
              <Text style={styles.colorFFF}>{day.min}</Text>
            </View>
          </View>
        )
      })

      return (
        <View style={styles.weatherAreaView} key={index}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.pageContainer}>
            <View style={styles.head}>
              <Text style={styles.areaName}>{item.areaName}</Text>
              <Text style={styles.weatherDes}>{item.nowWeather}</Text>
              <Text style={styles.temperate}>{item.nowDegree}</Text>
            </View>
            <View style={styles.weatherDay}>
              <View style={styles.todayInfo}>
                <View style={styles.todayName}>
                  <Text style={styles.today}>{item.nowWeek}</Text>
                  <Text style={styles.today}>{item.nowDay}</Text>
                </View>
                <View style={styles.todayMaxMin}>
                  <Text style={styles.maxToMin}>{item.nowMax}</Text>
                  <Text style={styles.maxToMin}>{item.nowMin}</Text>
                </View>
              </View>
              <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.weatherDayScroll}>
                  {hourItem}
                </ScrollView>
              </View>
            </View>
            <View style={styles.weatherWeek}>
              <View style={styles.weekend}>
                {dayItem}
              </View>
              <View style={[styles.description, styles.weatherDayScroll]}>
                <Text style={styles.descriptionText}>{item.weatherDescrption}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )
    })
    
    return (
      <View style={styles.wrapper}>
        <Swiper paginationStyle={{bottom:10, paddingTop:10, borderTopColor:"rgba(255,255,255,0.7)"}}>
          {weatherAreaItem}
        </Swiper>
        <TouchableHighlight style={styles.backBtn}>
          <Icon size={17} name="ios-list-box" style={styles.backBtnIcon}></Icon>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  weatherAreaView: {
    backgroundColor: '#03A9F4',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageContainer: {
    position: 'absolute',
    width: windowSize.width,
    left: 0,
    top: 0,
    height: windowSize.height - 60
  },
  head: {
    height: 300,
    width: '100%',
    color: '#FFF'
  },
  areaName: {
    fontSize: 40,
    marginTop: 40,
    textAlign: 'center',
    color: '#FFF'
  },
  weatherDes: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FFF'
  },
  temperate: {
    fontSize: 80,
    textAlign: 'center',
    color: '#FFF'
  },

  weatherDay: {
    height: 160,
  },
  todayInfo: {
    height: 40,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  todayName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  todayMaxMin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  today: {
    color: '#FFF',
    fontSize: 20,
    marginLeft: 20
  },
  maxToMin: {
    color: '#FFF',
    fontSize: 20,
    marginRight: 20
  },
  weatherDayScroll: {
    borderTopColor:"rgba(255,255,255,0.7)",
    borderTopWidth: pixel,
    borderBottomColor:"rgba(255,255,255,0.7)",
    borderBottomWidth: pixel
  },
  hourTempItem: {
    width: 60,
    height: 120
  },
  hourTempItemText: {
    fontSize: 18,
    color: '#FFF',
    height: 40,
    lineHeight: 40,
    textAlign: 'center'
  },

  weatherWeek: {
    height: 360
  },
  weekend: {
    height: 280,
    paddingLeft: 20,
    paddingRight: 20
  },
  itemDay: {
    height: 36,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemMaxMin: {
    flexDirection: 'row',
  },
  colorFFF: {
    color: '#FFF',
    fontSize: 20
  },

  description: {
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },

  descriptionText: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    color: '#FFF'
  },

  backBtn:{
    position: 'absolute', 
    right: 20,
    bottom: 7
  },
  backBtnIcon:{
    color: '#fff'
  },

  ml10: {
    marginLeft: 20
  },
  mr20: {
    marginRight: 20
  },
  withinDayHoursIcon: {
    textAlign: 'center',
    lineHeight: 40
  }
})