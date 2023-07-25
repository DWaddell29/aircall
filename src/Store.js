import {configureStore} from "@reduxjs/toolkit"
import  activitySlice  from "./Slices/ActivitySlice";


export default configureStore({
    reducer:{
        activities:activitySlice
    }
});