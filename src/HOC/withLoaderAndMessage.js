import React, { Component } from "react";

export const withLoaderAndMessage = (OriginalComponent) => {
  return class NewComponent extends Component {
    constructor(props) {
      super();

      this.state = {
        loader: false,
        dataLength: 20,
      };
    }

    render() {
      const { loader, dataLength } = this.state;
      return (
        <OriginalComponent
          {...this.props}
          loader={loader}
          dataLength={dataLength}
        />
      );
    }
  };
};
