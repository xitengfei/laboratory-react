import React from 'react';
import XUIEditor from '@/components/XUIEditor';
import './index.less';

class RichEditor extends React.Component{
    editor = null;

    componentDidMount(){
    }

    handleDoubleClick = (e) => {
        e.preventDefault();
        const html = '<i>'+e.target.innerText+'</i>';
        this.editor && this.editor.insertHTML(html);
    }

    render(){
        const testData = ['AAA', 'BBB', 'CCC'];
        return (
            <div 
                className="editor-container"
            >
                <div className="tools">
                    <ul>
                        {
                            testData.map(item => {
                                return (
                                    <li
                                        key={item}
                                        title={item}
                                        onDoubleClick={this.handleDoubleClick}  
                                    >{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <XUIEditor
                    ref={ref => this.editor = ref}
                    width={200}
                    placeholder={'请输入内容'}
                    htmlContent={null}
                />
            </div>
        )
    }
}

export default RichEditor;