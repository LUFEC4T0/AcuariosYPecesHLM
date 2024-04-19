import React from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions';


function Dashboard () {
    const dispatch = useDispatch();
    const { login, current } = authActions;
    const token = localStorage.getItem('token')

    axios.get('/api/current/', {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        console.log("UserCurrent", res.data);

        dispatch(current(res.data))
    })
    .catch(console.log("Error al buscar al current"))
    return <>
    
    </>
}

export default Dashboard;