import React from 'react';
import './index.less';

class XUIEditor extends React.Component{
    _editor = null;
    underIE9 = false;
    range = null;

    constructor(props){
        super(props);

        const sel = window.getSelection();
        this.underIE9 = sel.getRangeAt && sel.rangeCount;
    }

    setContent = (htmlContent) => {
        if(this._editor && htmlContent){
            const currContent = this._editor.innerHTML;
            if(currContent !== htmlContent){
                this._editor.innerHTML = htmlContent;
            }
        }
    }

    componentDidMount(){
        this.setContent(this.props.htmlContent);
    }
    componentWillReceiveProps(nextProps){
        this.setContent(nextProps.htmlContent);
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
                // 这里必须先focus, 否则回将dom插入到外部
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
        this.handleChange();
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

    handleChange = () => {
        const {onChange} = this.props;
        const htmlContent = this._editor.innerHTML;
        onChange && onChange(htmlContent);
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
                    onChange={this.handleChange}
                ></div>
            </div>
        )
    }
}

export default XUIEditor;