import {createSlice} from "@reduxjs/toolkit";
import {loginApi, logoutApi, registerApi, userInfoApi} from "../../../api/api";

export const authSlice = createSlice({
        name: 'login',
        initialState: {
            login: undefined,
            status: 'idle',
            errorValidate: []
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(loginApi.fulfilled, (state, {payload}) => {
                    if (payload.data.status === 'error') {
                        console.log(payload.data);

                        let indexArray = 0;
                        let errorsArray = []

                        for (let key in payload.data.message) {
                            errorsArray[indexArray] = payload.data.message[key][0]
                            indexArray++;

                            console.log(`ОШибка: ${payload.data.message[key][0]}`)
                        }

                        console.log(`Массив ошибок: ${errorsArray}`)



                        state.errorValidate = []
                        state.errorValidate = errorsArray

                    } else {
                        console.log(payload.data);

                        state.login = payload.data.user.name;

                        window.localStorage.setItem('ymaps_bearer_token', payload.data.authorisation.token);

                        alert('You are logged in')
                    }

                })
                .addCase(loginApi.pending, (state) => {
                    state.status = 'pending';
                })
                .addCase(loginApi.rejected, (state) => {
                    alert('Timeout');
                    state.status = 'reject';
                })

                .addCase(logoutApi.fulfilled, (state) => {
                    state.login = undefined;
                    state.status = 'idle';

                    console.log(window.localStorage)

                    window.localStorage.removeItem('ymaps_bearer_token');

                    console.log(window.localStorage)
                })
                .addCase(logoutApi.pending, (state) => {
                    state.status = 'pending';
                })
                .addCase(logoutApi.rejected, (state) => {
                    state.status = 'reject';
                })
                // .addCase(logoutApi)

                .addCase(registerApi.fulfilled, (state, {payload}) => {
                    if (payload.data.status === 'error') {
                        let indexArray = 0;
                        let errorsArray = []

                        console.log(payload.data)

                        for (let key in payload.data.message) {
                            errorsArray[indexArray] = payload.data.message[key][0]
                            indexArray++;
                        }

                        console.log(errorsArray)

                        // clearing current errors
                        state.errorValidate = []

                        // output current errors
                        state.errorValidate = errorsArray
                    } else {
                        state.login = payload.data.user.name;

                        window.localStorage.setItem('ymaps_bearer_token', payload.data.authorisation.token);

                        alert(payload.data.message)

                        console.log(payload.data)
                    }
                })
                .addCase(registerApi.pending, (state) => {
                    state.status = 'pending';
                    console.log('pending')
                })
                .addCase(registerApi.rejected, (state) => {
                    state.status = 'reject';
                    console.log('Reject')
                })

                .addCase(userInfoApi.fulfilled, (state, {payload}) => {
                    state.login = payload.data.user.name;
                })
                .addCase(userInfoApi.pending, (state, payload) => {
                    state.status = 'pending';
                })
                .addCase(userInfoApi.rejected, (state, payload) => {
                    state.login = '';
                    state.status = 'idle';
                })
        }
    }
)

export const {} = authSlice.actions;

export default authSlice.reducer;