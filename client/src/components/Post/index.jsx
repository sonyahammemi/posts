import React from 'react'
import './post.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiFillHeart } from 'react-icons/ai'
import ReadMoreReact from 'read-more-react';
import Comment from '../Comment'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { creatComment, selectChangedPost } from '../../features/comments/commentsSlice'
import { deletePost, Dislike, Like } from '../../features/posts/postsSlice';
import { selectUserDetails } from '../../features/authentication/authenticationSlice';
import { BiMessageMinus } from 'react-icons/bi'
import { Menu, Dropdown } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

export default ({ post }) => {

    const menu = (
        <Menu>
            <Menu.Item onClick={() => dispatch(deletePost(post._id))} icon={<DeleteOutlined />} danger>delete</Menu.Item>
        </Menu>
    );


    const dispatch = useDispatch()

    const autheduser = useSelector(selectUserDetails)


    const More = () => {
        return (
            <>
                <span style={{ cursor: "pointer", fontSize: "14px", color: "lightgrey" }} >...more</span>
            </>
        )
    }

    const addComment = (e) => {

        let data = {
            text: e.target.value,
            post: post._id
        }

        if (e.key === 'Enter') {
            dispatch(creatComment(data))
            document.getElementById('cominput').value = ''
        }

    }

    return (
        <div class="col-lg-12 show-up wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
            <div class="blog-post">

                <div class="postheader">


                    <div className='headerleft' >
                        <img src={"http://localhost:5000/images/" + post.user.avatar} alt="" />
                        <div className="postinfo">

                            <h6>By: {post.user.name} </h6>
                            <span>{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>

                    <div className="headerright">
                        <Dropdown overlay={menu} placement='bottomRight'>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <BsThreeDotsVertical className='postsettings' />

                            </a>
                        </Dropdown>
                    </div>

                </div>

                <div className="postText">

                    <ReadMoreReact text={post.text}
                        min={300}
                        ideal={400}
                        max={450}
                        readMoreText={<More />}
                    />
                </div>


                {post.image && <div class="thumb mt-2">
                    <a href="#"><img src="assets/images/blog-post-01.jpg" alt="" /></a>
                </div>}
                <div class="post-down-content">

                    <div className='post-down-header' >
                        {
                            !post.likes.includes(autheduser._id)
                                ?
                                <>
                                    <AiFillHeart className='likeicon' onClick={() => dispatch(Like(post._id))} /> <span style={{ color: "black" }}  >{post.likes.length}</span>
                                </>
                                :
                                <>
                                    <AiFillHeart className='dislikeicon' onClick={() => dispatch(Dislike(post._id))} /> <span style={{ color: "black" }}  >{post.likes.length}</span>
                                </>
                        }

                        <BiMessageMinus style={{ marginLeft: "15px", fontSize: "20px" }} /> <span style={{ color: "black" }}>{post.comments.length}</span>
                    </div>

                    <div className="comments">
                        <div className="commentform">

                            <img src={"http://localhost:5000/images/" + post.user.avatar} alt="" />
                            <input onKeyDown={(e) => addComment(e)} type="text" id='cominput' placeholder="write a comment !" />

                        </div>
                        <div className="commentslist">

                            {
                                post.comments.map(com => {
                                    return (

                                        <Comment comment={com} />
                                    )
                                })
                            }
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}