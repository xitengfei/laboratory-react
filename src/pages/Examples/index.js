import React from 'react'
import { Layout, Icon } from 'antd'
import { Link, Route, Switch } from 'react-router-dom'
import Guids from './Guids'

import SortableExample from './cases/SortableExample'
import DndSortable from './cases/DndSortable'
import EditableTable from './cases/EditableTable'

import DragSlider from './custom/DragSlider';
import GridLayout from './custom/GridLayout';

import MonacoEditor from './samples/MonacoEditor';
import RichEditor from './custom/RichEditor';

import './index.less';

const { Header, Footer, Content } = Layout;

const contentStyle = {
    padding: '25px',
}
const IconStyle = {
    marginRight: '25px',
}

class Examples extends React.Component{
    state = {
        referVal: [],
        dropVal: [],
    }

    render(){
        const {match} = this.props;
        const basePath = match.url.replace(/(\/*$)/g, '');

        return (
            <Layout className="test-page">
                <Header style={{color: 'white'}}>
                    <Link to={`${basePath}/`}><Icon type="home" style={IconStyle} /></Link>
                    Component Examples
                </Header>

                <Content style={contentStyle}>
                    <Switch>
                        <Route path={`${basePath}/`} exact component={Guids}/>
                        <Route path={`${basePath}/sortable`} component={SortableExample}/>
                        <Route path={`${basePath}/dnd-sortable`} component={DndSortable}/>
                        <Route path={`${basePath}/editable-table`} component={EditableTable}/>
                        <Route path={`${basePath}/drag-slider`} component={DragSlider}/>
                        <Route path={`${basePath}/grid-layout`} component={GridLayout}/>
                        <Route path={`${basePath}/monaco-editor`} component={MonacoEditor}/>
                        <Route path={`${basePath}/xui-editor`} component={RichEditor}/>
                    </Switch>
                </Content>

                <Footer>
                    footer
                </Footer>
            </Layout>
        )
    }
}


export default Examples