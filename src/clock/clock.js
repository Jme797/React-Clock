import React from "react";
import arrowIcon from "../images/arrow.svg";
import "./clock.css";

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      hour: null,
      minute: null,
      location: null,
      timezone: null,
    };
    this.updateDate();
  }
  componentWillMount() {
    this.updateDate();
  }

  async updateDate() {
    setInterval(() => {
      let date = new Date();

      this.setState({
        hour: date.getHours(),
        minute: date.getMinutes(),
      });
    }, 500);
    let t = this;
    await fetch("https://timezoneapi.io/api/ip/?token=aHBCnlqEUzFxiGIabmHZ")
      .then((res) => res.json())
      .then((response) => {
        response = response.data;
        console.log(response);
        t.setState({
          location: response.country + ", " + response.city,
          timezone: response.datetime.offset_tzab,
        });
        return true;
      })
      .catch(() => {
        console.log("Request failed");
      });
  }

  render() {
    return (
      <div class="clock_container">
        <div class="image_blur">
          <div class="container">
            <p>
              <q>
                The science of operations, as derived from mathematics more
                especially, is a science of itself, and has it's own abstract
                truth and value.
              </q>
            </p>
            <h3>Ada Lovelace</h3>
            <div class="clockFace">
              <h1>
                {this.state.hour}:{this.state.minute}
                <span class="timezone">{this.state.timezone}</span>
              </h1>
              <p class="location">In {this.state.location}</p>
            </div>
            <button class="morebutton">
              More
              <i class="arrowIcon_container">
                <img class="arrowIcon" src={arrowIcon}></img>
              </i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
