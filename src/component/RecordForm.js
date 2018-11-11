import React from 'react'

import * as RecordsAPI from '../utils/RecordsAPI'

export default class RecordForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            date : "",
            title : "",
            amount : ""
        }

    }

    onChangeHandler(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name] : value
        });
    }

    onSubmitHandler(e){
        e.preventDefault();

        const param = {
            date : this.state.date,
            title : this.state.title,
            amount : this.state.amount
        };

        RecordsAPI.createRecord(param)
            .then(
                response => {
                    this.props.handleNewRecord(response.data);
                    this.setState({
                        date : "",
                        title : "",
                        amount : ""
                    });
                }

            ).catch(
                error => console.log(error)
            )


    }

    valid(){
        return this.state.date && this.state.title && this.state.amount;
    }



    render(){
        return(
            <form className="form-inline m-3 col" onSubmit={this.onSubmitHandler.bind(this)}>
                <div className="form-group mr-2">
                    <input type='text' placeholder='Date' name='date' value={this.state.date} onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div className="form-group mr-2">
                    <input type='text' placeholder='Title' name='title' value={this.state.title} onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div className="form-group mr-2">
                    <input type='text' placeholder='Amount' name='amount' value={this.state.amount} onChange={this.onChangeHandler.bind(this)}/>
                </div>

                <button type='submit' className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
            </form>
        )
    }

}