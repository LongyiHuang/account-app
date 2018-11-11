import React from 'react'

export default function AmountBox(props) {
    return (
        <div className='col'>
            <div className="card">
                <div className={`card-header bg-${props.type} text-white`}>{props.name}</div>
                <div className="card-body">{props.amount}</div>
            </div>
        </div>


    );
}