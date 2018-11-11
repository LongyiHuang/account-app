import React from 'react'
// import {getJSON} from 'jquery'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from "./RecordForm"
import Record from "./Record";
import AmountBox from './AmountBox'


class Records extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records:[],
            error:null,
            isLoaded:false
        }

    }

    componentDidMount() {
        //jquery的get请求
        // getJSON("http://localhost:3000/records").then(
        //     response => this.setState({
        //         records : response,
        //         isLoaded : true
        //     }),
        //     error => (
        //         this.setState({
        //            error : error.statusText,
        //            isLoaded : true
        //         },() => console.log(error))
        //     )
        // )


        //axios的get请求

        RecordsAPI.getRecords()
        .then(
            response => this.setState({
                records: response.data,
                isLoaded: true
            })
        ).catch(
            error => (
                this.setState({
                   error : error,
                   isLoaded : true
                },() => console.log(error))
            )
        )
    }

    addRecord(record){
        this.setState({
            error : null,
            isLoaded : true,
            records : [
                ...this.state.records,
                record
            ]
        });
    }

    editRecord(record){
        console.log(record);
        // const recordIndex = this.state.records.indexOf(oldRecord);
        const newRecords = this.state.records.map((item) => {
            if(item.id !== record.id){
                return item;
            }
            return {
                ...item,
                ...record
            }
        });
        this.setState({
            records : newRecords
        });
    }

    deleteRecord(record){
        const newRecords = this.state.records.filter((item) => {
            return item.id !==  record.id
        });
        this.setState({
            records : newRecords
        });
    }

    income(){
        let amount =  this.state.records.filter((record) => {
            return record.amount >= 0
        });
        if(amount.length > 0){
            return amount.reduce((prev,curr) => {
                return prev + Number.parseInt(curr.amount,0)
            },0);
        }
        return 0;
    }

    balance(){
        return this.income() + this.disbursement();
    }

    disbursement(){
        let amount = this.state.records.filter((record) => {
            return record.amount < 0
        });
        if(amount.length > 0){
            return amount.reduce((prev,curr) => {
                return prev + Number.parseInt(curr.amount,0)
            },0);
        }
        return 0;
    }


    render() {
        const {error,isLoaded,records} = this.state;
        let recordsComponent = null;
        if(error){
            recordsComponent = <div>{error.message}</div>
        }else if(!isLoaded){
            recordsComponent =  <div>Loading...</div>
        }else{
            recordsComponent =  (
                <table className="table table-bordered m-3">
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Opertion</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((record,i) =>
                        <Record key={i}
                                record={record}
                                handleUpdateRecord={this.editRecord.bind(this)}
                                handleDeleteRecord={this.deleteRecord.bind(this)}
                        />
                    )}
                    </tbody>
                </table>
            );
        }
        return (
            <div>
                <h1>Records</h1>
                <div className='form-inline m-3'>
                    <AmountBox type="info" name="income" amount={this.income()}/>
                    <AmountBox type="danger" name="Disbursement" amount={this.disbursement()}/>
                    <AmountBox type="success" name="Balance" amount={this.balance()}/>
                </div>

                <RecordForm handleNewRecord = {this.addRecord.bind(this)}/>
                {recordsComponent}
            </div>
        );
    }
}

export default Records;
