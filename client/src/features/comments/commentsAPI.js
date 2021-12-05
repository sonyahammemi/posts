import { axiosInstance } from '../../config/axios'
import { requests } from '../../config/requests'


// authentication service
export const CommentsService = {

   

    // craete request
    create: (data) => {
   
        return axiosInstance.post(requests.commentsapi.create, data ,{ credentials: 'include' })
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    },

}