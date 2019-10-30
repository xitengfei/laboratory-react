import React from "react";
import "./index.less";

export default class DragSlider extends React.Component {
    container = null; //使用拖拽事件的外部容器

    state = {
        itemWidth: 80,
    };

    handleMouseDown = (e) => {
        const clientx = e.clientX;
        const clienty = e.clientY;
        const container = this.container;
        if(!container) return false;

        let {itemWidth} = this.state;
        let offsetX = 0, offsetY = 0;

        // disable select
        container.style.userSelect = 'none';
        
        container.onmousemove = event => {
            offsetX = event.clientX - clientx;
            offsetY = event.clientY - clienty;
        };

        container.onmouseup = () => {
            itemWidth += offsetX;
            itemWidth = Math.max(0, itemWidth);

            this.setState({itemWidth});
            container.onmousemove = null;
            container.onmouseup = null;
            container.style.userSelect = 'inherit';
        };

        container.onmouseleave = () => {
            container.onmousemove = null;
            container.onmouseup = null;
            container.style.userSelect = 'inherit';
        };
    }
    
    render(){
        return(
            <div className="drag-slider" ref={node => this.container = node}>
                <div className="box">
                    <div className="item" style={{width: this.state.itemWidth}}>
                        element1
                        <i 
                            className="resizer" 
                            onMouseDown={this.handleMouseDown}
                        ></i>
                    </div>
                    <div className="item">
                        element2
                        <i className="resizer"></i>
                    </div>
                </div>
            </div>
        )
    }
}