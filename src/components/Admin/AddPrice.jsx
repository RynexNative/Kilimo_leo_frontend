import React, { useState, useEffect } from "react";
import axiosAuthApi from "../../utils/http";
import styles from "../style/Admin/AddPrice.module.css";

function AddPrice({ isOpen, onClose }) {
  const [markets, setMarkets] = useState([]);
  const [crops, setCrops] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  // Fetch markets na crops
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMarkets = await axiosAuthApi.get("/markets/markets/");
        setMarkets(resMarkets);

        const resCrops = await axiosAuthApi.get("/crops/croptype/");
        setCrops(resCrops);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Filter markets kwa location iliyochaguliwa
  useEffect(() => {
    if (selectedLocation) {
      const filtered = markets.filter(
        (m) => m.location === selectedLocation
      );
      setFilteredMarkets(filtered);
    } else {
      setFilteredMarkets([]);
    }
  }, [selectedLocation, markets]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        market: selectedMarket,
        crop: selectedCrop,
        price,
        date,
      };
      console.log(payload)
      await axiosAuthApi.post("/markets/addprice/", payload);
      alert("Bei imeongezwa kwa mafanikio!");

    onClose()
    } catch (error) {
      console.error("Error submitting price", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <div className={styles.formCont}>
        <h4>Ongeza Bei ya Zao</h4>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Mkoa */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            required
          >
            <option value="">--- Chagua Eneo ---</option>
            {[...new Set(markets?.map((m) => m.location))].map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Soko */}
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            disabled={!selectedLocation}
            required
          >
            <option value="">--- Chagua Soko ---</option>
            {filteredMarkets.map((market) => (
              <option key={market.id} value={market.id}>
                {market.name}
              </option>
            ))}
          </select>

          {/* Zao */}
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            required
          >
            <option value="">--- Chagua Zao ---</option>
            {crops?.map((crop) => (
              <option key={crop.id} value={crop.id}>
                {crop.name}
              </option>
            ))}
          </select>

          {/* Bei */}
          <input
            type="number"
            placeholder="Bei"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          {/* Tarehe */}
          <label>
            Tarehe
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <div className={styles.Button}>
            <button type="submit">Tuma</button>
            <button
              type="button"
              className={styles.gahiri}
              onClick={()=>onClose()}
            >
              Gahiri
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPrice;
