import { createAction } from "@reduxjs/toolkit";

const current = createAction('CURRENT', (data)=>{
    
    const dataFixed ={
        name: data.name+' '+ data.lastName,
        email: data.email
    }
    return {
        payload: {
            ...dataFixed,
            loggedIn:true
        }
    }
})

const login = createAction('LOGIN', (token)=>{
    localStorage.setItem('token', token)
    return {
        payload: {
            token,
            timestamps: Date.now()
        }
    }
})

const logout = createAction('LOGOUT');

const actions = {
    current,
    login,
    logout
}

export default  actions;