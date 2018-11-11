import React from 'react'
import PropTypes from 'prop-types'

import * as RecordAPI from '../utils/RecordsAPI'

export default class Record extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            edit : false
        }


    }

    handleEdit(){
        this.setState({
            edit : !this.state.edit
        });
    }

    handleUpdate(e){
        e.preventDefault();
        const record = {
            date : this.refs.date.value,
            title : this.refs.title.value,
            amount : Number.parseInt(this.refs.amount.value,0)
        }

        RecordAPI.updateRecord(this.props.record.id,record)
            .then(
                response => {
                    this.props.handleUpdateRecord(response.data);
                    this.setState({
                        edit : false
                    });
                }
            ).catch(
                error => console.log(error)
            );
    }

    handleDelete(e){
        RecordAPI.deleteRecord(this.props.record.id)
            .then(
                response => {
                    this.props.handleDeleteRecord(response.data);
                }
            ).catch(
                error => console.log(error)
            );
    }


    recordRowComponent(){
        return (
            <tr>
                <th>￥{this.props.record.date}</th>
                <th>￥{this.props.record.title}</th>
                <th>￥{this.props.record.amount}</th>
                <th>
                    <button className="btn btn-info mr-1" onClick={this.handleEdit.bind(this)}>Edit</button>
                    <button className="btn btn-danger mr-1" onClick={this.handleDelete.bind(this)}>Delete</button>
                </th>
            </tr>
        );
    }

    editRecordComponent(){
        return (
            <tr>
                <th><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date"/></th>
                <th><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title"/></th>
                <th><input type="text" className="form-control" defaultValue={this.props.record.amount} ref="amount"/></th>

                <th>
                    <button className="btn btn-info mr-1" onClick={this.handleUpdate.bind(this)}>Update</button>
                    <button className="btn btn-danger mr-1" onClick={this.handleEdit.bind(this)}>Cancel</button>
                </th>
            </tr>
        );
    }

    render(){
        if(this.state.edit){
            return this.editRecordComponent();
        }else{
            return this.recordRowComponent();
        }
    }

}

Record.propTypes = {
    id : PropTypes.string,
    date : PropTypes.string,
    title : PropTypes.string,
    amount : PropTypes.number
}

