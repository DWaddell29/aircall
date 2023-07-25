import Store from "../Store";
import { setArchivedCalls,setUnarchivedCalls,archiveCall,unarchiveCall,unarchiveAllCalls } from "../Slices/ActivitySlice";

const base_url = "https://cerulean-marlin-wig.cyclic.app/"
async function getAllCalls(){

    let response = await fetch(`${base_url}/activities`,{
        method:"GET",
    })
    if(response.status !== 200){
        return null
    }
    let data = await response.json();
    let unarchived = [];
    let archived = [];
    for(let i = 0; i < data.length; i++){
        let call = data[i]
        if(!call.call_type || !call.direction || !call.from || !call.to){
            continue;
        }
        if(data[i].is_archived){
            archived.push(data[i])
        }
        else{
            unarchived.push(data[i])
        }
    }
    Store.dispatch((setArchivedCalls({archived})));
    Store.dispatch(setUnarchivedCalls({unarchived}));
}


async function getCallDetails(id){
    let response = await fetch(`${base_url}/activities/${id}`)
    let data = await response.json();
    console.log(data);
}

export {getAllCalls,getCallDetails};
