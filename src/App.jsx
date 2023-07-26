import React from 'react';
import {createRoot} from "react-dom/client";
import { useEffect, useState } from 'react';
import { getAllCalls } from './Functions/QueryFunctions.js';
import {useSelector} from "react-redux";
import {Provider} from "react-redux"
import Store from './Store.js';
import { setAllCallsArchived, setAllCallsUnarchived } from './Functions/ArchiveFunctions.js';

import Header from './Components/Header.jsx';
import Activity from './Components/Activity.js';
import Footer from "./Components/Footer.js"
import DateSeparator from './Components/DateSeparator.js';
import Inbox from './SVGs/Inbox.js';

const App = () => {

  const activities = useSelector((state)=>state.activities);
  const [view,setView] = useState("inbox"); //inbox or allcalls
  
  useEffect(()=>{
    getAllCalls();
  },[]);


  function getActivities(){
    let activitiesArr = [...activities.unarchivedCalls];
    if(view !== "inbox"){
      activitiesArr = activitiesArr.concat(activities.archivedCalls);
    }
    activitiesArr.sort((a,b)=>{
      if(new Date(a.created_at) < new Date(b.created_at)){
        return -1;
      }
      else{
        return 1
      }
    })
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
              <DateSeparator date={dateString} key={dateString}/>
              {
                Object.entries(dateActsObj).map(([PhoneNumber,activitiesArr],index)=>{
                  return <Activity activities={activitiesArr} key={`ParentActivity:${activitiesArr[activitiesArr.length-1].id}`}/>
                })
              }
            </>
          )
        })}
      </>
    )
  }

  function renderArchiveButton(){
    if(view === "inbox"){
      return (
        <button onClick={setAllCallsArchived} className='activity mainActivityBody Clickable'>
          <div className='callImage'>
            <Inbox/>
          </div>
          <div className='callDetailsBox'>
            <p>Archive all calls</p>
          </div>
          <div className='callTime'>

          </div>
        </button>
      )
    }
    return (
      <button onClick={setAllCallsUnarchived} className='activity mainActivityBody Clickable'>
        <div className='callImage'>
          <Inbox/>
        </div>
        <div className='callDetailsBox'>
          <p>Unarchive all calls</p>
        </div>
        <div className='callTime'>

        </div>
      </button>
    )
  }

  return (
    <div className='container'>
      <Header setView={setView}/>
      <div className="container-view">
        {renderArchiveButton()}
        {renderActivities()}
      </div>
      {/* <Footer/> */}
    </div>
  );
};

const container =  document.getElementById('app');
const root = createRoot(container)
root.render(
  <Provider store = {Store}>
    <App/>
  </Provider>
)

export default App;
