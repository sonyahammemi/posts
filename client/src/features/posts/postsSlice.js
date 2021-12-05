import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostsService } from './postsAPI'

const initialState = {

    posts: [],
    myposts: [],
    // new craeted and saved  post in database to emit it in to the socket server 
    createdPostsocket: null,
    clickedOption: 'posts',
    likedPost: null
}

/* asyncthunk actions  */

// craete post redux action
export const creatPost = createAsyncThunk(
    'posts/create',
    async (data) => {
        const response = PostsService.create(data)

        return response
    }
)

// get posts redux action
export const getPosts = createAsyncThunk(
    'posts/getall',
    async () => {
        const response = PostsService.getPosts()

        return response
    }
)


// connected user  posts redux action
export const getMyPosts = createAsyncThunk(
    'posts/myposts',
    async () => {
        const response = PostsService.getMyPosts()

        return response
    }
)

// like   post redux action
export const Like = createAsyncThunk(
    'posts/like',
    async (id) => {
        const response = PostsService.like(id)

        return response
    }
)

// dislike post redux action
export const Dislike = createAsyncThunk(
    'posts/dislike',
    async (id) => {
        const response = PostsService.dislike(id)

        return response
    }
)

// like   post redux action
export const deletePost = createAsyncThunk(
    'posts/delete',
    async (id) => {
        const response = PostsService.delete(id)

        return response
    }
)

/* createtion du slice */

const postsSlice = createSlice({
    name: "posts",
    initialState,
    // reducers action ki ma nest7a9ech bech njib donnes mi serveru wala nsob fi serveur
    reducers: {
        pushpost: (state, action) => {
            state.posts = [action.payload.post, ...state.posts]
        },
        refreshPost: (state, action) => {
            let arr = [...state.posts]
            let pos
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (element._id === action.payload.post._id)
                    arr[i] = action.payload.post
            }

            state.posts = arr
        },
        swicthPosts: (state, action) => {
            state.clickedOption = action.payload.option
        }
    },
    // actions qui depond de la communication avec le serveur
    extraReducers: {
        //create post http request 3 cases
        [creatPost.pending]: (state, action) => {

        },
        [creatPost.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.createdPostsocket = action.payload.data.data
        },
        [creatPost.rejected]: (state, action) => {

        },
        [getPosts.pending]: (state, action) => {

        },
        [getPosts.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.posts = action.payload.data.data.reverse()
        },
        [getPosts.rejected]: (state, action) => {

        },
        [getMyPosts.pending]: (state, action) => {

        },
        [getMyPosts.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.myposts = action.payload.data.data
        },
        [getMyPosts.rejected]: (state, action) => {

        },
        [Like.pending]: (state, action) => {

        },
        [Like.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.likedPost = action.payload.data.data
        },
        [Like.rejected]: (state, action) => {

        },
        [deletePost.pending]: (state, action) => {
            state.deletecase = 'loading'
        },
        [deletePost.fulfilled]: (state, action) => {
            console.log(action.payload);
            if (action.payload.status === 200) {

                state.deletecase = 'success'
                state.posts = state.posts.filter(p => p._id !== action.payload.data.data._id)
                state.myposts = state.myposts.filter(p => p._id !== action.payload.data.data._id)

            } else {

                state.deletecase = 'failure'
            }
        },
        [deletePost.rejected]: (state, action) => {

        },
        [Dislike.pending]: (state, action) => {

        },
        [Dislike.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.likedPost = action.payload.data.data
        },
        [Dislike.rejected]: (state, action) => {

        },

    }

})

export const { pushpost, refreshPost, swicthPosts } = postsSlice.actions;

export const selectPosts = (state) => state.posts

export default postsSlice.reducer;