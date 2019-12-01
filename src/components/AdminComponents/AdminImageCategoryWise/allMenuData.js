import React from "react";

export const allMenuData = (data, ref) => {
  return (
    <div className="container-fluid" id="gridViewforAdmin">
      <div className="row">
        {data.map(item => {
          return item.title === "mainPageSlider" ? (
            <></>
          ) : (
            <>
              <div className="col-sm-4">{compdata(item, ref)}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

//set the layout of each menuitem
const compdata = (items, reff) => {
  return (
    <div className="MenuData">
      <div id="demo">
        <div className="wrapper">
          <div className="content">
            <ul>
              <a href="#">
                <li
                  onClick={() => {
                    // this.props.changeTheDetail(index);
                    getToEditMenu(items, reff);
                  }}
                >
                  Add or Remove Pics
                </li>
              </a>
            </ul>
          </div>
          <div className="parent">select</div>
        </div>
      </div>

      <p className="heading">{items.title}</p>
      <p className="details">{items.value}</p>
    </div>
  );
};

//getting edit menu
const getToEditMenu = (val, thiss) => {
  console.log("this id will be", val._id);

  thiss.props.getToEditMenu({ selectedData: val._id });
};
