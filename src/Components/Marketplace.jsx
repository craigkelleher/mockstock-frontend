import React, { useState, useEffect } from "react";
import axios from "axios";
import PortfolioTable from "../features/PortfolioTable";
import helpers from '../helpers';



function Marketplace({ fetchPortfolio, portfolio, userId }) {
    const [marketplace, setMarketplace] = useState([]);


    useEffect(() => {
        fetchMarketplace();
    }, []);
    
    function fetchMarketplace() {
        axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/quotes`, {
            params: {
                symbols: `ATVI,AMD,GOOG,AMZN,AAPL`
            }
        })
            .then((response) => {
                setMarketplace(response.data);
            })
    }

    function handleClick(stock) {
        const portfolioEntry = {
            stockSymbol: stock.symbol,
            name: stock.companyName,
            quantity: 0,
            profitLoss: 0.00
        }
        for(let i = 0; i < portfolio.length; i++){
            if(portfolio[i].stockSymbol === stock.symbol){
                return;
            }
        }

        axios.post(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/portfolio`,
        portfolioEntry)
            .then(() => {
                fetchPortfolio();
                fetchMarketplace();
            })
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th className="stock-name">Name</th>
                    <th>Price</th>
                    <th>Daily % Change</th>
                </tr>
            </thead>
            <tbody>
                {marketplace.map((stock) => (
                    <tr key={stock.symbol}>
                        <td>{stock.symbol}</td>
                        <td className="stock-name">{stock.companyName}</td>
                        <td>{`$${helpers.formatNumber(stock.price)}`}</td>
                        <td>{`${helpers.formatNumber(stock.percentChange)}%`}</td>
                        <td title='Add to Portfolio' className="button-mimic">
                             <p onClick={() => handleClick(stock)}>+
                             </p>
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
    );
}

export default Marketplace;