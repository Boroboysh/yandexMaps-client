import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

console.log( window.localStorage.getItem('ymaps_bearer_token'))

const config = {
    headers: {Authorization: `Bearer ${ window.localStorage.getItem('ymaps_bearer_token')}`}
};


export const registerApi = createAsyncThunk(
    'authSlice/register',
    async (payload) => {
        let response = await axios.post('auth/register', payload)

        return response
    }
);

export const loginApi = createAsyncThunk(
    'authSlice/auth',
    async (payload) => {
        let response = await axios.post('auth/login', payload)

        return response
    })

export const logoutApi = createAsyncThunk(
    'authSlice/logout',
    async () => {
        return await axios.get('auth/logout', {
            headers: {Authorization: `Bearer ${ window.localStorage.getItem('ymaps_bearer_token')}`}
        })
    }
)

export const userInfoApi = createAsyncThunk(
    'auth/user',
    async (payload) => {
        let response = await axios.get('auth/user', {
            headers: {Authorization: `Bearer ${ window.localStorage.getItem('ymaps_bearer_token')}`}
        })

        return response
    }
);


export const getPointerListApi = createAsyncThunk(
    'point/list',
    async (payload) => {
        let response = await axios.get('point/list', {
            headers: {Authorization: `Bearer ${ window.localStorage.getItem('ymaps_bearer_token')}`}
        })

        return response
    }
)

export const createNewPoint = createAsyncThunk(
    'point/new',
    async (payload) => {
        let response = await axios.post('point/new', payload, {
            headers: {Authorization: `Bearer ${ window.localStorage.getItem('ymaps_bearer_token')}`}
        })

        return response
    }
);

export const deletePointApi = createAsyncThunk(
    'point/delete',
    async (payload) => {
        let response = await axios.delete('point/delete/' + payload, {
            headers: {Authorization: `Bearer ${ window.localStorage.getItem('ymaps_bearer_token')}`}
        })

        return response
    }
);

export const updatePointApi = createAsyncThunk(
    'point/update',
    async (payload) => {
        let response = await axios.patch('point/update/' + payload.id, payload.state, {
            headers: {Authorization: `Bearer ${ window.localStorage.getItem('ymaps_bearer_token')}`}
        })

        return response
    }
);



