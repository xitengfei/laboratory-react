

import React from "react";
import MobilePane from '@/components/MobilePane';

export default class CaseGridLayout extends React.Component {
    
    render(){
        const items = [{
	        id: 1,
	        text: '建立基本知识'
	      }, {
	        id: 2,
	        text: '迈向成功的决心：情绪的纪律'
	      }, {
	        id: 3,
	        text: '基本面分析'
	      }, {
	        id: 4,
	        text: '技术分析'
	      }, {
	        id: 5,
	        text: '期权交易'
	      }, {
	        id: 6,
	        text: '交易者的心理架构'
	      }];

        return(
            <div className="grid-layout-case" >
                <div className="icons">
                    <div 
                        className="new-item"
                        draggable={true}
                    >New Item</div>
                </div>
                <div className="canvas-container">
                    <MobilePane 
                        items={items}
                    />
                </div>
            </div>
        )
    }
}