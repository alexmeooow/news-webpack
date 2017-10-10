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
            hotVideoUrl:"http://www.toutiao.com/api/pc/hot_video/?widen=1",
            data:[],
            realtimeNewsData:[]
        }
    }
    componentWillMount(){
        this._fetch(this.state.hotVideoUrl);
        console.log(this.state.data)
        // console.log(this._fetch(this.state.realtimeNewsUrl))

    }
    render(){
        // console.log(this.state.data)
        var hotVideo = this.state.data.map(function(value,index){
            var imgSrc = "http:"+value.pc_image_url;
            var realTimeList = {
                display:"flex",
                flexDirection:"row",
                marginTop:"10px",
                // marginBottom:"10px",
                paddingBottom:"10px",
                borderBottom:"1px solid #e8e8e8"
            }
            var imgStyle = {
                width:"118px",
                height:"68px"
            }
            var titleStyle = {
                flex:1,
                fontSize:"14px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between",
                overflow:"hidden",
                textOverflow:"ellipsis"
            }
            var countStyle = {
                // width:"100%",
                display:"flex",
                flexDirection:"row",
                justifyContent:"flex-start",
                alignItems:"flex-end",
                textAlign:"left",
                flex:1,
                fontSize:"12px",
                color:"#999"
            }
            var videoBoxStyle = {
                marginLeft:"10px",
                position:"relative",

            }
            var videoDuration = {
                width:50,
                height:20,
                fontSize:"10px",
                color:"white",
                backgroundColor:"rgba(0,0,0,.6)",
                borderRadius:"20px",
                position:"absolute",
                bottom:"10px",
                right:"5px",
                justifyContent:"space-around",
                display:"flex",
                alignItems:"center"
            }
            //判断播放次数显示格式
            var videoPlayCount = value.video_play_count <= 10000? value.video_play_count
            : value.video_play_count >= 10000 && value.video_play_count <= 100000 ? parseInt(value.video_play_count/10000)+"万次"
            : value.video_play_count >= 100000 && value.video_play_count <= 1000000 ? parseInt(value.video_play_count/100000)+"0万次"
            : value.video_play_count >= 1000000 && value.video_play_count <= 10000000 ? parseInt(value.video_play_count/1000000)+"00万次"
            : "一千万次以上"
            return(
               <div key={index} style = {realTimeList}>
                   <div style={titleStyle}>
                       <div>{value.title}</div>
                       <div style={countStyle}>
                          <div>{videoPlayCount}播放 · {value.comment_count}评论</div>
                       </div>
                   </div>
                   <div style={videoBoxStyle}>
                       <img src={imgSrc} style={imgStyle}/>
                       <div style={videoDuration}> ▶{value.video_duration_format}</div>
                   </div>


               </div>
            )
        })
        var realTimeWrap = {
            padding:"20px",
            width:"80%",
            marginBottom:"20px",
            backgroundColor:"#f4f5f6",
            borderTop:"4px solid orange"
        }
        return(
            <div style={realTimeWrap}>
                <div>
                    <h2>热门视频</h2>
                </div>
                {hotVideo}
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
