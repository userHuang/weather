import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, PixelRatio } from 'react-native';
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from './util';

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

  fetchData () {
    console.log('===repsData====')
    const REQUEST_URL = `https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise&province=%E6%B1%9F%E8%8B%8F%E7%9C%81&city=%E5%8D%97%E4%BA%AC%E5%B8%82&county=&callback=jQuery1113027862026349638835_1564044459821&_=1564044459823`;
    fetch(REQUEST_URL)
      // .then(reps => reps.json())
      .then(repsData => {
        console.log(repsData.json(), '===repsData====')
      })
  }

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
        <View style={styles.view1} key={index}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.pageContainer}>
            <View style={styles.head}>
              <Text style={styles.areaName}>雨花台区</Text>
              <Text style={styles.weatherDes}>大部多云</Text>
              <Text style={styles.temperate}>35</Text>
            </View>
            <View style={styles.weatherDay}>
              <View style={styles.todayInfo}>
                <View style={styles.todayName}>
                  <Text style={styles.today}>星期五</Text>
                  <Text style={styles.today}>今天</Text>
                </View>
                <View style={styles.todayMaxMin}>
                  <Text style={styles.maxToMin}>37</Text>
                  <Text style={styles.maxToMin}>28</Text>
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
                <Text style={styles.descriptionText}>今日：晴间多云，热指数44。最高38。今日晚间局部多云，最低气温28。</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )
    })
    
    return (
      <View style={styles.wrapper}>
        <Swiper>
          {weatherAreaItem}
          <View style={styles.view2}>
            <Text>qqqqqqqqqqq</Text>
          </View>
        </Swiper>
      </View>
    )
  }
}

const windowSize = Dimensions.get('window');
const pixel = 2 / PixelRatio.get();
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  view1: {
    backgroundColor: '#03A9F4',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageContainer: {
    position: 'absolute',
    width: windowSize.width,
    left:0,
    top: 0,
    height: windowSize.height
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
    height: 400
  },
  weekend: {
    height: 280,
    paddingLeft: 20,
    paddingRight: 20
  },
  itemDay: {
    height: 40,
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

  view2: {
    backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },


  ml10: {
    marginLeft: 20
  },
  mr20: {
    marginRight: 20
  },
  withinDayHoursIcon: {
    textAlign:"center",
    paddingTop:5
  }
})