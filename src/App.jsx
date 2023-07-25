import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { getAllCalls } from './Functions/QueryFunctions.js';
import {useSelector} from "react-redux";
import {Provider} from "react-redux"
import Store from './Store.js';

import Header from './Components/Header.jsx';
import Activity from './Components/Activity.js';
import Footer from "./Components/Footer.js"
import DateSeparator from './Components/DateSeparator.js';

const App = () => {

  const activities = useSelector((state)=>state.activities);
  const [view,setView] = useState("inbox"); //inbox or allcalls
  
  useEffect(()=>{
    getAllCalls();
  },[]);

  function getActivities(){
    let activitiesArr = activities.unarchivedCalls;
    if(view !== "inbox"){
      activitiesArr.concat(activities.archivedCalls);
    }
    let organizedActs = {}
    for(let i = 0; i < activitiesArr.length; i++){
      let phoneNumber = activitiesArr[i].direction === "inbound" ? activitiesArr[i].from : activitiesArr[i].to
      let dateString = activitiesArr[i].created_at.split("T")[0]
      let dateMap = organizedActs[dateString] ?? {}
      let phoneNumArr = dateMap[phoneNumber] ?? [];
      phoneNumArr.push(activitiesArr[i]);
      dateMap[phoneNumber] = phoneNumArr;
      organizedActs[dateString] = dateMap;
    }
    return organizedActs
  }


  const renderActivities = ()=>{
    let activitiesMap = getActivities();
    
    return(
      <>
        {Object.entries(activitiesMap).map(([dateString,dateActsObj])=>{
          return(
            <>
              <DateSeparator date={dateString}/>
              {
                Object.entries(dateActsObj).map(([PhoneNumber,activitiesArr])=>{
                  return <Activity activities={activitiesArr}/>
                })
              }
            </>
          )
        })}
      </>
    )
  }

  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
        {renderActivities()}
      </div>
      <Footer/>
    </div>
  );
};

ReactDOM.render(
<Provider store = {Store}>
<App/>
</Provider>
, document.getElementById('app'));

export default App;
