import React, {useEffect, useState} from "react";
import axios from "axios";
import helpers from '../features/helperFunctions';

function Transactions({ userId }){
    //TODO grab some stuff from the API and update transactions
    // const [transactions, setTransactions] = useState([]);
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/transactions`)
            .then((response) => {
                response.data.reverse();
                setTransactions(response.data)
            })
    }, []);

    return (
        <>
            <h2 className="section-header"> Transaction Log  </h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Symbol</th>
                        <th>Action</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {transactions.map(transactions => (
                        <tr>
                            <td>{transactions.date}</td>
                            <td>{transactions.stockSymbol}</td>
                            <td>{transactions.transactionType.toUpperCase()}</td>
                            <td>{transactions.quantity}</td>
                            <td>${helpers.formatNumber(transactions.stockCost)}</td>
                            <td>${helpers.formatNumber(transactions.stockCost * transactions.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Transactions