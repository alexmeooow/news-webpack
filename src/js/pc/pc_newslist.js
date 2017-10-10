import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import fetchJsonp from "fetch-jsonp";


import {Row, Col, Menu, Icon, Carousel, Tabs, Button} from "antd";
var TabPane = Tabs.TabPane;



export default class PCNewsList extends React.Component{
    constructor(){
        super();
        this.state = {
            // newsListData:[]
        }
    }
    render (){
        //父组件传递过来的数据
        var newsData = this.props.newsListData;
        // console.log("111"+newsData);
        var newList = newsData.map(function(value,index){
            var listWrapStyle = {
                display:"flex",
                paddingTop:"10px",
                paddingBottom:"10px",
                flexDirection:"row",
                borderBottom:"1px"
            }
            var listImgStyle = {
                height:"120px",
                marginLeft:"0px",
                marginRight:"20px"
            }
            //标题下面部分
            var chineseTagStyle = {
                width:"40px",
                height:"20px",
                // lineHeight:"20px",
                color:"#56b6c2",
                border:"1px solid #56b6c2",
                textAlign:"center",
                marginRight:"10px"
                // marginBottom:"10px"
            }
            var detailWrap = {
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                marginTop:"10px",
                marginBottom:"10px"
            }
            // var userIcon = value.media_avatar_url?"http:"+value.media_avatar_url:"http:"+value.image_list[0]?"http:"+value.image_list[0]:"http:"+value.image_url;
            //头像图片
            var iconUrl = value.media_avatar_url;
            // ?value.media_avatar_url:value.image_list[0]?value.image_list[0]:value.image_url;
            //
            //头像图片地址
            var userIcon = "http:"+iconUrl;
            //没有头像的时候截取source字符串的第一个字符
            var strIcon = value.source.substr(0,1);
            var strIconStyle = {
                width:"20px",
                height:"20px",
                backgroundColor:"#56b6c2",
                color:"white",
                borderRadius:"20px",
                // // marginRight:"10px",
                // display:"flex",
                // flexDirection:"row",
                // alignItems:"center",
                textAlign:"center",
                lineHeight:"20px"
            }
            //用户头像判断

            var userHeaderIcon = iconUrl
            ?<img src = {userIcon} style = {{width:"20px",height:"20px",borderRadius:"20px",marginRight:"10px"}}/>
            :<div style={strIconStyle}>
                {strIcon}
            </div>


            var mediaUrl = "http://www.toutiao.com"+value.media_url;
            var aStyle = {
                width:"20px",
                height:"20px",
                textAlign:"center",
                marginRight:"10px"

            }
            // console.log(value.has_gallery);
            //判断是否有评论
            var iscomment = value.comments_count?value.comments_count+"评论":"0评论";
            var blog = "微博";

            // 评论在下方的样式
            var newsDetail = value.has_gallery?
                <div style = {detailWrap}>
                    <div style = {chineseTagStyle}>
                        {value.chinese_tag?value.chinese_tag:value.ad_label?value.ad_label:blog}
                    </div>
                    <a href={mediaUrl} target="_black" style={aStyle}>
                        {userHeaderIcon}
                    </a>
                    {/* <img src = {userIcon} style = {{width:"20px",height:"20px",borderRadius:"20px",marginRight:"10px"}}/> */}
                    <div style={{marginRight:"10px"}}>{value.source}</div>
                    <div style={{marginRight:"10px"}}>{iscomment}</div>
                </div>
                :<div></div>
            // var tag =
            //评论在右侧的样式
            var newsDetailRight = value.has_gallery==false?
                <div style = {detailWrap}>
                    <div style = {chineseTagStyle}>
                        {value.chinese_tag?value.chinese_tag:value.ad_label?value.ad_label:blog}
                    </div>
                    <a href={mediaUrl} target="_black" style={aStyle}>
                        {userHeaderIcon}
                    </a>
                    {/* <img src = {userIcon} style = {{width:"20px",height:"20px",borderRadius:"20px",marginRight:"10px"}}/> */}
                    <div style={{marginRight:"10px"}}>{value.source}</div>
                    <div style={{marginRight:"10px"}}>{iscomment}</div>
                </div>
                :<div></div>
            // console.log("_____________");
            var imgSrc = "http:" + value.image_url;
            // 有可能是数组
            // console.log(imgList);
            //判断图片是单张还是多张
            // console.log(value.has_gallery);
            //列表or非列表
            // var threeImg = value.image_list.slice(0,4);
            var threeImg = value.has_gallery?value.image_list.slice(0,5):[];
            var list = value.has_gallery?
            // 图片是列表的时候
                threeImg.map(function(listValue,listIndex){
                    var imgUrl = "http:" +listValue.url;
                    var imgStyle = {
                        marginBottom:"10px"
                    }
                    return (
                        <div key={listIndex} >
                            <img src={imgUrl} style={{height:"144px"}}/>
                        </div>
                    )
                })
                :<div key={index} style={listWrapStyle}>
                        <img style={listImgStyle} src={imgSrc}/>
                </div>
            //新闻列表伸缩布局样式 竖向排列
            var newsListWrapStyle = {
                display:"flex",
                flexDirection:value.has_gallery?"column":"row-reverse",
                flexWrap:"nowrap",
                justifyContent:"space-between",
                borderBottom:"1px solid #ddd",
                alignItems:value.has_gallery?"":"center"
            }
            var marginLeft = {
                marginLeft:"0px"
            }
            var flex1 = {
                flex:1,
                alignItems:"center"
            }
            var titleStyle = {
                paddingTop:value.has_gallery?"10px":"",
                paddingBottom:value.has_gallery?"10px":"0px",
            }
            var imgListWrapStyle = {
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between"
            }
            var aHref = "http://www.toutiao.com"+value.source_url;
            return (
                <div key={index} style={newsListWrapStyle}>
                    <div style = {flex1}>
                        <h2 style={titleStyle}>
                            <a href={aHref} target = "_black" className = "news-title-a">
                                {value.title}
                            </a>
                        </h2>
                        <div>
                            {newsDetailRight}
                        </div>
                    </div>
                    <a href={aHref} target = "_black">
                        <div style={imgListWrapStyle}>
                            {list}
                        </div>
                    </a>
                    <div>{newsDetail}</div>
                </div>
            )
        })
        // console.log("List":newList)
        return(
            <div>
                {newList}
            </div>
        )
    }
}
