import React, {useEffect, useState} from "react";
import '../PortfolioPage.css';
import axios from "axios";

function PortfolioTable(props) {
    const [portfolio, setPortfolio] = useState([]);
    const [sharesToBuyOrSell, setSharesToBuyOrSell] = useState({});
    const [sharePrices, setSharePrices] = useState({});

    const API_KEY = "cghh1b9r01qjd0395910cghh1b9r01qjd039591g"
    
    // TEST ID
    const userId = 3;
    
    useEffect(() => {
        async function fetchPortfolio() {
            const response = await axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/portfolio`);
            setPortfolio(response.data);
        }
        fetchPortfolio();
    }, []);

    useEffect(() => {
        async function fetchPrices() {
            const prices = {};
            for (const stock of portfolio) {
                console.log("stock: ", stock.stockSymbol);
                const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock.stockSymbol}&token=${API_KEY}`);
                prices[stock.stockSymbol] = response.data.c;
                console.log("stock price ", response.data);
            }
            setSharePrices(prices);
        }
        fetchPrices();
    }, [portfolio]);



    function handleBuyShares(event, stockSymbol) {
        const value = event.target.value;
        if (window.confirm("Do you really want to purchase the shares?")) {
            setSharesToBuyOrSell((prevShares) => ({
                ...prevShares, [stockSymbol]: value ? parseInt(value) : undefined,
            }));
            // TODO: connect code to update portfolio when you buy a share
        }
    };

    function handleSellShares(event, stockSymbol) {
        const value = event.target.value;
        if (window.confirm("Do you really want to sell the shares?")) {
            setSharesToBuyOrSell((prevShares) => ({
                ...prevShares, [stockSymbol]: value ? parseInt(value) : undefined,
            }));
            // TODO: connect code to update portfolio when you sell a share
        }
    };

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
                </tr>
            </thead>
        <tbody>
            {portfolio.map(stock => {
                const sharePrice = sharePrices[stock.stockSymbol] || 0;
                return (
                    <tr key={stock.stockSymbol}>
                        <td className="stockSymbol-name">{stock.stockSymbol}</td>
                        <td className="stock-name">{stock.name}</td>
                        <td>${sharePrice}</td>
                        <td>{stock.quantity}</td>
                        <td>${stock.amountInvested}</td>
                        <td>${(sharePrice * stock.quantity).toFixed(2)}</td>
                        <td>
                            <button onClick={handleBuyShares}>Buy</button>
                        <label>
                            <input type="number" min="0" value={sharesToBuyOrSell[stock.stockSymbol]} onChange={(event) => sharesToBuyOrSell(event.target.value)} />
                        </label>
                        
                        <button onClick={handleSellShares}>Sell</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
        </table>
    );
}

export default PortfolioTable;