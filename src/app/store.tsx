import { configureStore } from "@reduxjs/toolkit";
import candidateData from "../features/candidate/candidateSlice"
import candidateDatas from "../features/candidate/candidateDataSlice"
import masterData from "../features/masterData/masterDataSlice"


const store = configureStore({
    reducer: {
        candidatedata: candidateData,
        candidatealldata: candidateDatas,
        masterdata: masterData,
        
    }
}) 

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch