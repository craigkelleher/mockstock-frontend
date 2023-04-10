import React, {useEffect, useState} from "react";
import '../PortfolioPage.css';
import axios from "axios";
import helpers from '../helpers';

function PortfolioTable({ portfolio, userId, stockPrice, fetchPortfolio }) {
    const [sharesToBuyOrSell, setSharesToBuyOrSell] = useState({});
    function handleBuyShares(stockSymbol) {
        const shares = sharesToBuyOrSell[stockSymbol] ?? 0; // set shares to 0 if undefined or null
        if (window.confirm(`Do you really want to purchase ${shares} shares of ${stockSymbol}?`)) {
            const transaction = {
                stockSymbol: stockSymbol,
                transactionType: "buy",
                quantity: shares
            };
            axios.post(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/transactions`, transaction)
                .then(() => {
                    fetchPortfolio();
                    handleShareChange(null, stockSymbol);
                });
        }
    };

    function handleSellShares(stockSymbol) {
        const stock = portfolio.find(stock => stock.stockSymbol === stockSymbol);
        const shares = sharesToBuyOrSell[stockSymbol] ?? 0;
        if(stock.quantity === 0){
            handleRemoveClick(stockSymbol);
        }
        else if(window.confirm(`Do you really want to sell ${sharesToBuyOrSell[stockSymbol]} shares of ${stockSymbol}?`)) {
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
                    fetchPortfolio();
                    handleShareChange(null, stockSymbol)
                });
            }
    };

    function handleShareChange(value, stockSymbol) {
        setSharesToBuyOrSell(prevState => ({
            ...prevState,
            [stockSymbol]: parseInt(value) || null
        }));
    }

    function handleRemoveClick(stockSymbol){
        if(window.confirm('Do you really want to remove ${stockSymbol} from your portfolio?')){
            axios.delete(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/portfolio/${stockSymbol}`)
                .then(() => {
                    fetchPortfolio();
                })
        }
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
            {portfolio.map(stock => {
                return (
                    <tr key={stock.stockSymbol}>
                        <td className="stockSymbol-name">{stock.stockSymbol}</td>
                        <td className="stock-name">{stock.name}</td>
                        <td>${helpers.formatNumber(stockPrice[stock.stockSymbol])}</td>
                        <td>{stock.quantity}</td>
                        <td>${stock.profitLoss}</td>
                        <td>${helpers.formatNumber(stockPrice[stock.stockSymbol] * stock.quantity)}</td>
                        <td className="button-mimic" onClick={() => handleBuyShares(stock.stockSymbol)}>Buy</td>
                        <td className="input-cell"><input type="number" min="0" value={sharesToBuyOrSell[stock.stockSymbol] === null ? '' : sharesToBuyOrSell[stock.stockSymbol]} onChange={(event) => handleShareChange(event.target.value, stock.stockSymbol)} /></td>
                        <td className="button-mimic" onClick={() => handleSellShares(stock.stockSymbol)}>Sell</td>
                    </tr>
                )}
            )}
        </tbody>
        </table>
    );
}

export default PortfolioTable;