import React from "react";
import "./style.css";

class TimeInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      timezone: null,
    };
    this.updateDate();
  }
  componentWillMount() {
    this.updateDate();
  }

  async updateDate() {
    let t = this;
    await fetch("https://timezoneapi.io/api/ip/?token=aHBCnlqEUzFxiGIabmHZ")
      .then((res) => res.json())
      .then((response) => {
        response = response.data;
        console.log(response);
        t.setState({
          timezone: response.offset_tzid,
        });
        return true;
      })
      .catch(() => {
        console.log("Request failed");
      });
  }

  render() {
    return <div class="clock_container"></div>;
  }
}

export default TimeInfo;
