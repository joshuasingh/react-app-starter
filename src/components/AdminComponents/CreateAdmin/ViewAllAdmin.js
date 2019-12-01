import React from "react";
import { Rolling } from "react-loading-io";
import axios from "axios";
import { connect } from "react-redux";

class ViewAllAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.loader = this.loader.bind(this);
    this.removeIt = this.removeIt.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  allRef = null;

  testData = [
    { username: "joshua", email: "joshuasingh5222gmail.com" },
    { username: "joy", email: "joshuingh5222gmail.com" },
    { username: "joy", email: "joshuingh5222gmail.com" },
    { username: "joy", email: "joshuingh5222gmail.com" },
    { username: "joy", email: "joshuingh5222gmail.com" },
    { username: "joy", email: "joshuingh5222gmail.com" }
  ];

  //the sloading spinner
  // Use Component
  loader = () => {
    return (
      <div className="loaderImage" ref={ree => (this.loaderRef = ree)}>
        <Rolling size={100} />
      </div>
    );
  };

  //remove the account
  removeIt(idd) {
    //showing the loader
    this.loaderRef.style.display = "inline";

    //diming the background
    this.allRef.style.opacity = 0.2;

    var data1 = {
      id: idd
    };
    console.log("in removeit", idd);

    axios
      .post(
        "https://nh65v.sse.codesandbox.io/adminSetting/removeAccount",
        data1
      )
      .then(
        res => {
          if (res.data.error === "tokenPro") {
            this.loaderRef.style.display = "none";
            this.allRef.style.opacity = 1;

            alert("you need to login first ");
          } else if (res.data.error === "InternalError") {
            this.loaderRef.style.display = "none";
            this.allRef.style.opacity = 1;
            alert("Oops, there's was an error please try again");
          } else {
            console.log("uploading done");
            this.loaderRef.style.display = "none";
            this.allRef.style.opacity = 1;

            this.props.setAdminValues(res.data.result);
          }
        },
        err => {
          //clasing up loading icon
          this.loaderRef.style.display = "none";
          this.allRef.style.opacity = 1;
          alert("Oops, there's was an error please try again");

          console.log("in error here" + err);
        }
      );
  }

  goBack() {
    this.props.selection(-1);
  }

  render() {
    console.log("in render of viewalladmin", this.props.InLog.allAdmin);

    return (
      <>
        {this.loader()}
        {/* <div className="allRefering" ref={ree => (this.allRef = ree)}>
          <div>All The Admin Details</div>
          <div className="container-fluid" id="gridViewforAdmin">
            <div className="row">
              {this.testData.map(item => {
                return (
                  <>
                    {item.email !== "joshuasinf52@gmail.com" ? (
                      <div className="col-sm-4">
                        <div>UserName:{item.username}</div>
                        <div> Email:{item.email}</div>
                        <input
                          type="button"
                          name="remove"
                          value="Remove Account"
                          onClick={e => {
                            this.removeIt(item._id);
                          }}
                        />
                      </div>
                    ) : (
                      " "
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <input type="button" value="back" onClick={() => this.goBack()} />
        </div> */}
        <div className="row adminRow">
          {this.testData.map((item, key) => {
            console.log("getting url info", item);

            return (
              <div className="col-md-4 mb-5">
                <div className="card h-100 cardAdmin ">
                  <div className="card-body removeAdmin1">
                    <p className="card-text">{item.username}</p>
                  </div>
                  <div className="card-body removeAdmin">
                    <p className="card-text adminText">remove it</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    InLog: state.AdminLoginRights
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: name => {
      dispatch({
        type: "update",
        payload: name
      });
    },
    setAdminValues: val => {
      dispatch({
        type: "updateAdminList",
        payload: val
      });
    },
    selection: val => {
      dispatch({
        type: "toggle",
        payload: val
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAllAdmin);
