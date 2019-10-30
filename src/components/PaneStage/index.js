import React from "react";
import "./index.less";

export default class PaneStage extends React.Component {
    container = null;
    dragDom = null;
    inMousePart = false;

    state = {
        position: 'center',
        isDragEnter: false,
        layouts: [
            {
                areaId: 'root',
            }
        ],
        areas:[
            {id: 'root', title:'root'},
        ]
    };

    showLayer = (show = true) => {
        if(this.layer){
            this.layer.style.display = show ? 'block' : 'none';
        }
    }

    itemDragStart = e => {
        e.dataTransfer.setData('text/plain', e.target.id);
        console.log('drag start:', e.target);
        this.dragDom = e.target;
    }

    itemDragOver = e => {
        e.preventDefault();
    }

    itemDragEnter = e => {
        if(this.dragDom === e.target) return;
        if(e.target.classList.contains('pane-stage')){
            console.log('drag enter:', e.target);
            this.setState({isDragEnter: true});
        }
    }

    itemDragLeave = e => {
        // if(!e.target.classList.contains('pane-stage')) return false;
        console.log('drag leave:', e.target, e.relatedTarget, e.relatedTarget.parentNode);
        
        const checkLeave = node => {
            if(e.currentTarget === node){
                return false;
            }else if(node && node.parentNode){
                return checkLeave(node.parentNode);
            }else{
                return true;
            }
        }

        let isLeave = checkLeave(e.relatedTarget);

        if(isLeave){
            this.setState({
                position: "",
                isDragEnter: false
            });
        }
    }

    itemDrop = e => {
        e.preventDefault();
        if(this.dragDom === e.target) return;
        // var data = e.dataTransfer.getData("text");
        
        this.setState({position:'', isDragEnter: false});
        this.dragDom = null;
    }

    mousePartDragEnter = (position, e) => {
        console.log('mouse enter', e.target);
        // e.stopPropagation();
        this.setState({position, isDragEnter: true});
        this.inMousePart = true;
    }

    mousePartDragLeave = (position, e) => {
        this.inMousePart = false;
    }

    renderResponseLayer = () => {
        if(!this.state.isDragEnter) return null;

        const positions = ['top', 'right', 'bottom','left', 'center'];

        let doms = positions.map(p => {
            const className = 'mouse-' + p + '-part';
            return(
                <div 
                    key={p}
                    className={className}
                    onDragEnter={this.mousePartDragEnter.bind(this, p)}
                    onDragLeave={this.mousePartDragLeave.bind(this, p)}
                ></div>
            )
        });
        doms.push(<div key="position" className={`position-part ${this.state.position}-part`}></div>);

        return doms;
    }

    renderTreeNodes = (items) => {
        return items.map((item, key)=>{
            const area = this.state.areas.find(area => item.areaId === area.id);
            if(item.children && item.children.length){
                return (
                    <div className="area-container">
    
                    </div>
                )
            }else{
                return (
                    <PaneStage 
                    
                    />
                )
            }
        })
    }
    
    render(){
        const {title, id} = this.props;
        const {layouts} = this.state;

        return (
            <div 
                className="pane-stage"
                data-id={id}
                draggable={true}
                onDragStart={this.itemDragStart}
                onDragOver={this.itemDragOver}
                onDragEnter={this.itemDragEnter}
                onDragLeave={this.itemDragLeave}
                onDrop={this.itemDrop}
            >
                {this.renderTreeNodes(layouts)}
                {this.renderResponseLayer()}
            </div>
        );
    }
}