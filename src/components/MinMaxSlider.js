import React, { useEffect, useState } from "react";
import "./MinMaxSlider.modules.css";

const MinMaxSlider = ({ min, max, step, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const priceGap = 20;

  useEffect(() => {
    setMinValue(min);
    setMaxValue(max);
  }, [min, max]);

  useEffect(() => {
    if (onChange) {
      onChange({ min: minValue, max: maxValue });
    }
  }, [minValue, maxValue]);

  const handlePriceInputChange = (e, type) => {
    let val = parseInt(e.target.value);

    if (type === "min") {
      if (val + priceGap <= maxValue) {
        setMinValue(val);
      } else {
        setMinValue(maxValue - priceGap);
      }
    } else {
      if (val - priceGap >= minValue) {
        setMaxValue(val);
      } else {
        setMaxValue(minValue + priceGap);
      }
    }
  };

  const handleRangeInputChange = (e, type) => {
    let val = parseInt(e.target.value);

    if (type === "min") {
      if (val + priceGap <= maxValue) {
        setMinValue(val);
      } else {
        setMinValue(maxValue - priceGap);
      }
    } else {
      if (val - priceGap >= minValue) {
        setMaxValue(val);
      } else {
        setMaxValue(minValue + priceGap);
      }
    }
  };

  return (
    <div className="wrapper">
      <header>
        <h2>Price Range</h2>
        <p>Use slider or enter min and max price</p>
      </header>
      <div className="price-input">
        <div className="field">
          <span>Min</span>
          <input
            type="number"
            className="input-min"
            value={minValue}
            onChange={(e) => handlePriceInputChange(e, "min")}
          />
        </div>
        <div className="separator">-</div>
        <div className="field">
          <span>Max</span>
          <input
            type="number"
            className="input-max"
            value={maxValue}
            onChange={(e) => handlePriceInputChange(e, "max")}
          />
        </div>
      </div>
      <div className="slider">
        <div
          className="progress"
          style={{
            left: ((minValue - min) / (max - min)) * 100 + "%",
            right: ((max - maxValue) / (max - min)) * 100 + "%",
          }}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min={min}
          max={max}
          value={minValue}
          step={step}
          onChange={(e) => handleRangeInputChange(e, "min")}
        />
        <input
          type="range"
          className="range-max"
          min={min}
          max={max}
          value={maxValue}
          step={step}
          onChange={(e) => handleRangeInputChange(e, "max")}
        />
      </div>
    </div>
  );
};

export default MinMaxSlider;
