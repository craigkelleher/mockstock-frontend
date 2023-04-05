import React, {useState} from "react";
import '../PortfolioPage.css';

function PortfolioTable(props) {
    const [portfolio, setPortfolio] = useState(props.portfolio);
    const [sharesToBuyOrSell, setSharesToBuyOrSell] = useState({});
    
    function handleBuyShares(event, symbol) {
        const value = event.target.value;
        if (window.confirm("Do you really want to purchase the shares?")) {
            setSharesToBuyOrSell((prevShares) => ({
                ...prevShares, [symbol]: value ? parseInt(value) : undefined,
            }));
            // TODO: connect code to update portfolio when you buy a share
        }
    };

    function handleSellShares(event, symbol) {
        const value = event.target.value;
        if (window.confirm("Do you really want to sell the shares?")) {
            setSharesToBuyOrSell((prevShares) => ({
                ...prevShares, [symbol]: value ? parseInt(value) : undefined,
            }));
            // TODO: connect code to update portfolio when you sell a share
        }
    };

    function getSharePrice(symbol) {
        // TODO: Connect to finnhubAPI
        return 150.00; //for testing
    }

    return (
        <table>
            <tr>
                <th>Symbol</th>
                <th>Share Price</th>
                <th>#Shares</th>
                <th>$ Invested</th>
                <th>Investment Value</th>
                <th>Action</th>
            </tr>
        <tbody>
            {portfolio.map(stock =>
                <tr key={stock.symbol}>
                    <td className="symbol-name">{stock.symbol}</td>
                    <td>${getSharePrice(stock.symbol)}</td>
                    <td>{stock.numberOfShares}</td>
                    <td>${stock.amountInvested}</td>
                    <td>${getSharePrice(stock.symbol) * stock.numberOfShares}</td>
                    <td>
                        <button onClick={handleBuyShares}>Buy</button>
                    <label>
                        <input type="number" min="0" value={sharesToBuyOrSell[stock.symbol]} onChange={(event) => sharesToBuyOrSell(event.target.value)} />
                    </label>
                    
                    <button onClick={handleSellShares}>Sell</button>
                    </td>
                </tr>
                )}
        </tbody>
        </table>
    );
}

export default PortfolioTable;