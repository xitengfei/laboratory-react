import React from "react";
import PaneStage from '../PaneStage';
import "./index.less";

export default class MobilePane extends React.Component {
    container = null;
    dragDom = null;

    state = {
        itemWidth: 80,
        items: [],
        position: 'center',
    };

    componentDidMount(){
        this.setState({
            items: this.props.items
        })
    }

    exchange = (sourceId, targetId) => {
        const {items} = this.state;
        let nextItems = items.slice();
        let sourceIdx = nextItems.findIndex(item => item.id.toString() === sourceId);
        let targetIdx = nextItems.findIndex(item => item.id.toString() === targetId);
        
        nextItems.splice(sourceIdx, 1, ...nextItems.splice(targetIdx, 1, nextItems[sourceIdx]));

        this.setState({items: nextItems})
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
        const classList = e.target.classList;
        if(classList.contains('grid-item') || classList.contains('new-item')){
            console.log('drag enter', e.target);
            e.target.classList.add('hold');
        }
    }

    itemDragLeave = e => {
        if(e.target.classList.contains('hold')){
            e.target.classList.remove('hold');
            console.log('drag leave', e.target);
        }
    }

    itemDrop = e => {
        e.preventDefault();
        if(this.dragDom === e.target) return;
        var data = e.dataTransfer.getData("text/plain");
        
        const targetId = e.target.getAttribute('data-id');
        if(this.dragDom){
            const sourceId = this.dragDom.getAttribute('data-id');
            console.log('drop, exchange:', sourceId, targetId, data, e.target);
            this.exchange(sourceId, targetId);
        }else{
            console.log('drop, add to:', e.target);
        }
        
        // reset
        if(e.target.classList.contains('hold')){
            e.target.classList.remove('hold');
        }
        this.dragDom = null;
    }
    
    render(){
        const {items} = this.state;
        return(
            <div className="grid-layout" ref={node => this.container = node}>
                {items.map(item => {
                    return (
                        <div 
                            className="grid-item"
                            key={item.id}
                            data-id={item.id}
                        >
                            <PaneStage 
                                id={item.id}
                                title={item.text}
                            />
                        </div>
                    );
                })}
            </div>
        )
    }
}