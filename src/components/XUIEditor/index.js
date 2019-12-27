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
        // const isIE = !!window.ActiveXobject || "ActiveXObject" in window;
        // if(!isIE){
        //     this.execCommand('insertHTML', html);
        // }else{
        //     this._editor.innerHTML = this._editor.innerHTML + html;
        // }


        if(this.underIE9){

        }else{
            if(this.range){
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                var firstNode = frag.firstChild;
                range.insertNode(frag);
            }
        }

    }

    /**
     * 记录光标
     */
    handleKeyUp = () => {
        if(this.underIE9){ // < IE9
            const sel = document.selection;
            this.range = sel.createRange();
        }else{ // IE9 && none IE 
            const sel = window.getSelection();
            this.range = sel.getRangeAt(0);
        }
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
                    placeholder={placeholder}
                ></div>
            </div>
        )
    }
}

export default XUIEditor;