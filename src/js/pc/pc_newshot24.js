import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import fetchJsonp from "fetch-jsonp";
import {Row, Col, Menu, Icon, Carousel, Tabs, Button} from "antd";
var TabPane = Tabs.TabPane;

export default class PCHotNews24 extends React.Component{
    constructor(){
        super();
        this.state = {
            realtimeNewsUrl:"http://www.toutiao.com/api/pc/realtime_news/",
            data:[],
            realtimeNewsData:[]
        }
    }
    componentWillMount(){
        this._fetch(this.state.realtimeNewsUrl);
        // console.log(this._fetch(this.state.realtimeNewsUrl))

    }
    render(){
        // console.log(this.state.data)
        var realtimeNewsData = this.state.data.map(function(value,index){
            var imgSrc = "http:"+value.image_url;
            var realTimeList = {
                display:"flex",
                flexDirection:"row",
                marginTop:"10px",
                // marginBottom:"10px",
                paddingBottom:"10px",
                borderBottom:"1px solid #e8e8e8"
            }
            var imgStyle = {
                width:"80px",
                height:"80px"
            }
            var titleStyle = {
                fontSize:"14px",
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                paddingLeft:"10px",
                flex:1
            }
            return(
               <div key={index} style = {realTimeList}>
                  <img src={imgSrc} style={imgStyle} className="img-100-100"/>
                  <div style={titleStyle}>
                      {value.title}
                  </div>
               </div>
            )
        })
        var realTimeWrap = {
            padding:"20px",
            width:"80%",
            marginTop:"0",
            marginBottom:"20px",
            backgroundColor:"#f4f5f6",
            borderTop:"4px solid orange"
        }
        return(
            <div style={realTimeWrap}>
                <div>
                    <h2>24小时热闻</h2>
                </div>
                {realtimeNewsData}
            </div>
        )

    }
    _fetch(url){
        var url = url
        // "&utm_source=toutiao&widen=1&tadrequire=true&as=A1F599ADD2E32A5&cp=59D25352BA258E1"
        //es6语法的时候不需要把this赋值给that
        var that = this;
        fetchJsonp(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            // console.log('parsed json', json)
            // console.log(json.data);
              that.setState({
                data:json.data
              })
            // console.log(that.state.data);
        }).catch(function(ex) {
            // console.log('parsing failed', ex)
        })
    }
}

// var userIcon = value.media_avatar_url?<img src = {userIconUrl} style = {{width:"20px",height:"20px",borderRadius:"20px",marginRight:"10px"}}/>
// :<div style={{width:"20px",height:"20px",backgroundColor:"#56b6c2",color:"white",borderRadius:"20px",textAlign:"center"}}>
//
// </div>;
