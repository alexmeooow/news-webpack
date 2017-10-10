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
            hotVideoUrl:"http://www.toutiao.com/api/pc/hot_gallery/?widen=1",
            data:[]
        }
    }
    componentWillMount(){
      // this.props._fetch_(this.state.hotVideoUrl);

        this._fetch(this.state.hotVideoUrl);
        // console.log(this._fetch(this.state.realtimeNewsUrl))

    }
    render(){
        // console.log(this.state.data)
        var hotVideo = this.state.data.map(function(value,index){
            var imgSrc = "http:"+value.cover_image_url;
            var realTimeList = {
                width:"48%",
                display:"flex",
                flexDirection:"column",
                marginTop:"10px",
                // marginBottom:"10px",
                paddingBottom:"10px"
            }
            var imgStyle = {
                width:"100%"
            }
            var videoBoxStyle = {
                position:"relative",

            }
            var videoDuration = {
                width:40,
                height:20,
                fontSize:"10px",
                color:"white",
                backgroundColor:"rgba(0,0,0,.4)",
                borderRadius:"20px",
                position:"absolute",
                bottom:"10px",
                right:"5px",
                justifyContent:"space-around",
                display:"flex",
                alignItems:"center"
            }
            var pictureTitleStyle = {

              // whiteSpace:"nowrap",
              // overflow:"hidden",
              // textOverflow:"ellipsis",
              // display: -webkit-box;
              // -webkit-line-clamp: 2;
              // -webkit-box-orient: vertical;

            }
            return(
               <div key={index} style = {realTimeList}>
                  <div >
                      <div style={videoBoxStyle}>
                          <img src={imgSrc} style={imgStyle}/>
                          <div style={videoDuration}>{value.gallery_image_count}图</div>
                      </div>
                      <div className="pc-picture-title">{value.title}</div>
                  </div>
               </div>
            )
        })
        var realTimeWrap = {
            padding:"20px",
            width:"80%",
            marginBottom:"20px",
            backgroundColor:"#f4f5f6",
            borderTop:"4px solid orange",

        }
        var imgListStyle = {
            display:"flex",
            flexDirection:"row",
            flexWrap:"wrap",
            justifyContent:"space-between"

        }
        return(
            <div style={realTimeWrap}>
                <div>
                    <h2>精彩图片</h2>
                </div>
                <div style={imgListStyle}>
                    {hotVideo}
                </div>
            </div>
        )
    }
    _fetch(url){
        var url = url
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
            console.log(that.state.data);
        }).catch(function(ex) {
            // console.log('parsing failed', ex)
        })
    }
}
