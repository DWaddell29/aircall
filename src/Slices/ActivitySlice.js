import {createSlice} from "@reduxjs/toolkit";


export const activitySlice = createSlice({
    name:"activities",
    initialState:{
        unarchivedCalls:[],
        archivedCalls:[]
    },
    reducers:{
        archiveCall: (state,action)=>{
            let id = action.payload.id;
            let call = this.unarchivedCalls.filter((call)=>call.id === id);
            let validCalls = this.unarchivedCalls.filter((call)=>call.id!==id);
            if(call.length === 0){
                return{...state}
            }
            else{
                return{
                    ...state,
                    unarchivedCalls:[...validCalls],
                    archivedCalls:[...state.archivedCalls,...call]
                }
            }
        },
        unarchiveCall:(state,action)=>{

        },
        unarchiveAllCalls:(state,action)=>{
            let newAr = this.archivedCalls;
            let unAr = this.unarchivedCalls
            return{
                ...state,
                archivedCalls:[...newAr,...unAr],
                unarchivedCalls:[]
            }
        },
        setArchivedCalls:(state,action)=>{
            return {
                ...state,
                archivedCalls:action.payload.archived
            }
        },
        setUnarchivedCalls:(state,action)=>{
            return {
                ...state,
                unarchivedCalls:action.payload.unarchived
            }
        }
    }
})

export const {archiveCall,unarchiveCall,unarchiveAllCalls,setArchivedCalls,setUnarchivedCalls} = activitySlice.actions;
export default activitySlice.reducer