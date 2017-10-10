import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import {Row, Col, Menu, Icon, Carousel, Tabs, Button} from "antd";
var TabPane = Tabs.TabPane;

import PCNewsTopBar from "./pc_newstopbar.js";
import PCNewsContent from "./pc_newscontent.js";

export default class Root extends React.Component{
    render(){
        return (
            // 最外层
            <div>
                {/* 顶部 */}
                <PCNewsTopBar />
                {/* 导航 */}
                <PCNewsContent />
            </div>

        );
    }
}
ReactDOM.render(<Root />,document.getElementById("root"));
