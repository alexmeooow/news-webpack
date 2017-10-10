import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import fetchJsonp from "fetch-jsonp";
import {Row, Col, Menu, Icon, Carousel, Tabs, Button} from "antd";
var TabPane = Tabs.TabPane;

//天气小盒子,鼠标悬浮时出现,鼠标离开时隐藏
export default class PCWeatherBox extends React.Component{
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

        // var weatherData = this.state.weatherData;
        // console.log(this.props.cityName+"111");
        // for( var key in weatherData ){
        //     var cityName = ""
        //     if( key == "city_name"){
        //         cityName = weatherData["aqi"];
        //         console.log(cityName)
        //     }
        // }

        //天气盒子显示消失标志
        var weatherBoxStyle = ({
            padding: "4px",
            color: "#444",
            width: "220px",
            height: "124px",
            zIndex: 30,
            background: "#fff",
            border: "1px solid #e8e8e8",
            boxSizing: "content-box",
            position: "absolute",
            left:"0",
            display:this.props.wDisplay
        })
        var weatherBoxIn = ({
            display:"flex",
            flexDirection:"column",
            width: "220px",
            height: "124px"
        })
        var weatherUp = ({
            flex:1,
            display:"flex",
            flexDirection:"row",
            paddingLeft:10,
            fontSize:12,
            alignItems:"center"
        })
        var weatherBottom = ({
            height:"80%",
            backgroundColor:"white",
            display:"flex",
            flexDirection:"row"

        })
        var qualityLevelStyle = {
            marginRight:10,
            backgroundColor:"#76bc5c",
            borderRadius:4,
            color:"white",
            paddingLeft:4,
            paddingRight:4
        }
        var weatherIconStyle = {
            flex:1,
            display:"flex",
            textAlign:"center",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"space-around",
            paddingLeft:"auto",
            paddingRight:"auto"
        }
        //天气图标编号样式
        var weatherIconId = "weather-icon-"+this.props.weatherIconId;
        var tomorrowWeatherIconId = "weather-icon-"+this.props.tomorrowWeatherIconId;
        var datWeatherIconId = "weather-icon-"+this.props.datWeatherIconId;

        var weatherDetail =
            <div style={weatherBoxStyle}>
                <div style={weatherBoxIn}>
                    {/* 上 */}
                    <div style={weatherUp}>
                        <div style={{marginRight:10}}>{this.props.cityName} </div>
                        <div style={{marginRight:10}}>{this.props.windDirection}{this.props.windLevel}级 </div>
                        <div style={qualityLevelStyle}>{this.props.qualityLevel}{this.props.aqi} </div>
                    </div>
                    {/* 下 */}
                    <div style={weatherBottom}>
                        <div style={weatherIconStyle}>
                            <div>今天</div>
                            <div className={weatherIconId}>
                                <div className="weather-icon"></div>
                            </div>
                            <div>{this.props.lowTemperature}°&nbsp;/&nbsp;&nbsp;{this.props.highTemperature}°</div>
                        </div>
                        <div style={weatherIconStyle}>
                            <div>明天</div>
                            <div className={tomorrowWeatherIconId}>
                                <div className="weather-icon"></div>
                            </div>
                            <div>{this.props.tomorrowLowTemperature}°&nbsp;/&nbsp;&nbsp;{this.props.tomorrowHighTemperature}°</div>
                        </div>
                        <div style={weatherIconStyle}>
                            <div>后天</div>
                            <div className={datWeatherIconId}>
                                <div className="weather-icon"></div>
                            </div>
                            <div>{this.props.datLowTemperature}°&nbsp;/&nbsp;&nbsp;{this.props.datHighTemperature}°</div>
                        </div>
                    </div>

                </div>

            </div>




        return(
            <div onMouseLeave = {this.props.mouseLeave}>{weatherDetail}</div>
        )
    }

}
