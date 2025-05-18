import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name:'room',
    initialState:{
        creater:"",
        roomid:"",
    },
    reducers:{
        addRoomData:(state,action)=>{
          state.creater = action.payload.creater;
          state.roomid = action.payload.roomid;
        },
        removeRoomData:(state,action)=>{
            state.creater="";
            state.roomid="";
        }

    }
})

export const {addRoomData,removeRoomData} = roomSlice.actions;

export default roomSlice.reducer;