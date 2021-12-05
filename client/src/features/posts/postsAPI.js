import { axiosInstance } from '../../config/axios'
import { requests } from '../../config/requests'


// authentication service
export const PostsService = {



    // craete request
    create: (data) => {

        return axiosInstance.post(requests.postsapi.create, data, { credentials: 'include' })
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    },
    getPosts: () => {
        return axiosInstance.get(requests.postsapi.getall, { credentials: 'include' })
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    },
    getMyPosts: () => {
        return axiosInstance.get(requests.postsapi.myposts, { credentials: 'include' })
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    },
    like: (postId) => {
        return axiosInstance.put(requests.postsapi.like + '/' + postId, { credentials: 'include' })
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    },
    dislike: (postId) => {
        return axiosInstance.put(requests.postsapi.dislike + '/' + postId, { credentials: 'include' })
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    },
    delete: (id) => {
        return axiosInstance.delete(requests.postsapi.delete + '/' + id, { credentials: 'include' })
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

}