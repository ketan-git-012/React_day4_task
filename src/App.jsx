import React from "react";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import "./App.css";
import Header from "./components/Header/header";
import SignIn from "./components/Login/login";
import DisplayProfile from "./components/Trainee/TraineeDetails";
import Profile from "./components/profile/profile";
import client from "./lib/apollo-client";
import TableTrainee from "./components/Table/Table";
import Welcome from "./components/textField/index";
import styles from "./components/textField/style";
import Slider from "./components/slider/index";
import { constants } from "./configs/configuration";
import globals from "./lib/util/math";
import Controlledinputs from "./components/controlledinputs";
import Math from "./components/Math/math";
import Home from "./components/home/Home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: "",
      invalid: "",
      currentImage: 0,
      game: "",
      hasCricket: "",
      hasFootball: "",
      isSports: false,
      images: [
        `${constants.PUBLIC_IMAGE_FOLDER}/images-1.jpg`,
        `${constants.PUBLIC_IMAGE_FOLDER}/images-2.png`,
        `${constants.PUBLIC_IMAGE_FOLDER}/images-3.jpg`,
      ],
      sports: [
        {
          label: `${constants.SPORT_CRICKET.label}`,
          value: `${constants.SPORT_CRICKET.value}`,
        },
        {
          label: `${constants.SPORTS_FOOTBALL.label}`,
          value: `${constants.SPORTS_FOOTBALL.value}`,
        },
      ],
      data: {
        name: "",
        sport: "",
        cricket: "",
        football: "",
      },
      options: [
        {
          label: "",
          value: "",
        },
      ],
    };

    this.switchImage = this.switchImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSports = this.handleSports.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSports(event) {
    this.state.options = [];
    console.log("selected sport:", event.target.value);
    this.state.data.sport = event.target.value;
    console.log(this.state.data);
    if (event.target.value == null || event.target.value === undefined) {
      this.setState({ isSports: false });
    } else {
      this.setState({ isSports: true });
    }
    if (this.state.data.sport === "Cricket") {
      for (let i = 0; i < constants.SPORT_CRICKET_OPTIONS.length; i++) {
        this.state.options[i] = constants.SPORT_CRICKET_OPTIONS[i];
      }
    } else if (this.state.data.sport === "Football") {
      for (let i = 0; i < constants.SPORT_FOOTBALL_OPTIONS.length; i++) {
        this.state.options[i] = constants.SPORT_FOOTBALL_OPTIONS[i];
      }
    }
  }
  handleName(event) {
    this.state.data.name = event.target.value;
    console.log(this.state.data);
  }
  handleSubmit(event) {
    if (this.state.data.sport === "Cricket") {
      this.state.data.cricket = event.target.value;
      this.state.data.football = "";
    }
    if (this.state.data.sport === "Football") {
      this.state.data.football = event.target.value;
      this.state.data.cricket = "";
    }
    console.log(this.state.data);
  }

  switchImage() {
    let currentIndex = globals.getRandomNumber(this.state.images.length);
    let updatedIndex = globals.getNextRoundRobin(
      this.state.images.length,
      currentIndex
    );
    this.setState({ currentImage: updatedIndex });
  }

  componentDidMount() {
    setInterval(this.switchImage, 1000);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.isValid(this.state);
    if (event.target.name === "game") {
      if (event.target.value === "cricket") {
        this.state.game = "cricket";
        this.state.hasCricket = "hidden";
      } else if (event.target.value === "football") {
        this.state.game = "football";
        this.state.hasFootball = "hidden";
      }
    }
  }

  isValid(arg) {
    arg.valid !== ""
      ? this.setState({ validClass: "success" })
      : this.setState({ validClass: "error" });
    Number.isInteger(arg.invalid) >= 0 && !isNaN(parseInt(arg.invalid))
      ? this.setState({ inValidClass: "success" })
      : this.setState({ inValidClass: "error" });
  }

  render() {
    return (
      <>
        <ThemeProvider>
          <ApolloProvider client={client}>
            <Router>
              <div>
                {sessionStorage.getItem("token") ? (
                  <Header />
                ) : (
                  <Redirect to={{ pathname: "/" }} />
                )}
                <Switch>
                  <Route exact path="/" component={SignIn} />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/profile" component={Profile} />
                  <Route
                    exact
                    path="/trainees"
                    render={() => <TableTrainee limit="20" skip="0" />}
                  />
                  <Route
                    exact
                    path="/math"
                    render={() => <Math first="2" second="1" operator="+" />}
                  />
                  <Route
                    exact
                    path="/slider"
                    render={() => (
                      <Slider
                        images={this.state.images}
                        currentImage={this.state.currentImage}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/form"
                    render={() => (
                      <Welcome
                        validClass={this.state.validClass}
                        valid={this.state.valid}
                        invalid={this.state.invalid}
                        inValidClass={this.state.inValidClass}
                        onChange={this.handleChange}
                        stylesheet={styles}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/controlledinputs"
                    render={() => (
                      <Controlledinputs
                        stylesheet={styles}
                        sports={this.state.sports}
                        sportsOptions={this.state.options}
                        isSports={this.state.isSports}
                        onSelect={this.handleName}
                        onChange={this.handleSports}
                        onClick={this.handleSubmit}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/trainee/:id"
                    render={(props) => (
                      <DisplayProfile id={this.props.id} {...props} />
                    )}
                  />
                </Switch>
              </div>
            </Router>
          </ApolloProvider>
        </ThemeProvider>
      </>
    );
  }
}
export default App;
