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
            let call = state.unarchivedCalls.filter((call)=>call.id === id);
            let updatedCall = [...call]
            for(let i = 0; i < updatedCall.length; i++){
                updatedCall[i].is_archived = true
            }
            let validCalls = state.unarchivedCalls.filter((call)=>call.id!==id);
            if(call.length === 0){
                return{...state}
            }
            else{
                state.unarchivedCalls = [...validCalls],
                state.archivedCalls = [...state.archivedCalls,...updatedCall]
            }
        },
        unarchiveCall:(state,action)=>{
            let id = action.payload.id;
            let call = state.archivedCalls.filter((call)=>call.id === id);
            for(let i = 0; i < call.length; i++){
                call[i].is_archived = false
            }
            let validCalls = state.archivedCalls.filter((call)=>call.id!==id);
            if(call.length === 0){
                return{...state}
            }
            else{
                state.archivedCalls=[...validCalls],
                state.unarchivedCalls=[...state.unarchivedCalls,...call]
            }

        },
        unarchiveAllCalls:(state,action)=>{
            for(let i = 0; i < state.archivedCalls.length; i++){
                state.archivedCalls[i].is_archived = false;
            }
            state.unarchivedCalls = [...state.unarchivedCalls,...state.archivedCalls];
            state.archivedCalls = []
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