import React from 'react'
import { Row, Col, List, Card } from 'antd'

import { Link } from 'react-router-dom'

const {Item} = List;

export default ({match}) => {
    const basePath = match.url.replace(/(\/*$)/g, '');

    return (
        <Row className="xui-cardslist">
            <Col span={8}>
                <Card
                    title="拖动排序"
                    style={{ width: '100%' }}
                >
                    <List>
                        <Item><Link to={`${basePath}/sortable`}>拖动排序(Sortable.js实现)</Link></Item>
                        <Item><Link to={`${basePath}/dnd-sortable`}>拖动排序(Dnd实现)</Link></Item>
                    </List>
                </Card>
            </Col>

            <Col span={8}>
                <Card
                    title="表格"
                >
                    <List>
                        <Item><Link to={`${basePath}/editable-table`}>(可编辑单元格)EditableTable</Link></Item>
                    </List>
                </Card>
            </Col>

            <Col span={8}>
                <Card
                    title="自定义组件"
                >
                    <List>
                        <Item><Link to={`${basePath}/drag-slider`}>拖拽滑动</Link></Item>
                        <Item><Link to={`${basePath}/grid-layout`}>流式布局</Link></Item>
                    </List>
                </Card>
            </Col>
        </Row>
    )
}