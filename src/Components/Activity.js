import React, { useEffect, useRef, useState } from 'react';
import { archiveCall,unarchiveCall } from '../Functions/ArchiveFunctions';

export default function Activity(props){
    const [showCalls,setShowCalls] = useState(false);
    const call = props.activities[props.activities.length-1];
    const timeoutRef = useRef(null);



    function handleOnClick(){
        if(props.activities.length > 1){
            let show = !showCalls
            setShowCalls(show);
            let element = document.getElementById(`parentActivity:${call.id}`)
            if(show){
                clearTimeout(timeoutRef.current);
                element.classList.toggle("hide",false)
                element.classList.toggle("hidden",false);
                element.classList.toggle("shown",true)
            }
            else{
                clearTimeout(timeoutRef.current);
                element.classList.toggle("hidden",false);
                element.classList.toggle("shown",false)
                element.classList.toggle("hide",true);
                timeoutRef.current = setTimeout(()=>{
                    element.classList.toggle("hidden",true);
                    element.classList.toggle("hide",false);
                },2000)

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

    }
    
    return (
        <>
            <div className='activity' onClick={handleOnClick}>
                <div className='callImage'>

                </div>
                <div className='callDetails'>
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
                <div className='callTime'>

                </div>
            </div>
            {props.activities.length >1 &&
                <div className="moreCalls hidden" id={`parentActivity:${call.id}`}>
                    {props.activities.reverse().map((activity,index)=>{
                        return <Activity activities={[activity]} key={index}/>
                    })}
                </div>
            }
        </>
    )


}