import React from "react";
import getMonthString from "../Functions/getMonthString";
import Divider from "@mui/material/Divider"

export default function DateSeparator(props){
    let splitDate = props?.date?.split("-")
    return (
        <Divider>{props.date}</Divider>
    );
}