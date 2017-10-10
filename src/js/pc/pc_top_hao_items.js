import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Menu, Icon} from 'antd';
import 'antd/dist/antd.css';

import PCNewsTopItem from "./pc_top_hao_item.js";

export default class PCNewsTopItems extends React.Component{
	constructor(){
		super();
		
	}
	render(){
		var data = this.props.data;
		var content = data.length
		?data.map(function(value,index){
			return (
				<PCNewsTopItem key={index} data={value}/>
			);
		})
		:<div>暂时没有数据</div>
		return (
			<div>
				{content}
			</div>
		);
	}
	
}
