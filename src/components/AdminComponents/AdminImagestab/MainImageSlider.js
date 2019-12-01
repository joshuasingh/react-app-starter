import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Rolling } from "react-loading-io";

class MainImageSlider extends React.Component {
  data = ["first", "second", "third", "fourth", "fifth"];

  mainPageSliderInfo = {};

  //back button reference
  backButtonRef = null;

  //child component reference
  childRef = null;

  //selected images to be deleted
  onClickedImages = [];

  //for mainpageslider specific info
  mainPageSliderInfo = [];
  mainPageSliderInfo_Id = "";

  //refering the whole screen
  allRef = null;

  constructor(props) {
    super(props);

    this.state = {
      ind: -1,
      selectedFile: null,
      mainPageSliderInfo: this.props.data,
      uid: null
    };

    this.fetchDataMultiple = this.fetchDataMultiple.bind(this);
    this.fetchDataSingle = this.fetchDataSingle.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.selectedImg = this.selectedImg.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
    this.loader = this.loader.bind(this);
  }

  //fetch data from the server
  fetchDataMultiple = async datax => {
    await axios
      .post("https://nh65v.sse.codesandbox.io/mainImageslider/notSingle", datax)
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

            this.props.setUserInfo(res.data.result);
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
  };

  //reference to loader icon
  loaderRef = null;

  fileChangedHandler = event => {
    console.log("file uploaded");
    this.setState({ selectedFile: event.target.files });
  };

  //the sloading spinner
  // Use Component
  loader = () => {
    return (
      <div className="loaderImage" ref={ree => (this.loaderRef = ree)}>
        <Rolling size={100} />;
      </div>
    );
  };

  removeHandler = async () => {
    if (this.onClickedImages.length === 0) {
      alert("please select a  image to remove");
    } else {
      //setting up the loader image and diming backgroud
      //showing the loader
      this.loaderRef.style.display = "inline";

      //diming the background
      this.allRef.style.opacity = 0.2;

      var temp = [];

      this.onClickedImages.map(val => {
        temp.push({ Key: val });
      });

      this.onClickedImages = [];

      console.log("the selected data", this.mainPageSliderInfo_Id);

      const data = {
        url: temp,
        id: this.mainPageSliderInfo_Id
      };

      axios
        .post(
          "https://nh65v.sse.codesandbox.io/mainImages/removeUrlUpload",
          data
        )
        .then(
          res => {
            if (res.data.error === "tokenPro") {
              this.loaderRef.style.display = "none";

              //Undiming the background
              this.allRef.style.opacity = 0;

              alert("you need to login first ");
            } else if (res.data.error === "InternalError") {
              this.loaderRef.style.display = "none";

              //Undiming the background
              this.allRef.style.opacity = 0;

              alert("Oops, there's was an error please try again");
            } else {
              console.log("removal done", res.data.result);

              this.loaderRef.style.display = "none";

              // //Undiming the background
              this.allRef.style.opacity = 1;

              //updating the info
              this.props.setUserInfo(res.data.result);
            }
          },
          err => {}
        );
    }
  };

  uploadHandler = () => {
    if (this.state.selectedFile === null) {
      alert("please select a image");
    } else {
      var alen = this.state.selectedFile.length;
      console.log(this.state.selectedFile);
      var formData = new FormData();

      //showing the loader
      this.loaderRef.style.display = "inline";

      //diming the background
      this.allRef.style.opacity = 0.2;

      if (alen > 1) {
        formData.append("image", this.mainPageSliderInfo_Id);

        for (let k = 0; k < alen; k++) {
          console.log("in multi upload", this.state.selectedFile[k]);
          formData.append("image", this.state.selectedFile[k]);
        }

        this.fetchDataMultiple(formData);
      }
      if (alen === 1) {
        console.log("in single upload", this.state.selectedFile[0]);
        formData.append("image", this.mainPageSliderInfo_Id);
        formData.append("image", this.state.selectedFile[0]);

        console.log("testing it ", this.mainPageSliderInfo_Id);
        this.fetchDataSingle(formData);
      }
    }
  };

  //fetch data from the server
  fetchDataSingle = async data1 => {
    console.log("called it");

    axios
      .post("https://nh65v.sse.codesandbox.io/mainImageslider/single", data1)
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

            this.props.setUserInfo(res.data.result);
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
  };

  //upload url to mongo
  uploadUrl = async urls => {
    console.log("uploading url called", this.mainPageSliderInfo_Id);

    await fetch(`https://nh65v.sse.codesandbox.io/mainImages/urlUpload`, {
      method: "POST",
      body: JSON.stringify({
        url: urls,
        id: this.mainPageSliderInfo_Id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => {
        try {
          console.log("received settttttt", res);
          //remove previous selected state
          this.fetchImageUrl();
        } catch (e) {
          console.log("error" + e);
        }
        //this.imageurl = res;
      })
      .catch(err => {
        console.log("in error", err);
      });
  };

  //fetch data from image url
  //fetch data from the server
  fetchImageUrl = async () => {
    await fetch(`https://nh65v.sse.codesandbox.io/getMainImageSliderUrl`)
      .then(response => response.json())
      .then(res => {
        try {
          console.log("here it is", res);
          this.setState({
            mainPageSliderInfo: res
          });
        } catch (e) {
          console.log("error" + e);
        }
        //this.imageurl = res;
      })
      .catch(err => {
        console.log("in error" + err);
      });
  };

  selectedImg = (e, url, path) => {
    if (e.target.id === "selectImg") {
      var ind = this.onClickedImages.indexOf(path);
      console.log("index ", ind);
      this.onClickedImages.splice(ind, 1);
      e.target.id = "startImg";
    } else {
      this.onClickedImages.push(path);
      e.target.id = "selectImg";
    }

    console.log("selected image", this.onClickedImages);
  };

  //getting the image slider images
  componentWillMount() {}

  temp = {
    _id: "",
    title: "",
    pics: [],
    get getLength() {
      return this.pics;
    },
    set all(every) {
      console.log("all called");
      this._id = every._id;
      this.title = every.title;
      this.pics = every.pics;
    }
  };

  //getting mainplage slider info
  getSliderInfo() {
    try {
      this.props.user1.mainData.map((item, index) => {
        if (item.title === "mainPageSlider") {
          this.mainPageSliderInfo = item.pics;
          this.mainPageSliderInfo_Id = item._id;
        }
      });
    } catch (e) {}
  }

  render() {
    this.getSliderInfo();

    console.log("in render of MainPageslider", this.mainPageSliderInfo_Id);

    // var arr = JSON.parse(String(temp));

    return (
      <>
        {this.loader()}
        <div
          className="gallery"
          ref={ree => {
            this.allRef = ree;
          }}
        >
          {this.mainPageSliderInfo.map((item, key) => {
            console.log("getting url info", item);
            return (
              // <a href="https://picsum.photos/200/200" key={key}>
              <img
                src={item.url}
                alt=""
                id="startImg"
                onClick={e => this.selectedImg(e, item.url, item.path)}
              />
              // </a>
            );
          })}
        </div>
        <div className="addImage">
          <input type="file" onChange={this.fileChangedHandler} multiple />
          <button onClick={this.uploadHandler}>Upload!</button>
          <button onClick={this.removeHandler}>Remove!</button>
        </div>
      </>
    );
  }

  componentDidUpdate() {
    console.log("update from details called");
  }

  shouldComponentUpdate() {
    return true;
  }
}

const mapStateToProps = state => {
  return {
    user1: state.AdminDetailView
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
    initialize: name => {
      dispatch({
        type: "initial",
        payload: name
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainImageSlider);
