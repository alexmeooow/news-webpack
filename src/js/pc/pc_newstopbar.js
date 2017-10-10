import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import fetchJsonp from "fetch-jsonp";

import {Row, Col, Menu, Icon, Carousel, Tabs, Button} from "antd";
var TabPane = Tabs.TabPane;



import PCWeatherBox from "./pc_weatherbox.js";
import PCWeatherDataTest from "./pc_weatherdata.js";

export default class PCNewsTopBar extends React.Component{
    constructor (){
        super();
        this.state = {
            display:"none",
            weatherData:[],
            cityName:"",
            windDirection:"",
            windLevel:"",
            qualityLevel:"",
            aqi:"",
            highTemperature:"",
            lowTemperature:"",
            tomorrowHighTemperature:"",
            tomorrowLowTemperature:"",
            datHighTemperature:"",
            datLowTemperature:"",
            weatherIconId:"",
            datWeatherIconId:"",
            tomorrowWeatherIconId:"",
            currentCondition:""

        }
    }
    componentWillMount(){
        var url = "http://www.toutiao.com/stream/widget/local_weather/data/?city=厦门"
        var that = this;
        fetchJsonp(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            // console.log('parsed json', json)
            // console.log(json.data);
                that.setState({
                weatherData:json.data,
                cityName:json.data.weather.city_name,
                windDirection:json.data.weather.wind_direction,
                windLevel:json.data.weather.wind_level,
                qualityLevel:json.data.weather.quality_level,
                aqi:json.data.weather.aqi,
                highTemperature:json.data.weather.high_temperature,
                lowTemperature:json.data.weather.low_temperature,
                tomorrowHighTemperature:json.data.weather.tomorrow_high_temperature,
                tomorrowLowTemperature:json.data.weather.tomorrow_low_temperature,
                datHighTemperature:json.data.weather.dat_high_temperature,
                datLowTemperature:json.data.weather.dat_low_temperature,
                weatherIconId:json.data.weather.weather_icon_id,
                datWeatherIconId:json.data.weather.dat_weather_icon_id,
                tomorrowWeatherIconId:json.data.weather.tomorrow_weather_icon_id,
                currentCondition:json.data.weather.current_condition
                })
            // console.log(that.state.city_name);
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })

    }
    render(){
        var topstyles={
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft:0,
            fontSize:14
        }
        var red = {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor:"orange",
            marginLeft:0
        }
        var weatherStyle = {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft:0,
            fontSize:14,
            cursor:"pointer",
            position:"relative"

        }
        var weatherBarStyle=({
            height:34,
            alignItems:"center",
            display: 'flex',
            flexDirection:"row"

            // verticalAlign:"middle"

        })

        return (
            // 最外层

            <div>
                <Row className="top-bar">
                    <Col className="top-34 border-right-2" style={topstyles} span={1}>
                            <div>下载App</div>
                    </Col>
                    <Col className="top-34" style={weatherStyle} span={2}>
                        <div
                            onMouseOver = {this.mouseOver.bind(this)}
                            // onMouseLeave = {this.mouseLeave.bind(this)}
                            style={weatherBarStyle}
                        >
                            <div style={{marginRight:6}}>{this.state.cityName}</div>
                            <div style={{marginRight:6}}>{this.state.currentCondition}</div>
                            <div>{this.state.lowTemperature}°&nbsp;/&nbsp;&nbsp;{this.state.highTemperature}</div>
                        </div>
                        <div>
                            <PCWeatherBox {...this.state} wDisplay={this.state.display} mouseLeave={this.mouseLeave.bind(this)}/>
                            {/* <PCWeatherDataTest weatherData = {this.state.weatherData.weather} wDisplay={this.state.display}/> */}
                        </div>

                     </Col>
                    <Col className="top-34" style={topstyles} span={16}></Col>
                    <Col className="top-34" style={topstyles} span={1}></Col>
                    <Col className="top-34" style={red} span={1}>登录</Col>
                    <Col className="top-34" style={topstyles} span={1}>反馈</Col>
                    <Col className="top-34" style={topstyles} span={1}>侵权投诉</Col>
                    <Col className="top-34" style={topstyles} span={1}>头条产品</Col>
                </Row>
            </div>

        );
    }
    mouseOver(){
        console.log("鼠标移到天气模块上");
        this.setState({
            display:"block"
        })
    }
    mouseLeave(){
        console.log("鼠标离开天气模块");
        this.setState({
            display:"none"
        })
    }
}
