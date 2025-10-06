import React, { useState, useEffect } from 'react'
import styles from "../style/Admin/Market_price.module.css";
import AddProductModal from "../../components/former/AddProductModal";
import PriceTrendChart from "../../components/former/PriceTrandChart";
import axiosAuthApi from "../../utils/http";
import AddPrice from './AddPrice';





// const data1 = [
//     {
//         "id": 1,
//         "name": "kariako",
//         "location": "Dar Es Salaam",
//         "P": "Tanzania"
//     },
//     {
//         "id": 2,
//         "name": "Kilombero",
//         "location": "Arusha",
//         "description": "Tanzania"
//     },
//     {
//         "id": 3,
//         "name": "Msufini",
//         "location": "Singida",
//         "description": "Tanzania"
//     },
//     {
//         "id": 4,
//         "name": "mgunda",
//         "location": "Dar Es Salaam",
//         "description": "Tanzania"
//     },
//     {
//         "id": 5,
//         "name": "Kinondoni",
//         "location": "Dar Es Salaam",
//         "description": "Tanzania"
//     }
// ]

function Market_price() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState(); // sasa hii itakuja kutoka API
  const [region, setRegion] = useState("");
  const [market, setMarket] = useState("");
  const [markets, setMarkets] = useState([]); // list ya markets kutoka API
  // const [showModal]

  // 1. Fetch markets list
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await axiosAuthApi.get("/markets/markets/");
        setMarkets(res); // <-- tunadhani hii inarudisha array ya markets
      } catch (error) {
        console.error("Market list error:", error);
      }
    };
    fetchMarkets();
  }, []);

  // 2. Fetch market details (prices + trends) ukichagua soko
  useEffect(() => {
    const fetchMarketDetails = async () => {
      if (!market) return;

      try {
        const res = await axiosAuthApi.get(`/markets/markets/${market}/`);
        const transformedMap = {};

        res.prices.forEach((p) => {
          // Filter all trends kwa crop hii
          const cropTrends = res.trends.filter((t) => t.crop === p.crop);
        
          // Chagua latest trend kwa tarehe
          const latestTrend = cropTrends.sort(
            (a, b) => new Date(b.trend_date) - new Date(a.trend_date)
          )[0]; // latest trend
        
          // Latest demand
          const demand = res.demands
            .filter((d) => d.crop === p.crop)
            .sort((a, b) => new Date(b.recorded_date) - new Date(a.recorded_date))[0];
        
          if (!transformedMap[p.crop]) {
            const priceHistory = [];
        
            // Historical trends
            cropTrends.forEach((t) => {
              if (!priceHistory.find(ph => ph.date === t.trend_date)) {
                priceHistory.push({
                  date: t.trend_date,
                  price: parseFloat(t.trend_description.match(/\d+/)?.[0] || p.price),
                });
              }
            });
        
            // Latest/current price
            if (!priceHistory.find(ph => ph.date === p.date)) {
              priceHistory.push({
                date: p.date,
                price: parseFloat(p.price),
              });
            } else {
              const idx = priceHistory.findIndex(ph => ph.date === p.date);
              priceHistory[idx].price = parseFloat(p.price);
            }
        
            priceHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
        
            transformedMap[p.crop] = {
              id: p.id,
              crop: p.crop_name,
              location: res.location,
              market: res.name,
              price: parseFloat(p.price),
              change: latestTrend
                ? `${parseFloat(latestTrend.price_change_percentage)}%`
                : "0%",
              demand: demand ? demand.demand_level : "Unknown",
              priceHistory,
            };
          } else {
            // Ikiwa crop ipo tayari, update historical price na demand
            if (!transformedMap[p.crop].priceHistory.find(ph => ph.date === p.date)) {
              transformedMap[p.crop].priceHistory.push({
                date: p.date,
                price: parseFloat(p.price),
              });
            } else {
              const idx = transformedMap[p.crop].priceHistory.findIndex(ph => ph.date === p.date);
              transformedMap[p.crop].priceHistory[idx].price = parseFloat(p.price);
            }
        
            if (demand) transformedMap[p.crop].demand = demand.demand_level;
        
            // Update change
            if (latestTrend) {
              transformedMap[p.crop].change = `${parseFloat(latestTrend.price_change_percentage)}%`;
            }
        
            transformedMap[p.crop].priceHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
          }
        });
        
        

        setProducts(Object.values(transformedMap));
      } catch (error) {
        console.error("Market details error:", error);
      }
    };

    fetchMarketDetails();
  }, [market, showModal]);




  const handleAddProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
  };

// console.log(products)
  // Fungua priceHistory kuwa flat data kwa chart
  const chartData = products?.flatMap((item) =>
    // console.log(item)
    item.priceHistory.map((ph) => ({
      crop: item.crop,
      date: ph.date,
      price: ph.price,
    }))

  );
  // console.log(chartData)
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setMarket("");
  };

  const handleMarketChange = (e) => {
    setMarket(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Bei za Mazao</h2>
      </div>

      {/* ---- Filter Section ---- */}
      <div className={styles.filter}>
        <label>
          Chagua Mkoa
          <select value={region} onChange={handleRegionChange}>
            <option value="">-- Chagua Mkoa --</option>
            {[...new Set(markets.map((m) => m.location))].map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </label>

        <br />
        <br />

        <label>
          Chagua Soko
          <select
            value={market}
            onChange={handleMarketChange}
            disabled={!region}
          >
            <option value="">-- Chagua Soko --</option>
            {markets
              .filter((m) => m.location === region)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
          </select>
        </label>
        <button className={styles.addButton} onClick={()=>setShowModal(true)}>Weka Bei</button>
      </div>

      {/* ---- Products Table ---- */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Zao</th>
            <th>Bei (TSh/kg)</th>
            <th>Mkoa</th>
            <th>Soko</th>
            <th>Mabadiliko</th>
            <th>Uhitaji</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item) => (
            <tr key={item.id}>
              <td>{item.crop}</td>
              <td>{item.price}</td>
              <td>{item.location}</td>
              <td>{item.market}</td>
              <td
                className={
                  item.change.startsWith("+")
                    ? styles.positive
                    : item.change.startsWith("-")
                      ? styles.negative
                      : styles.neutral
                }
              >
                {item.change}
              </td>
              <td>{item.demand}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---- Other Components ---- */}
      {/* <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddProduct}
      /> */}

      {/* Pass filtered data to chart */}
      <PriceTrendChart data={chartData} />

          <AddPrice 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          />
    </div>
  );
}

export default Market_price