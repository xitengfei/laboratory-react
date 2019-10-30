import React from 'react';
import { Calendar, DatePicker } from 'antd';

import moment from 'moment';
// import 'moment/locale/zh-tw';

// moment.locale('en');

const { RangePicker } = DatePicker;

export default class Home extends React.Component{
    render(){
        return (
            <div>
                Hello World!
                <RangePicker style={{ width: 200 }} />
                <div style={{ width: 319, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar fullscreen={false} value={moment()} />
                </div>
            </div>
        )
    }
}