import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";
import axios from "axios";

function App() {
  const [fromCurrency, setFromCurrency] = useState("AUD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const [rates, setRates] = useState({});

  useEffect(() => {
    axios("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.data)
      .then((data) => {
        setRates(data.rates);
        console.log(data.rates);
      })
      .catch((err) => {
        console.warn(err);
        alert("не удалось получить данные");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency]
    const result = price * rates[toCurrency]
    setFromPrice(value);
    setToPrice(result)
  };

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value
    setFromPrice(result)
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
