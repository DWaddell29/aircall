import React, { useEffect } from 'react';
import { archiveCall,unarchiveCall } from '../Functions/ArchiveFunctions';

export default function Activity(props){
    
    useEffect(()=>{
        console.log(props.activities);
    },[])
    return (
        <div className='activity'>

        </div>
    )


}