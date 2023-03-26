import React from "react";

class Welcome extends React.Component {
  render() {
    if (this.props.sale === true) {
      return (
        <div
          className="badge bg-dark text-white position-absolute"
          css="top: 0.5rem; right: 0.5rem"
        >
          Sale
        </div>
      );
    }
    return;
  }
}

export default Welcome;
