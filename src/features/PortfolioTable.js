import React, {useEffect, useState} from "react";
import '../PortfolioPage.css';
import axios from "axios";

function PortfolioTable({ portfolio, userId, transactionSummation }) {

    const [sharesToBuyOrSell, setSharesToBuyOrSell] = useState({});
    const [stockPrice, setStockPrice] = useState({});

    
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

            console.log(transaction);
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

    function handleProfitLoss(stock) {
        axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/quotes/${stock.stockSymbol}`)
            .then((response) => {
                const currentStockPrice = response.data.price;
                const investmentValue = currentStockPrice * stock.quantity;

                // take summation of all transaction of current stock symbol
                // subtract from investment value
                
            })
    }
    
    function getValue(stock) {
        axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/quotes/${stock.stockSymbol}`)
        .then((response) => {
            setStockPrice({
                ...stockPrice,
                [stock.stockSymbol]: response.data.price
            });
        })
        
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
                getValue(stock);
                return (
                    <tr key={stock.stockSymbol}>
                        <td className="stockSymbol-name">{stock.stockSymbol}</td>
                        <td className="stock-name">{stock.name}</td>
                        <td>${stockPrice[stock.stockSymbol]}</td>
                        <td>{stock.quantity}</td>
                        <td>${handleProfitLoss(stock)}</td>
                        <td>${stockPrice[stock.stockSymbol] * stock.quantity}</td>
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