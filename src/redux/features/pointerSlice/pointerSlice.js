import {createSlice} from "@reduxjs/toolkit";
import {createNewPoint, deletePointApi, getPointerListApi, updatePointApi} from "../../../api/api";

export const pointerSlice = createSlice({
    name: 'pointer',
    initialState: {
        pointers: [],
        status: 'idle',
        errorValidate: [],
        updateErrorValidate: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPointerListApi.fulfilled, (state, {payload}) => {
                state.pointers = payload.data;
            })
            .addCase(getPointerListApi.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getPointerListApi.rejected, (state) => {
                state.status = 'reject';
            })


            .addCase(createNewPoint.fulfilled, (state, {payload}) => {
                // clearing current errors
                state.errorValidate = []

                if (payload.data.status === 'error') {
                    let indexArray = 0;
                    let errorsArray = []

                    console.log(payload.data)

                    for (let key in payload.data.message) {
                        errorsArray[indexArray] = payload.data.message[key][0]
                        indexArray++;
                    }

                    console.log(errorsArray)

                    // output current errors
                    state.errorValidate = errorsArray
                } else {
                    state.pointers = payload.data
                    alert('Point created');
                }
            })
            .addCase(createNewPoint.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(createNewPoint.rejected, (state) => {
                state.status = 'reject';
            })


            .addCase(deletePointApi.fulfilled, (state, {payload}) => {
                state.pointers = payload.data
                alert('Deleted')
            })
            .addCase(deletePointApi.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deletePointApi.rejected, (state) => {
                state.status = 'reject';
            })


            .addCase(updatePointApi.fulfilled, (state, {payload}) => {
                // clearing current errors
                state.updateErrorValidate = [];

                if (payload.data.status === 'error') {
                    let indexArray = 0;
                    let errorsArray = []

                    console.log(payload.data)

                    for (let key in payload.data.message) {
                        errorsArray[indexArray] = payload.data.message[key][0]
                        indexArray++;
                    }

                    alert(errorsArray)

                    // output current errors
                    state.updateErrorValidate = errorsArray
                } else {
                    state.pointers = payload.data;
                    state.status = 'idle';

                    alert('Updated');
                }
            })
            .addCase(updatePointApi.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(updatePointApi.rejected, (state) => {
                state.status = 'reject';
            })

    }
})

export const {} = pointerSlice.actions;

export default pointerSlice.reducer;