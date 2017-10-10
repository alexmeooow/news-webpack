import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import fetchJsonp from "fetch-jsonp"

import {
    Input
} from 'antd';

export default class PCContentSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            defaultValue: ""
        }
    }

    componentWillMount() {
        let url = "https://www.toutiao.com/hot_words/";
        // let url = "https://www.toutiao.com/search/suggest/initial_page/";
        this._fetch(url);

    }

    _fetch(url) {
        console.log(this.state.data);
        console.log(url);
        fetchJsonp(url, {})
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    data: responseJson,
                    defaultValue: responseJson[0]
                });
                console.log(this.state.data);
            })
            .catch(function (err) {
                console.log(err);
            });
        console.log("componentWillMount");
    }

    _handleFocus(e) {
        // this.state.defaultValue ?
        //     (() => {
        //         e.target.value = "";
        //         this.setState({
        //             defaultValue: false
        //         })
        //     })()
        //     // this._defaultValue(e)
        //     :
        e.target.placeholder = "";
        this.refs.hot.style.display = "block";
    }

    _handleBlur(e) {
        e.target.placeholder = e.target.value ? e.target.value : "大家都在搜：" + this.state.defaultValue;
        setTimeout(() => {
            this.refs.hot.style.display = "none";
        }, 150);

    }


    _handleClick(value) {
        this.refs.input.refs.input.value = value;
    }

    _handleBtn() {
        console.log(this.refs.input.refs.input.value);
        open("https://www.toutiao.com/search/?keyword=" + this.refs.input.refs.input.value);
        // location.href = "https://www.toutiao.com/search/?keyword=" + this.refs.input.refs.input.value;
    }

    render() {
        let data = this.state.data;
        let url = "https://www.toutiao.com/search/?keyword=";
        // 热搜
        let hot = data.map((value, index) => {
            return (
                <li
                    key={index}
                    onClick={this._handleClick.bind(this, value)}
                >
                    <a
                        href={url + value}
                        target="_black"
                        className="a-hot"
                    >
                        {index + 1}&emsp;{value}
                    </a>
                </li>
            )
        });
        // 举报
        let report =
            <a
                href="http://report.12377.cn:13225/toreportinputNormal_anis.do"
                target="_blank"
                className="a-link"
            >
                <div style={{padding: "0 15px 0 0"}}>
                    <img
                        src="http://s3a.pstatp.com/toutiao/resource/ntoutiao_web/static/image/other/report_logo_15cc24e.png"
                        alt=""
                        style={{width: 57, height: 50}}
                    />
                </div>
                <div style={{padding: "0 35px 0 0"}}>
                    <p style={{fontSize: 18, color: "#222"}}>网上有害信息举报专区</p>
                    <p style={{fontSize: 14, color: "#777"}}>举报电话：12377</p>
                </div>
            </a>
        return (
            <div className="pc-content-search">
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{width: "80%"}}>
                        <Input
                            className="pc-content-search-input"
                            placeholder={"大家都在搜：" + this.state.defaultValue}
                            onFocus={this._handleFocus.bind(this)}
                            onBlur={this._handleBlur.bind(this)}
                            ref="input"
                        />
                        <div className="pc-content-search-hot"
                             ref="hot"
                        >
                            <ul>
                                {hot}
                            </ul>
                        </div>
                    </div>
                    <div
                        className="pc-content-search-button"
                        onClick={this._handleBtn.bind(this)}
                    >
                        搜索
                    </div>
                </div>
                <div className="pc-content-search-report">
                    {report}
                </div>
            </div>
        )
    }
}
