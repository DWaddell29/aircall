import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { getAllCalls } from './Functions/QueryFunctions.js';
import {useSelector} from "react-redux";
import {Provider} from "react-redux"
import Store from './Store.js';

import Header from './Components/Header.jsx';
import Activity from './Components/Activity.js';

const App = () => {

  const activities = useSelector((state)=>state.activities);
  const [view,setView] = useState("inbox"); //inbox or allcalls
  
  useEffect(()=>{
    getAllCalls();
  },[]);

  useEffect(()=>{
    console.log(activities)
  },[activities]);

  const renderActivities = ()=>{
    if(view === "inbox"){
      return(
        <>
        {activities.unarchivedCalls.map((call)=>{
        return <Activity activities={[call]}/>
        })}
        </>
      )
    }
    else{

    }
  }

  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
        {renderActivities()}
      </div>
    </div>
  );
};

ReactDOM.render(
<Provider store = {Store}>
<App/>
</Provider>
, document.getElementById('app'));

export default App;
