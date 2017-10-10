import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import fetchJsonp from "fetch-jsonp";


import {Row, Col, Menu, Icon, Carousel, Tabs, Button} from "antd";
var TabPane = Tabs.TabPane;



export default class PCCarousel extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[],
            index:0,
            current:0
        }
    }
    componentWillMount(){
        // 获取轮播图数据focus
        var url = "http://www.toutiao.com/api/pc/focus/";
        var that = this;
        fetchJsonp(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            // console.log('parsed json', json)
            // console.log(json.data.pc_feed_focus)
            that.setState({
                data:json.data.pc_feed_focus
            })
            // console.log(that.state.data);
        }).catch(function(ex) {
            // console.log('parsing failed', ex)
        })
    }
    _onChange(from,to){
        this.setState({
            current:to
        })
    }
    render(){
        var data = this.state.data;
        // console.log(data);
        var imgData = data.slice(0,6);
        // console.log(imgData);
        var imgSize = {
            width:600,
            height:300
        }
        var nowrap = {
            whiteSpace:"nowrap",
            overflow:"hidden",
            textOverflow:"ellipsis",
            textAlign:"left"
        }
        // 轮播图组件
        var content = imgData.map(function(value,index){
            var imgSrc = "http:" + value.image_url;
            var imgUrl = "http://www.toutiao.com" + value.display_url;
            // console.log(imgUrl)
            return (
                <div key={index}>
                    <div><a href={imgUrl} target="_blank"><img style={imgSize} src={imgSrc} /></a></div>
                    <h3 style={nowrap}>{value.title}</h3>
                </div>
            )
        })
        // 轮播图组件边上导航
        var carouselNavData = this.props.navData;
        // console.log(carouselNavData);
        var that = this;
        var carouselNav = carouselNavData.map(function(value,index){
            var liStyle={
                // width:"60px",
                fontSize:"16px",
                textAlign:"center",
                lineHeight:"50px",
                color:"white",
                cursor:"pointer",
                backgroundColor:index==that.state.current? "orange":"black"

            }
            return (
                <li key={index} style={liStyle}>
                    {value.navTitle}
                </li>
            )
        })
        return (
            <div>
                <div className="carousel-wrap">
                    <Carousel autoplay beforeChange={this._onChange.bind(this)}>
                        {content}
                    </Carousel>
                    <ul className="carousel-nav">
                        {carouselNav}
                    </ul>
                </div>

            </div>
        );
    }
}
