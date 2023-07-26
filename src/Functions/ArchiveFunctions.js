import Store from "../Store";
import { setArchivedCalls,setUnarchivedCalls,archiveCall,unarchiveCall,unarchiveAllCalls } from "../Slices/ActivitySlice";
const base_url = "https://cerulean-marlin-wig.cyclic.app/"

async function setCallArchived(id){
    let response = await fetch(`${base_url}/activities/${id}`,{
        method:"PATCH",
        headers:{
            "Content-type":"Application/json"
        },
        body:JSON.stringify({is_archived:true})
    })
    console.log(response.status)
    if(response.status === 200){
        Store.dispatch(archiveCall({id}))
    }
    return;
}

async function setCallUnarchived(id){
    let response = await fetch(`${base_url}/activities/${id}`,{
        method:"PATCH",
        headers:{
            "Content-type":"Application/json"
        },
        body:JSON.stringify({is_archived:false})
    })
    if(response.status === 200){
        Store.dispatch(unarchiveCall({id}))
    }
    return;
}

async function setAllCallsUnarchived(){
    let response = await fetch(`${base_url}/reset`,{
        method:"PATCH"
    })
    if(response.status!== 200){
        return;
    }
    Store.dispatch(unarchiveAllCalls());

}

async function setAllCallsArchived(){
    let currState = Store.getState()
    let unarchivedCalls = currState.activities.unarchivedCalls;
    let promises = [];
    for(let i = 0; i < unarchivedCalls.length; i++){
        let id = unarchivedCalls[i].id
        let response = fetch(`${base_url}/activities/${id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"Application/json"
            },
            body:JSON.stringify({is_archived:true})
        })
        promises.push(response)
    }
    Promise.all(promises).then((responses)=>{
        for(let i = 0; i <responses.length; i++){
            let id = responses[i].url.replace(`${base_url}/activities/`,"");
            if(responses[i].status === 200){
                Store.dispatch(archiveCall({id}))
            }
        }
    });
}

export {setAllCallsUnarchived, setCallArchived, setCallUnarchived, setAllCallsArchived}