import React from 'react';
import { Table, Input } from 'antd';
import "./index.less";

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

class EditableCell extends React.Component{
    state = {
        editing: false,
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    handleDataChange = (e) => {
        const {record, dataIndex} = this.props;
        const {onChange} = this.props;
        onChange({...record, [dataIndex]:e.target.value});
    }

    renderCell = () => {
        const {children, record, dataIndex} = this.props;

        const {editing} = this.state;
        return editing ? (
            <Input ref={node => (this.input = node)} value={record[dataIndex]} onChange={this.handleDataChange}  onPressEnter={this.toggleEdit} onBlur={this.toggleEdit} />
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        )
    }

    render(){
        const {
            editable,
            dataIndex,
            title,
            index,
            children,
            ...restProps
        } = this.props;

        return (
            <td {...restProps}>
                {editable ? this.renderCell() : (children)}
            </td>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data,
        };

        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: '25%',
                editable: true,
            },
            {
                title: 'age',
                dataIndex: 'age',
                width: '15%',
                editable: true,
            },
            {
                title: 'address',
                dataIndex: 'address',
                width: '40%',
                editable: true,
            }
        ];
    }

    handleRowChange = (record) => {
        const {data} = this.state;
        const index = data.findIndex(item => record.key === item.key);
        if(index > -1){
            let newData = data.slice();
            newData.splice(index, 1, record);
            this.setState({data: newData});
        }
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editable: col.editable,
                    onChange: this.handleRowChange.bind(this)
                }),
            };
        });

        return (
            <Table
                components={components}
                bordered
                dataSource={this.state.data}
                columns={columns}
                rowClassName="editable-row"
                pagination={null}
            />
        );
    }
}

export default EditableTable;
