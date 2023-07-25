import React from "react";
import getMonthString from "../Functions/getMonthString";

export default function DateSeparator(props){
    let splitDate = props?.date?.split("-")
    console.log(splitDate);
    return (
        <p className="DateSeperator">{props.date}</p>
    );
}