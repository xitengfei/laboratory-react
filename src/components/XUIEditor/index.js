import React from 'react';
import './index.less';

class XUIEditor extends React.Component{
    _editor = null;
    underIE9 = false;

    constructor(props){
        super(props);

        const sel = window.getSelection();
        this.underIE9 = sel.getRangeAt && sel.rangeCount;
    }

    setContent = (htmlContent) => {
        if(this._editor && htmlContent) this._editor.innerHTML = htmlContent;
    }

    componentDidMount(){
        this.setContent(this.props.htmlContent);
    }
    componentWillReceiveProps(nextProps){
        this.setContent(nextProps.htmlContent)
    }

    /**
     * 执行命令
     * @param {*} sCmd 
     * @param {*} sValue 
     */
    execCommand = (sCmd, sValue) => {
        // if(document.activeElement !== this._editor){
        //     this._editor.focus();
        // }
        // if(document.activeElement === this._editor){
        //     document.execCommand(sCmd, false, sValue);
        // }
        document.execCommand(sCmd, false, sValue);
        // this._editor.focus();
    }

    /**
     * 插入html
     */
    insertHTML = (html) => {
        if(this.underIE9){
            document.selection.createRange().pasteHTML(html);
        }else{
            const sel = window.getSelection();

            // 自动选中
            if(!this.range){
                this._editor.focus();
                this.range = sel.getRangeAt(0);
            }else{
                // clean selection
                this.range.deleteContents();
            }

            // 插入内容
            let el = document.createElement("div");
            el.innerHTML = html;
            let frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            this.range.insertNode(frag);

            // 更新光标位置
            if (lastNode) {
                const range = this.range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);

                // 记录
                this.range = sel.getRangeAt(0);
            }
        }

    }

    /**
     * 记录光标
     */
    recordRange = () => {
        if(this.underIE9){ // < IE9
            const sel = document.selection;
            this.range = sel.createRange();
        }else{ // IE9 && none IE 
            const sel = window.getSelection();
            this.range = sel.getRangeAt(0);
        }
    }

    handleKeyUp = () => {
        this.recordRange();
    }

    handleClick = () => {
        this.recordRange();
    }

    render(){
        const {width=200, height=200, placeholder=''} = this.props;
        return (
            <div 
                className="xui-editor-container"
            >
                <div 
                    className="xui-editor" 
                    contentEditable="true"
                    ref={ref => this._editor = ref}
                    style={{width, height}}
                    spellCheck={false}
                    onKeyUp={this.handleKeyUp}
                    onClick={this.handleClick}
                    placeholder={placeholder}
                ></div>
            </div>
        )
    }
}

export default XUIEditor;