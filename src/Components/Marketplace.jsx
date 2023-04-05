import React from "react";

const popularStocks = [
    { name: "Activision Blizzard Inc.", symbol: "ATVI", price: 85.38, change: 0.32 },
    { name: "Advanced Micro Devices", symbol: "AMD", price: 92.56, change: -3.45},
    { name: "Alphabet Inc.", symbol: "GOOG", price: 104.95, change: -0.16},
    { name: "Amazon.com, Inc.", symbol: "AMZN", price: 101.1, change: -2.74},
    { name: "Apple Inc.", symbol: "AAPL", price: 163.76, change: -1.13 },
    { name: "Cisco Systems Inc", symbol: "CSCO", price: 51.82, change: 0.04},
    { name: "Coca-Cola Co.", symbol: "KO", price: 163.76, change: -1.13},
    { name: "Domino's Pizza Inc", symbol: "DPZ", price: 328.35, change: -0.16},
    { name: "GameStop Corp", symbol: "GME", price: 22.07, change: -1.25},
    { name: "Intel Corporation", symbol: "INTC", price: 32.83, change: -0.82},
    { name: "McDonald's Corp.", symbol: "MCD", price: 282.02, change: -0.092},
    { name: "Microsoft Corp.", symbol: "MSFT", price: 284.34, change: -0.99 },
    { name: "PepsiCo, Inc.", symbol: "PEP", price: 183.64, change: 0.98},
    { name: "Tesla Inc", symbol: "TSLA", price: 185.52, change: -3.67},
    { name: "Walt Disney", symbol: "DIS", price: 99.91, change: 0.34}
    // add more stock here...`
];

function Marketplace() {
    return (
        <table>
            <tr>
                <th>Symbol</th>
                <th className="stock-name">Name</th>
                <th>Price</th>
                <th>Daily % Change</th>
                <th>Action</th>
            </tr>

            <tbody>
                {popularStocks.map((stock) => (
                    <tr key={stock.symbol}>
                        <td>{stock.symbol}</td>
                        <td className="stock-name">{stock.name}</td>
                        <td>{`$${stock.price.toFixed(2)}`}</td>
                        <td>{`${stock.change.toFixed(2)}%`}</td>
                        <td>
                            <button> Add to Portfolio </button>
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
    );
}

export default Marketplace;