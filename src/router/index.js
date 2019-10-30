import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import zhTW from 'antd/es/locale-provider/zh_TW';

import Home from "@/pages/Home"
import Examples from "@/pages/Examples"

import moment from 'moment';
import 'moment/locale/zh-tw';

moment.locale('zh-tw');


const Index = function(props){
    return (
        <Redirect to="/examples"/>
    )
}


export default class RouteConfig extends React.Component{
    render(){
        return (
            <ConfigProvider locale={zhTW}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Index} />
                        <Route path="/home" exact component={Home} />
                        <Route path="/examples" component={Examples} />
                    </Switch>
                </BrowserRouter>
            </ConfigProvider>
        )
    }
}