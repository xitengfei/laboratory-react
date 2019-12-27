

import React from "react";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';
import {language} from 'monaco-editor/esm/vs/basic-languages/sql/sql';

export default class MonacoEditor extends React.Component{
    editorInstance = null;
    editorElement = null;
    
    componentDidMount(){
        this.editorInstance = monaco.editor.create(this.editorElement, {
            value: null,
            language: 'sql'
        });

        monaco.languages.registerCompletionItemProvider('sql', {
            provideCompletionItems: function(model, position) {
                // get editor content before the pointer
                var textUntilPosition = model.getValueInRange({
                    startLineNumber: position.lineNumber,
                    startColumn: 1,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column
                });
                var match = textUntilPosition.match(/(\S+)$/);
                if (!match) return [];
                
                match = match[0].toUpperCase();
                var suggestions = [];
                language.keywords.forEach(item => {
                    if (item.indexOf(match) !== -1) {
                        suggestions.push({
                            label: item,
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: item
                        });
                    }
                });
                language.operators.forEach(item => {
                    if (item.indexOf(match) !== -1) {
                        suggestions.push({
                            label: item,
                            kind: monaco.languages.CompletionItemKind.Operator,
                            insertText: item
                        });
                    }
                });
                language.builtinFunctions.forEach(item => {
                    if (item.indexOf(match) !== -1) {
                        suggestions.push({
                            label: item,
                            kind: monaco.languages.CompletionItemKind.Function,
                            insertText: item
                        });
                    }
                });
                return {
                    suggestions
                };
            }
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