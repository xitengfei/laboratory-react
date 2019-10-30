import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    position: 'relative',
};

const iconStyle = {
    width: 20,
    height: 20,
    background: '#000',
    position: 'absolute',
    top: '0',
    right: '0'
};

class Item extends React.Component {
    render() {
        const { text, connectDragSource, connectDropTarget, connectDragPreview, isDragging } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDropTarget(
            connectDragPreview(<div className="item-container" style={{ ...style, opacity }}>
                {connectDragSource(<div className="icon" style={iconStyle}></div>)}
                {text}
            </div>)
        )
    }
}

const type = 'item';

const itemSource = {
    beginDrag(props) {
        return { id: props.id };
    }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}

const itemTarget = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;

        if (draggedId !== props.id) {
            props.moveItem(draggedId, props.id);
        }
    }
};

function collectTaget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    };
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type, itemTarget, collectTaget)(Item));