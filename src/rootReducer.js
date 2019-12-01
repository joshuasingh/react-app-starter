import { combineReducers } from "redux";
import reducer1 from "./allReducer/reducer1";
import authReducer from "./allReducer/authReducer";
import AdminDetailView from "./allReducer/AdminDetailView";
import addingImageRed from "./allReducer/addingImageRed";
import AdminLoginRights from "./allReducer/AdminLoginRights";
import AdminSettingSel from "./allReducer/AdminSettingSel";
import ImageSelection from "./allReducer/ElabContainer/ImageSelection";
import Referencing from "./allReducer/ElabContainer/Referencing";
import ShowExpandedImage from "./allReducer/ElabContainer/ShowExpandedImage";
import NavbarReduce from "./allReducer/NavbarReduce";
import adminUpperMenu from "./allReducer/adminUpperMenu";

export default combineReducers({
  reducer1,

  AdminDetailView,
  addingImageRed,
  AdminLoginRights,
  AdminSettingSel,
  ImageSelection,
  Referencing,
  ShowExpandedImage,
  NavbarReduce,
  adminUpperMenu,
  authReducer
});
