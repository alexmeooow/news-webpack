import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Menu, Icon} from 'antd';
import 'antd/dist/antd.css';

export default class PCNewsTopItem extends React.Component{
	render(){
		var data = this.props.data;
		var itemStyle = {
			borderWidth:"1px",
			borderColor:"#e5e5e5",
			borderStyle:"solid",
			marginTop:"10px"
		}
		return (
			<div className="pc_new_top_item" style={itemStyle}>
				<div className="pc_new_top_item_left">
					<img src={data.thumbnail_pic_s}/>
					<p>{data.author_name}</p>
					<p> | {data.date}</p>
				</div>
				<p className="title">{data.title}</p>
				<div className="comment">
					<p>99条评论</p>
				</div>
			</div>
		);
	}
}
