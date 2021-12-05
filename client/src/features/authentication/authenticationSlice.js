import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthenticationService } from './authenticationAPI'

const initialState = {
    registerstatus: '',
    errormessage: '',
    userDetails: null
}

/* asyncthunk actions  */

// register user redux action
export const register = createAsyncThunk(
    'users/register',
    async (data) => {
        const response = AuthenticationService.register(data)

        return response
    }
)

// login user redux action
export const login = createAsyncThunk(
    'users/login',
    async (data) => {
        const response = AuthenticationService.login(data)

        return response
    }
)

// logout user redux action
export const logout = createAsyncThunk(
    'users/logout',
    async () => {
        const response = AuthenticationService.logout()

        return response
    }
)

// logout user redux action
export const getMe = createAsyncThunk(
    'users/me',
    async () => {
        const response = AuthenticationService.getMe()

        return response
    }
)


// logout user redux action
export const uploadAvatar = createAsyncThunk(
    'users/avatar',
    async (data) => {
        const response = AuthenticationService.uploadAvatar(data)

        return response
    }
)

// update user redux action
export const update = createAsyncThunk(
    'users/update',
    async (data) => {
        const response = AuthenticationService.update(data)

        return response
    }
)




/* createtion du slice */

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    // reducers action ki ma nest7a9ech bech njib donnes mi serveru wala nsob fi serveur
    reducers: {

    },
    // actions qui depond de la communication avec le serveur
    extraReducers: {
        //register http request 3 cases
        [register.pending]: (state, action) => {
            state.registerstatus = 'loading'
        },
        [register.fulfilled]: (state, action) => {
            console.log(action.payload);
            if (action.payload.status === 200) {
                state.registerstatus = 'success'
            } else {
                state.registerstatus = 'failure'
                state.errormessage = action.payload.response.data.message
            }
        },
        [register.rejected]: (state, action) => {
            state.registerstatus = 'failure'
        },

        // login http request 3 cases
        [login.pending]: (state, action) => {

        },
        [login.fulfilled]: (state, action) => {
            console.log(action.payload);

            if (action.payload.status === 200) {

                window.location.href = '/posts'
            }

        },
        [login.rejected]: (state, action) => {

        },
        [logout.pending]: (state, action) => {

        },
        [logout.fulfilled]: (state, action) => {
            console.log(action.payload);
            window.location.href = "/"
        },
        [logout.rejected]: (state, action) => {

        },
        [getMe.pending]: (state, action) => {

        },
        [getMe.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.userDetails = action.payload.data.data
        },
        [getMe.rejected]: (state, action) => {

        },
        [uploadAvatar.pending]: (state, action) => {

        },
        [uploadAvatar.fulfilled]: (state, action) => {
            console.log(action.payload);
           state.userDetails = action.payload.data.data
        },
        [uploadAvatar.rejected]: (state, action) => {

        },
        [update.pending]: (state, action) => {

        },
        [update.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.userDetails = action.payload.data.data
        },
        [update.rejected]: (state, action) => {

        },
    }

})

export const { } = authenticationSlice.actions;


export const selectRegisterStatus = (state) => state.authentication.registerstatus
export const selectErorrStatus = (state) => state.authentication.errormessage
export const selectUserDetails = (state) => state.authentication.userDetails

export default authenticationSlice.reducer;