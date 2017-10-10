import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Menu, Icon,Button } from 'antd';
import 'antd/dist/antd.css';

import PCNewsTopItems from "./pc_top_hao_items.js";

export default class PCNewsChange extends React.Component{
	constructor(){
		super();
		this.state = {
			data:[],
			types:["__all__","news_hot","news_tech","yule","junshi","keji","caijing","tiyu"],
			index:0
		}
	}
	render(){
		return (
			<div className="pc_news_top_hao">
				<div className="pc_news_top">
					<div className="left">
						<p className="tag"></p>
						<p className="title">头条号</p>
					</div>
					<div className="right">
						<Button
						 type="primary"
						 onClick={this.change.bind(this)}
						 >换一换</Button>
					</div>
				</div>
				<div>
					{this.state.data.length
						?<PCNewsTopItems data={this.state.data}/>
						:<div>暂无数据</div>
					}
				</div>
			</div>
		);
	}
	componentWillMount(){
		this.downLoad(0);
	}
	change(){
		var index = this.state.index;
		index++;
		index = index % this.state.types.length;
		// 根据给定的接口，去下载所需的数据
		this.downLoad(index);
	}
	downLoad(index){
		var url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.state.types[index]+"&count=5"
		var fetchOption = {
			method: 'GET'
		}
		// 开始所需数据的下载
		fetch(url,fetchOption)
		.then(response=>response.json())
		.then(responseJson=>{
			this.setState({
				data:responseJson,
				index:index
			});
		});
	}

}
