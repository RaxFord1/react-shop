import React from "react";

class CurrencyValue extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const currency = this.props.currency;
    const value = this.props.value;

    return (
      <fieldset>
        <legend>Значення в {currency}</legend>
        <input value={value} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

const toUAN = (value) => {
  return value * 37.7;
};

const toUSD = (value) => {
  return value / 37.7;
};

class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currency: "USD", value: props.value };
  }

  handleChangeUSD = (value) => {
    this.setState({ currency: "USD", value });
  };
  handleChangeUAN = (value) => {
    this.setState({ currency: "UAN", value });
  };

  render() {
    const value = this.state.value;
    const currency = this.state.currency;

    const usd = currency === "USD" ? value : tryConvert(value, toUSD);
    const uan = currency === "UAN" ? value : tryConvert(value, toUAN);

    return (
      <div>
        <CurrencyValue
          currency={"USD"}
          value={usd}
          onChange={this.handleChangeUSD}
        />
        <CurrencyValue
          currency={"UAN"}
          value={uan}
          onChange={this.handleChangeUAN}
        />
      </div>
    );
  }
}

function tryConvert(value, convert) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export default Currency;
