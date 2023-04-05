import React, { useEffect, useState, useRef } from "react";
import axios from "axios"
import { renderChart } from "./chart"
import PortfolioTable from './PortfolioTable';
import Marketplace from "../Components/Marketplace";
import '../PortfolioPage.css';

function generateChartData(portfolioData) {
    const data = portfolioData.reduce((acc, stock) => {
      const stockValue = parseFloat(stock.quantity) * parseFloat(stock.current_price);
      acc[stock.symbol] = acc[stock.symbol] ? acc[stock.symbol] + stockValue : stockValue;
      return acc;
    }, {});
  
    return Object.keys(data).map((symbol) => {
      return { name: symbol, value: data[symbol] };
    });
  }

function PortfolioPage() {
  const portfolio = [
    { symbol: 'AAPL', name: "Apple Inc.", numberOfShares: 10, amountInvested: 1500},
    { symbol: 'MSFT', name: "Microsoft Corporation", numberOfShares: 5, amountInvested: 2500},
    { symbol: 'TSLA', name: "Telsa Corporation", numberOfShares: 50, amountInvested: 20000}
  ];

  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/portfolio/");
      const chartData = generateChartData(res.data);
      setChartData(chartData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (chartData && chartRef.current) {
      renderChart(chartRef.current, chartData);
    }
  }, [chartData, chartRef]);

  return (
    <div>
      <h2 className="section-header"> My Portfolio </h2>
      <div ref={chartRef}></div>
      <PortfolioTable portfolio={portfolio} />
      <h2 className="section-header"> Marketplace</h2>
      <Marketplace Marketplace={Marketplace} />
    </div>
  )
}

export default PortfolioPage;
