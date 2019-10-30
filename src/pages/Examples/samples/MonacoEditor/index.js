

import React from "react";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';

export default class MonacoEditor extends React.Component{
    editorInstance = null;
    editorElement = null;
    
    componentDidMount(){
        this.editorInstance = monaco.editor.create(this.editorElement, {
            value: null,
            language: 'sql'
        });
    }

    componentWillMount(){
        this.editorInstance && this.editorInstance.dispose();
    }

    render(){
       return (
            <div className="editor-example">
                <h2>SQL编辑器测试</h2>
                <div 
                    style={{height: 300, width:1000, border:'1px solid green'}} 
                    ref={ref => this.editorElement = ref}
                >
                    
                </div>
            </div>
       )
    }
}