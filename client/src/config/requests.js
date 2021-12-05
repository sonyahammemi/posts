export const requests = {

    userapi: {

        register: '/auth',
        login: '/auth/login',
        getme: '/auth/me',
        logout: '/auth/logout',
        avatar: '/auth/avatar',
        update: '/auth/',
    },
    postsapi : {
        create : '/posts',
        getall : '/posts',
        myposts : '/posts/myposts',
        like : '/posts/like',
        dislike : '/posts/dislike',
        delete : '/posts',
    },
    commentsapi : {
        create : '/comments'
    }
}