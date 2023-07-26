import React, { useEffect, useRef, useState } from 'react';
import { setCallArchived,setCallUnarchived } from '../Functions/ArchiveFunctions';
import {Menu,MenuItem, ClickAwayListener} from "@mui/material"
import {MoreVert, Voicemail} from "@mui/icons-material";
import {SuccessfulInboundCall, UnsuccessfulInboundCall} from '../SVGs/inboundCall';
import { SuccessfulOutboundCal, UnsuccessfulOutboundCall } from '../SVGs/outboundCalls';

export default function Activity(props){
    const [showCalls,setShowCalls] = useState(false);
    const [anchorEl,setAnchorEl] = useState(null)
    const [showCallDetails, setShowCallDetails] = useState(false);
    const isOpen = Boolean(anchorEl);
    const call = props.activities[props.activities.length-1];
    const timeoutRef = useRef(null);


    function handleOnClick(e){
        if(props.activities.length > 1){
            let show = !showCalls
            setShowCalls(show);
            let activity = e.currentTarget;
            let element = document.getElementById(`parentActivity:${call.id}`)
            if(show){
                clearTimeout(timeoutRef.current);
                element.classList.toggle("hide",false)
                element.classList.toggle("hidden",false);
                element.classList.toggle("shown",true)
                activity.classList.toggle("dropdownVisible",true);
            }
            else{
                element.classList.toggle("hidden",false);
                element.classList.toggle("shown",false)
                element.classList.toggle("hide",true);
                timeoutRef.current = setTimeout(()=>{
                    activity.classList.toggle("dropdownVisible",false);
                    element.classList.toggle("hidden",true);
                    element.classList.toggle("hide",false);
                },500)

            }
            return;
        }

    }

    function getPhoneNumber(){
        if(call?.direction === "outbound"){
            return call?.to
        }
        else{
            return call?.from;
        }
    }

    function getCallDescription(){
        if(call?.direction === "outbound"){
            switch(call.call_type){
                case "missed":
                    return `Tried to call ${call?.to}`
                case "answered":
                    return `You called ${call?.to}`;
                case "voicemail":
                    return `You left a voicemail for ${call?.to}`;
            }
        }
        else{
            switch(call.call_type){
                case "missed":
                    return `Missed call from ${call?.from}`
                case "answered":
                    return `${call?.from} called you`;
                case "voicemail":
                    return `${call?.from} left a voicemail`;
            }
        }
    }

    function getTime(){
        let timeString = new Date(call.created_at).toLocaleTimeString();
        let splitTime = timeString.split(" ");
        let time = splitTime[0];
        let amPm = splitTime[1].replaceAll(".","").toUpperCase();
        splitTime = time.split(":")
        let hrs = splitTime[0].padStart(2,"0");
        let min = splitTime[1].padStart(2,"0");
        return `${hrs}:${min} ${amPm}`
    }

    function handleClickAway(e){
        setAnchorEl(null)

    }

    function getCallIcon(){
        if(call?.direction === "outbound"){
            switch(call.call_type){
                case "missed":
                    return <UnsuccessfulOutboundCall/>
                case "answered":
                    return <SuccessfulOutboundCal/>;
                case "voicemail":
                    return <Voicemail/>;
            }
        }
        else{
            switch(call.call_type){
                case "missed":
                    return <UnsuccessfulInboundCall/>;
                case "answered":
                    return <SuccessfulInboundCall/>;
                case "voicemail":
                    return <Voicemail/>;
            }
        }
    }
    
    return (
        <>
            <div className={`activity ${props?.activities?.length >1 ? "Clickable":""}`} onClick={handleOnClick}>
                <div className="mainActivityBody">
                    <div className='callImage'>
                        {getCallIcon()}
                    </div>
                    <div className='callDetailsBox'>
                        <div className="callDetails">
                            <div className='PhoneNumberLine'>
                                <p className='PhoneNumber'>
                                    {getPhoneNumber()}
                                </p>
                                {
                                    props?.activities.length > 1 && <div className='NumberOfCalls'>{props?.activities.length}</div>
                                }
                            </div>
                            <p className='callDescription'>
                                {getCallDescription()}
                            </p>
                        </div>
                        { props?.activities?.length === 1 &&
                        <>
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <MoreVert className='Clickable' onClick={(e)=>{setAnchorEl(e.currentTarget)}}/>
                            </ClickAwayListener>
                            <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} anchorOrigin={{vertical:"bottom",horizontal:"left"}} transformOrigin={{vertical:"top",horizontal:"right"}}>
                                {call.is_archived && <MenuItem onClick={()=>{setCallUnarchived(call.id);setAnchorEl(null)}}>Unarchive Call</MenuItem>}
                                {!call.is_archived && <MenuItem onClick={()=>{setCallArchived(call.id);setAnchorEl(null)}}>Archive Call</MenuItem>}
                                <MenuItem onClick={()=>{setAnchorEl(null);setShowCallDetails(true)}}>Show Call Details</MenuItem>
                            </Menu>
                        </> 
                        }
                    </div>
                    <div className='callTimeContainer'>
                        <p>{getTime()}</p>
                    </div>
                </div>
                { showCallDetails &&
                <div className="additionalDetails">
                    <p>From: {call.from}</p>
                    <p>To: {call.to}</p>
                    <p>Call Duration: {call.duration}</p>
                    <p>Archived: {call.is_archived ? "Yes" : "No"}</p>
                </div>
                }
            </div>
            {props.activities.length >1 &&
                <div className="moreCalls hidden" id={`parentActivity:${call.id}`}>
                    {props.activities.map((activity,index)=>{
                        return <Activity activities={[activity]} key={`activity:${activity.id}`}/>
                    })}
                </div>
            }
        </>
    )


}