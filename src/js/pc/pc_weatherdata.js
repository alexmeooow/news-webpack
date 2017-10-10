import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import fetchJsonp from "fetch-jsonp";
import {Row, Col, Menu, Icon, Carousel, Tabs, Button} from "antd";
var TabPane = Tabs.TabPane;

//天气小盒子,鼠标悬浮时出现,鼠标离开时隐藏
export default class PCWeatherDataTest extends React.Component{
    constructor(){
        super();
        this.state = {
            weatherData:[]
        }
    }
    componentWillMount(){
        var url = "http://www.toutiao.com/stream/widget/local_weather/data/?city=厦门"
        // &utm_source=toutiao&widen=1&tadrequire=true&as=A1F599ADD2E32A5&cp=59D25352BA258E1&count=20";
        var that = this;
        fetchJsonp(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            // console.log('parsed json', json)
            // console.log(json.data);
                that.setState({
                weatherData:json.data
                })
            // console.log(that.state.weatherData);
        }).catch(function(ex) {
            // console.log('parsing failed', ex)
        })
    }
    render(){

        var weatherData = this.state.weatherData;
        console.log(weatherData);
        // console.log(weatherData.aqi);


        // for( var key in weatherData ){
          // key=="city_name"?this.setState({cityName:weatherData[key]}):"";
        //   var cityName = ""
        //   if( key == "city_name"){
        //       cityName = weatherData["aqi"];
        //       console.log(cityName)
        //   }
        //
        // }

        return(
            <div></div>
        )
    }
}
