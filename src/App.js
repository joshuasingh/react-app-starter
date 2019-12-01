import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../src/pages/Homepage";
import Notfound from "../src/pages/Notfound";
import "./styles.css";
import ElaborationPage from "./pages/ElaborationPage";
import AdminPage from "./pages/AdminPage";
import TestFirstPage from "./pages/TestFirstPage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AdminLogin from "./pages/AdminLogin";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";
import setAuthorizationHeader from "./components/AdminComponents/setAuthorizationHeader";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data1: []
    };
  }

  //fetch data from the serv
  fetchData = async () => {
    await fetch(`https://nh65v.sse.codesandbox.io/allData`)
      .then(response => response.json())
      .then(res => {
        console.log("received", res);
        this.setState({
          data1: res
        });

        //setting the initial value of all the received data
        this.props.initialize(res);

        console.log("all", res);
      })
      .catch(err => {
        console.log("in error" + err);
      });
  };

  componentDidMount() {
    //get all data from the server
    this.fetchData();
  }

  render() {
    console.log("main index rendered again");
    return (
      <Router>
        <div className="App">
          <div id="page-body">
            <Switch>
              <Route
                path="/"
                component={() => <Homepage mainData={this.state.data1} />}
                exact
              />
              <Route
                path="/details/:topic"
                component={props => (
                  <ElaborationPage mainData={this.state.data1} {...props} />
                )}
                exact
              />
              <Route
                path="/AdminPage"
                component={() => (
                  // <AdminPage
                  //   mainData={this.state.data1}
                  //   fetchData={this.fetchData}
                  // />
                  <AdminLogin
                    mainData={this.state.data1}
                    fetchData={this.fetchData}
                  />
                )}
                exact
              />
              <Route
                path="/TestAdmin"
                component={() => (
                  <AdminPage
                    mainData={this.state.data1}
                    fetchData={this.fetchData}
                  />
                )}
                exact
              />

              <Route component={TestFirstPage} />
              <Route component={Notfound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }

  componentDidUpdate() {
    if (localStorage.getItem("jwtToken")) {
      setAuthorizationHeader(localStorage.getItem("jwtToken"));
    }

    this.state.data1.map((item, index) => {
      if (item.title === "NavBarDetials") {
        this.props.InitiateNavBar(item.links);
      }
    });
  }
}

const mapStateToProps = state => {
  return {
    user1: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: name => {
      dispatch({
        type: "login",
        payload: name
      });
    },
    initialize: name1 => {
      dispatch({
        type: "initial",
        payload: name1
      });
    },
    InitiateNavBar: val => {
      dispatch({
        type: "InitiateNavBar",
        payload: val
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
