import React from "react";
import { useState, useEffect } from "react";
import Heading from "../components/Heading";
import ExpandedView from "../components/ExpandedView";
import { Redirect } from "react-router";
import AdminSideNav from "../components/AdminSideNav";
import AdminUpperMenu from "../components/AdminUpperMenu";
import AdminDetailView from "../components/AdminDetailView";
import { connect } from "react-redux";
import CommonNavBar from "../components/CommonNavBar";

const handleEvent = () => {
  return <Redirect to="/Expand" />;
};

class AdminPage extends React.Component {
  refers = null;
  refers_SN = null;
  signed = true;
  constructor(props) {
    super(props);
    this.state = {
      tempDataForHeader: [],
      data1: this.props.mainData,
      ind: -1,
      current: -1,
      previous: -1
    };

    this.goBackToInitial = this.goBackToInitial.bind(this);
    this.addHeader = this.addHeader.bind(this);
    this.removeHeader = this.removeHeader.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.setDetail = this.setDetail.bind(this);
    this.getStatusFromSN = this.getStatusFromSN.bind(this);
  }

  Menu_items = [
    "Add picture to HomeScreen ImageSlider",
    "Change Menu items",
    "Add pics to gallery",
    "settings"
  ];

  tab_Headings = [
    "HomeScreen_Images",
    "Menu_items",
    "Gallery_pics",
    "settings"
  ];

  //add tebs to upper menu
  addHeader(index) {
    var tempArray = [];
    tempArray = [...this.state.tempDataForHeader];
    if (!tempArray.includes(this.tab_Headings[index]))
      tempArray.push(this.tab_Headings[index]);

    //position of selected tab in header array
    var positiontab = tempArray.indexOf(this.tab_Headings[index]);

    //highlight the selected tab in upper menu
    this.props.switchTab(positiontab);

    console.log("in changing tabs", index);
    //setting state for the temp header data
    this.setState({
      tempDataForHeader: tempArray,
      ind: index
    });

    localStorage.setItem("persistedArray", JSON.stringify(tempArray));
  }

  //if there is no tab present all nothing should shown on details view
  goBackToInitial() {
    console.log("gone back to initial");
    this.refers.changeBackToStart();
  }

  //get reference from the side nav bar
  getStatusFromSN(ref) {
    this.refers_SN = ref;
  }

  //change detail tab data
  setDetail(val) {
    var index = this.tab_Headings.indexOf(val);

    var temp = this.refers_SN.getSelectionValue();
    console.log("setdetails of admin page", index, temp[0]);

    //change the state of detail view
    this.setState({
      ind: index,
      current: index,
      previous: temp[0]
    });

    this.refers_SN.setState({
      currentSelected: index,
      previousSelected: temp[0]
    });
  }

  removeHeader(afterRemoval, value, lastInArray, selected) {
    var index = this.state.tempDataForHeader.indexOf(value);

    var current = null;
    if (index === 0) {
      if (index === this.state.tempDataForHeader.length - 1) {
        current = -1;
      } else {
        current = this.tab_Headings.indexOf(
          this.state.tempDataForHeader[index + 1]
        );
      }
    } else {
      current = this.tab_Headings.indexOf(
        this.state.tempDataForHeader[index - 1]
      );
    }

    var temp = this.refers_SN.getSelectionValue();

    console.log(
      "in afterRemoval",
      afterRemoval.length,
      " length ",
      this.state.tempDataForHeader.length - 1,
      selected
    );

    localStorage.setItem("persistedArray", JSON.stringify(afterRemoval));

    //the tab being removed was already
    if (selected) {
      //Checking if all the tabs are cancelled so as to restore initial condition...
      if (afterRemoval.length === 0) {
        this.refers_SN.setState({
          currentSelected: -1,
          previousSelected: temp[0],
          first: 1
        });
      } else {
        this.refers_SN.setState({
          currentSelected: current,
          previousSelected: temp[0]
        });
      }

      //for all detail view change here because selected one removed
      this.setState({
        ind: current,
        tempDataForHeader: [...afterRemoval]
      });
    } //if the tab being cancelled was not selected so no changes to be done in sideNav or detail view
    else {
      if (afterRemoval.length === 0) {
        this.refers_SN.setState({
          currentSelected: -1,
          previousSelected: temp[0],
          first: 1
        });
      }

      //for all detail view change here nothing because the selected one wasn't removed
      this.setState({
        tempDataForHeader: [...afterRemoval]
      });
    }
  }

  //getting the reference of details tab
  getStatus(refer) {
    console.log("reference set");
    this.refers = refer;
  }

  componentWillMount() {
    if (
      this.state.tempDataForHeader.length === 0 &&
      localStorage.getItem("persistedArray") !== null
    ) {
      console.log("setting local first time");
      this.setState({
        tempDataForHeader: JSON.parse(localStorage.getItem("persistedArray"))
      });
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    console.log("admin page rrender called", this.state.data1);
    return (
      <>
        <div className="AdminPage">
          <div className="AdminNavBar">
            <CommonNavBar signed={this.signed} />
          </div>
          <div className="AdminUpperMenu">
            <AdminUpperMenu
              tempDataForHeader={this.state.tempDataForHeader}
              removeHeader={this.removeHeader}
              setDetail={this.setDetail}
              goBackToInitial={this.goBackToInitial}
            />
          </div>
          <div className="AdminSideNav">
            <AdminSideNav
              Menu_items={this.Menu_items}
              addHeader={this.addHeader}
              getStatusFromSN={this.getStatusFromSN}
              current={this.state.current}
              previous={this.state.previous}
            />
          </div>
          <div className="adminDetailView">
            <AdminDetailView
              getStatus={this.getStatus}
              tempDataForHeader={this.state.tempDataForHeader}
              data={this.state.data1}
              fetchData={this.props.fetchData}
              addDataReceived={this}
              selectedInstant={this.state.ind}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user1: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchTab: value => {
      dispatch({
        type: "switchTab",
        payload: value
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
