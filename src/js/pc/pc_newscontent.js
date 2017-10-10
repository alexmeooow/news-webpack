import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import fetchJsonp from "fetch-jsonp";
import {Row, Col, Menu, Icon, Carousel, Tabs, Button} from "antd";
var TabPane = Tabs.TabPane;

import PCCarousel from "./pc_carousel.js";
import PCNewsList from "./pc_newslist.js";
import PCNewsChange from "./pc_newschange.js";
import PCHotNews24 from "./pc_newshot24.js";
import PCHotVideo from "./pc_hotvideo.js";
import PCBrilliantPicture from "./pc_brilliantpicture.js";
import PCContentSearch from "./pc_contentsearch.js";



export default class PCNewsContent extends React.Component{
    constructor(){
        super();
        this.state = {
            current:"__all__",
            navData:[
                {navTitle:"要闻"},
                {navTitle:"社会"},
                {navTitle:"娱乐"},
                {navTitle:"体育"},
                {navTitle:"军事"},
                {navTitle:"明星"}
            ],
            newsListData:[],
            newsDataChange:[],
            position:"",
            top:"",
            data:[]

        }
        // 备用
        this.scrollTop = 0;
        // 绑定窗口滚动事件
        this.handleScroll = this.handleScroll.bind(this)
    }
    componentWillMount(){

        var url = "http://www.toutiao.com/api/pc/feed/?min_behot_time=0&category=__all__"
        var that = this;
        fetchJsonp(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
                that.setState({
                newsListData:json.data
                })
        }).catch(function(ex) {
        })
        // 滚动事件
        window.addEventListener('scroll', this.handleScroll);

    }
    // ant组件自带方法 点击获取key
    handleClick(e){
        // console.log('click ', e);
        //子组件没做到实时刷新数据,放到父组件来,父组件点击一次就传递一次数据
        //获取到导航的key
        this.setState(
            {current:e.key},
            () => {this._fetch(this.state.current)}
        )
    }
    //获取跨域数据方法,再小封装复用
    _fetch(current){
        var url = "http://www.toutiao.com/api/pc/feed/?min_behot_time=0&category="+current
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
                newsListData:json.data
                })
            // console.log(that.state.newsListData);
        }).catch(function(ex) {
            // console.log('parsing failed', ex)
        })
    }
    //左侧导航绝对定位在左侧
    handleScroll(e){
        // console.log(e.path[1].pageYOffset);
        //获取到页面滚动的值
        // console.log(window.pageYOffset);
        //当页面滚动到
        // console.log(window.pageYOffset)
        //当页面滚动到大于34的时候,左侧导航变成固定定位
        //方法一:用三目运算来判断
         window.pageYOffset >= 34
         ?this.setState({
         position:"fixed",
         top:"0px"
         })
         :this.setState({
         position:"",
         top:""
         })

        // 方法二用if...else...来判断
        // if(window.pageYOffset >= 34){
        //
        //     this.setState({
        //         position:"fixed",
        //         top:"0px"
        //     })
        // }else if(window.pageYOffset < 34){
        //   this.setState({
        //       position:"",
        //       top:"",
        //   })
        // }
    }
    render(){
        var asideNav = {
            // height:"120px",
            textAlign:"center",
            marginRight:"40px",
            position:this.state.position,
            top:this.state.top,
            // overflow:"hidden",


            // textAlign:"center"
        }
        var navFontSize = {
            fontSize:24
        }
        var width120 = {
            width:"140px",
            textAlign:"center"
        }
        var newsContent = {

        }

        // console.log(this.state.newsListData)
        return (
            <div style={{paddingTop:"20px"}} ref="news_content_wrap">
                <Row>
                    <Col span={2}></Col>
                    {/* 左侧导航和新闻列表 */}
                    <Col span={2}>
                        {/* 左边导航 */}
                        <div style={asideNav}>
                            <div>
                                <img className="pc-news-logo-size" src="./src/images/logo-news.png"/>
                            </div>
                            <div style={{marginLeft:"auto",marginRight:"auto"}}>
                                <Menu
                                    onClick={this.handleClick.bind(this)}
                                    selectedKeys={[this.state.current]}
                                    mode="vertical"
                                    className = "pc-nav"

                                >
                                    <Menu.Item style={width120} key="__all__">推荐</Menu.Item>
                                    <Menu.Item style={width120} key="news_hot">热点</Menu.Item>
                                    <Menu.Item style={width120} key="news_tech">科技</Menu.Item>
                                    <Menu.Item style={width120} key="news_society">社会</Menu.Item>
                                    <Menu.Item style={width120} key="news_entertainment">娱乐</Menu.Item>
                                    <Menu.Item style={width120} key="news_game">游戏</Menu.Item>
                                    <Menu.Item style={width120} key="news_sports">体育</Menu.Item>
                                    <Menu.Item style={width120} key="news_car">汽车</Menu.Item>
                                    <Menu.Item style={width120} key="news_finance">财经</Menu.Item>
                                    <Menu.Item style={width120} key="funny">搞笑</Menu.Item>
                                </Menu>
                            </div>
                        </div>
                    </Col>
                    <Col span={11}>
                        <div className="aside-margintop">
                            {/* 中间新闻块 */}
                            <div style={{flex:1,marginLeft:"40px",marginRight:"auto"}}>
                                {/* 顶部轮播图 */}
                                <PCCarousel navData={this.state.navData} />
                                {/* 新闻列表 */}
                                <PCNewsList
                                    newsListData={this.state.newsListData}
                                />
                            </div>
                        </div>
                    </Col>
                    {/* 右侧 */}
                    <Col span={7}>

                        {/* 广告 */}
                        {/* <div className = "pc-ad"></div> */}
                        {/* 24小时热文 */}
                        <div>
                            <PCContentSearch />
                        </div>
                        <div className = "pc-hot-news-24">
                            <PCHotNews24 />
                        </div>
                        {/* 热门视频 */}
                        <div>
                            <PCHotVideo />
                        </div>
                        <div>
                            <PCBrilliantPicture _fetch_={this._fetch_.bind(this)} data={this.state.data}/>
                        </div>
                        {/* 换一换 */}
                        {/* <PCNewsChange /> */}
                    </Col>
                    <Col span={2}>
                    </Col>
                </Row>
            </div>

        );
    }
    _fetch_(url){
        var url = url
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
