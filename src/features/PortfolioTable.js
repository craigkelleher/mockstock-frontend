import React, {useEffect, useState} from "react";
import '../PortfolioPage.css';
import axios from "axios";

function PortfolioTable({ portfolio, userId, setPortfolio }) {

    const [sharesToBuyOrSell, setSharesToBuyOrSell] = useState({});    

    
    // useEffect(() => {
    //     async function fetchPortfolio() {
    //         // const response = await axios.get(`http://localhost:8080/api/user/${userId}/portfolio`);
    //         const response = await axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/portfolio`);
    //         setPortfolio(response.data);
    //     }
    //     fetchPortfolio();
    // }, []);

    function handleBuyShares(stockSymbol) {

        if (window.confirm(`Do you really want to purchase ${sharesToBuyOrSell[stockSymbol]} shares of ${stockSymbol}?`)) {
            const transaction = {
                stockSymbol: stockSymbol,
                transactionType: "buy",
                quantity: sharesToBuyOrSell[stockSymbol]
            };
            
            // axios.post(`http://localhost:8080/api/user/${userId}/transactions`,
            // transaction)
            //     .then(() => {
            //         handleShareChange(0, stockSymbol)
            //     })
            axios.post(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/transactions`,
            transaction)
                .then(() => {
                    handleShareChange(null, stockSymbol)
                })
        }
    };

    function handleSellShares(stockSymbol) {

        if (window.confirm(`Do you really want to sell ${sharesToBuyOrSell[stockSymbol]} shares of ${stockSymbol}?`)) {
            const transaction = {
                stockSymbol: stockSymbol,
                transactionType: "sell",
                quantity: sharesToBuyOrSell[stockSymbol]
            };
            
            // axios.post(`http://localhost:8080/api/user/${userId}/transactions`,
            // transaction)
            //     .then(() => {
            //         handleShareChange(0, stockSymbol)
            //     })
            axios.post(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/transactions`,
            transaction)
                .then(() => {
                    handleShareChange(null, stockSymbol)
                })
        }
    };

    function handleShareChange(value, stockSymbol) {
        setSharesToBuyOrSell(prevState => ({
            ...prevState,
            [stockSymbol]: parseInt(value) || null
        }));
    }

    return (
        <table className="portfolio-table">
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th className="stock-name">Name</th>
                    <th>Price</th>
                    <th>#Shares</th>
                    <th>Profit/Loss</th>
                    <th>Value</th>
                    <th>Action</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
        <tbody>
            {portfolio.map(stock => 
                <tr key={stock.stockSymbol}>
                    <td className="stockSymbol-name">{stock.stockSymbol}</td>
                    <td className="stock-name">{stock.name}</td>
                    <td>${stock.price}</td>
                    <td>{stock.quantity}</td>
                    <td>${stock.amountInvested}</td>
                    <td>${stock.price * stock.quantity}</td>
                    <td className="button-mimic" onClick={() => handleBuyShares(stock.stockSymbol)}>Buy</td>
                    <td className="input-cell"><input type="number" min="0" value={sharesToBuyOrSell[stock.stockSymbol] === null ? '' : sharesToBuyOrSell[stock.stockSymbol]} onChange={(event) => handleShareChange(event.target.value, stock.stockSymbol)} /></td>
                    <td className="button-mimic" onClick={() => handleSellShares(stock.stockSymbol)}>Sell</td>
                </tr>
            )}
        </tbody>
        </table>
    );
}

export default PortfolioTable;