import { createSlice } from "@reduxjs/toolkit"


const authInitState = {
    token: localStorage.getItem("token") || "",
    isUserLoggedIn: localStorage.getItem("token") ? true : false,
    userName: ""
}


const authSlice = createSlice({
    name: "auth",
    initialState: authInitState,
    reducers: {
        // setToken: (state, action) => {
        //     const token = action.payload.token
        //     state.token = token
        //     state.isUserLoggedIn = true
        //     localStorage.setItem("token", token)
        // },
        setToken: (state, action) => {
            
            const token = action.payload; 
            state.token = token;
            state.isUserLoggedIn = true;
            localStorage.setItem("token", token);
        },
        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            localStorage.removeItem("token")
        }
    }
})

export const { setToken, removeToken } = authSlice.actions
export default authSlice.reducer