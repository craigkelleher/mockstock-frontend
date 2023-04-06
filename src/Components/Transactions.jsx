import React, {useEffect, useState} from "react";

function Transactions(){
    //TODO grab some stuff from the API and update transactions
    // const [transactions, setTransactions] = useState([]);
    const transactions = [
        { date: "2022-10-10", symbol: 'AAPL', action: "BUY", quantity: 5, price: 200, total: 1000},
        { date: "2022-10-11", symbol: 'MSFT', action: "BUY", quantity: 5, price: 150, total: 750},
        { date: "2022-10-12", symbol: 'TSLA', action: "SELL", quantity: 5, price: 200, total: 1000}
    ];
    useEffect(() => {
        
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
                            <td>{transactions.symbol}</td>
                            <td>{transactions.action}</td>
                            <td>{transactions.quantity}</td>
                            <td>{transactions.price}</td>
                            <td>{transactions.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Transactions