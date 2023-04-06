import React, {useEffect, useState} from "react";
import '../PortfolioPage.css';
import axios from "axios";

function PortfolioTable(props) {
    const [portfolio, setPortfolio] = useState([]);
    const [sharesToBuyOrSell, setSharesToBuyOrSell] = useState({});    
    // TEST ID
    const userId = 4;
    
    useEffect(() => {
        async function fetchPortfolio() {
            // const response = await axios.get(`http://localhost:8080/api/user/${userId}/portfolio`);
            const response = await axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/portfolio`);
            setPortfolio(response.data);
        }
        fetchPortfolio();
    }, [portfolio]);

    function handleBuyShares(stockSymbol) {

        if (window.confirm("Do you really want to purchase the shares?")) {
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

        if (window.confirm("Do you really want to sell the shares?")) {
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
                    <th>$ Invested</th>
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
                    <td>
                        <button onClick={() => handleBuyShares(stock.stockSymbol)}>Buy</button>
                    <label>
                        <input type="number" min="0" value={sharesToBuyOrSell[stock.stockSymbol] === null ? '' : sharesToBuyOrSell[stock.stockSymbol]} onChange={(event) => handleShareChange(event.target.value, stock.stockSymbol)} />
                    </label>
                    
                    <button onClick={() => handleSellShares(stock.stockSymbol)}>Sell</button>
                    </td>
                </tr>
            )}
        </tbody>
        </table>
    );
}

export default PortfolioTable;