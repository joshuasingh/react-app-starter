import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

class AdminSideNav extends React.Component {
  //storing all menu item reference
  inputRefs = [];
  index = 0;

  constructor(props) {
    super(props);

    console.log("%c admin side nav const", "color:blue;");
    this.state = {
      menu_items: this.props.Menu_items,
      currentSelected: this.props.current,
      previousSelected: this.props.previous,
      first: 1
    };

    this.sideViewTab = this.sideViewTab.bind(this);
  }

  setRefs(arg) {
    this.inputRefs.push(arg);
  }

  putColor(index) {
    this.inputRefs[index].id = "rowTest_afterClick-admin";

    //for the first click....when nothing is clicked
    if (this.state.first === 1) {
      this.setState(prevState => ({
        currentSelected: index,
        previousSelected: index,
        first: 0
      }));
    } else {
      this.setState(prevState => ({
        currentSelected: index,
        previousSelected: prevState.currentSelected
      }));
    }
  }

  addHeaderFortabs(index) {
    console.log("tabs called");
    this.props.addHeader(index);
  }

  //give the current selected and prev selected to admin component
  getSelectionValue() {
    return [this.state.currentSelected, this.state.previousSelected];
  }

  componentWillMount() {
    //give the side nav reference to admin page to control it
    this.props.getStatusFromSN(this);
  }

  //item menu layout
  sideViewTab(val) {
    return (
      <>
        <h5 className="sideBarText-admin">{val}</h5>
      </>
    );
  }

  render() {
    console.log("calling render in admin side nav");
    return (
      <>
        <div className="container-fluid-admin">
          {this.state.menu_items.map((item, index) => {
            return (
              <div
                className="row-admin"
                id="rowTest_beforeClick-admin"
                ref={ree => this.setRefs(ree)}
                onClick={e => {
                  // this.props.changeTheDetail(index);
                  this.putColor(index);
                  this.addHeaderFortabs(index);
                }}
              >
                <div className="row-sm-4">{this.sideViewTab(item)}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  componentDidUpdate() {
    console.log(
      "in updates of side nav",
      this.state.currentSelected,
      this.state.previousSelected
    );

    if (this.state.currentSelected !== -1) {
      //setting for the clicked object ID
      this.inputRefs[this.state.currentSelected].id =
        "rowTest_afterClick-admin";

      if (this.state.previousSelected !== this.state.currentSelected) {
        //removing the clicked css from deselected option
        this.inputRefs[this.state.previousSelected].id =
          "rowTest_beforeClick-admin";
      }
    } else {
      //for when all the tab are closed
      if (this.state.previousSelected !== -1) {
        //removing the clicked css from deselected option
        this.inputRefs[this.state.previousSelected].id =
          "rowTest_beforeClick-admin";
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    //user1: state.adminUpperMenu
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
)(AdminSideNav);
