import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentsService } from './commentsAPI'

const initialState = {
    changedPost: null,
    addcomment: ''
}

/* asyncthunk actions  */

// craete post redux action
export const creatComment = createAsyncThunk(
    'comments/create',
    async (data) => {
        const response = CommentsService.create(data)

        return response
    }
)


/* createtion du slice */

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    // reducers action ki ma nest7a9ech bech njib donnes mi serveru wala nsob fi serveur
    reducers: {

    },
    // actions qui depond de la communication avec le serveur
    extraReducers: {
        //create post http request 3 cases
        [creatComment.pending]: (state, action) => {
            state.addcomment = 'loading'
        },
        [creatComment.fulfilled]: (state, action) => {
            console.log(action.payload);
            // state.createdPostsocket = action.payload.data.data
            state.changedPost = action.payload.data.data
            state.addcomment = 'success'
        },
        [creatComment.rejected]: (state, action) => {
            state.addcomment = 'failure'
        },


    }

})

export const { } = commentsSlice.actions;

export const selectChangedPost = (state) => state.comments
export const addcomstatus = (state) => state.comments.addcomment

export default commentsSlice.reducer;