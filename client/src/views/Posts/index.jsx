import React, { useEffect, useRef, useState } from 'react'
import './posts.css'
import avatar from '../../assets/img/avatar.jpg'
import { CgFeed } from 'react-icons/cg'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiOutlinePhotograph } from 'react-icons/hi'
import Post from '../../components/Post'
import Notification from '../../components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { getMe, selectUserDetails, update, uploadAvatar } from '../../features/authentication/authenticationSlice'
import { Modal, Button } from 'antd';
import { AiFillCamera } from 'react-icons/ai'
import { IoIosShareAlt } from 'react-icons/io'
import { creatPost, getPosts, selectPosts, pushpost, refreshPost, getMyPosts, swicthPosts } from '../../features/posts/postsSlice'
import { io } from 'socket.io-client'
import { addcomstatus, selectChangedPost } from '../../features/comments/commentsSlice'

export default () => {

    const dispatch = useDispatch()

    const socket = useRef();

    const posts = useSelector(selectPosts)

    const changedpost = useSelector(selectChangedPost)


    useEffect(() => {
        socket.current = io("ws://localhost:4000");

        socket.current.on('newPost', post => {
            console.log('new post ', post);
            dispatch(pushpost({ post: post }))
        })

        socket.current.on('refreshPost', newpost => {
            console.log('sdjhdjhsjhdsjhdsjhdsjhds', newpost);
            dispatch(refreshPost({ post: newpost }))
        })


    }, []);

    const comstatus = useSelector(addcomstatus)

    useEffect(() => {
        console.log('im sending');
        if (comstatus === 'success')
            socket.current.emit("PostChanged", changedpost.changedPost);
    }, [comstatus])


    useEffect(() => {
        if (posts.likedPost)
            socket.current.emit("PostChanged", posts.likedPost);
    }, [posts.likedPost])


    useEffect(() => {
        if (posts.createdPostsocket)
            socket.current.emit("addPost", posts.createdPostsocket);
    }, [posts.createdPostsocket])

    useEffect(() => {
        dispatch(getMe())
        dispatch(getPosts())
        dispatch(getMyPosts())
    }, [])

    const userDetails = useSelector(selectUserDetails)

    const [displayform, setdisplayform] = useState(false)

    const [name, setname] = useState(userDetails && userDetails.name)
    const [email, setemail] = useState(userDetails && userDetails.email)

    const handleupload = (e) => {
        const data = new FormData()
        data.append('avatar', e.target.files[0])
        dispatch(uploadAvatar(data))
    }

    const updateuser = (e) => {

        let data = {
            name: name,
            email: email
        }

        dispatch(update(data))
    }

    const [postText, setpostText] = useState('')
    const [image, setimage] = useState(null)


    const [imagedispaly, setimagedispaly] = useState(null)

    const handlepostimage = (e) => {
        setimage(e.target.files[0])
        setimagedispaly(URL.createObjectURL(e.target.files[0]))
    }

    const create = () => {

        let data
        if (!image) {
            data = {
                text: postText
            }
            dispatch(creatPost(data))
        } else {
            console.log('ksjkjfs');
        }


    }

    return (

        <div className="posts">
            <div className="lefSider">
                <div className="topsider">

                    <div className="avatar">
                        {userDetails && <img className='avatar' src={'http://localhost:5000/images/' + userDetails.avatar} alt="" />}
                    </div>
                    <h5>{userDetails && userDetails.name}</h5>
                    <hr />
                    <h6>{userDetails && userDetails.email}</h6>
                </div>

                <div className="statistics">
                    <ul>
                        <li>
                            <div>

                                <CgFeed className='icon' />
                                <span>posts</span>

                            </div>

                            <span>{posts.myposts.length}</span>
                        </li>

                    </ul>
                </div>

                <button class='editbutton' onClick={() => setdisplayform(!displayform)} >{displayform ? 'cancel' : 'edit'}</button>

            </div>
            <div className="mainContent">

                {
                    displayform
                        ?
                        <>
                            <h3>Edit User Details</h3>
                            <div class="edituser" >
                                <img src={"http://localhost:5000/images/" + userDetails.avatar} alt="" />
                                <AiFillCamera class='uploadcamera' onClick={() => document.getElementById('upload').click()} />
                                <input type="file" id='upload' onChange={(e) => handleupload(e)} hidden />
                                {userDetails &&
                                    <>
                                        <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder='name' />
                                        <input type="text" value={email} onChange={(e) => setemail(e.target.value)} placeholder='email' />
                                    </>
                                }
                                <button onClick={updateuser}  >save</button>
                                <span>status</span>
                            </div>
                        </>
                        :
                        <>
                            <div className="search">
                                <input type="text" placeholder='search...' />


                                <AiOutlineSearch className="searchicon" />


                            </div>
                            <div className="createPost">
                                {userDetails && <img src={'http://localhost:5000/images/' + userDetails.avatar} className='createFormAvatar' alt="" />}
                                <input value={postText} onChange={(e) => setpostText(e.target.value)} type="text" placeholder='write a post' />
                                <input type="file" id='postimage' onChange={(e) => handlepostimage(e)} hidden />
                                <div style={{ display: "flex" }} >

                                    <HiOutlinePhotograph style={{ cursor: 'pointer' }} onClick={() => document.getElementById('postimage').click()} className='imagebtn' />
                                    <button onClick={create} style={{ borderRadius: "10px", width: '70px', outline: 'none', border: '1px solid lightgray', background: '#F1F0EE' }}  >
                                        <IoIosShareAlt />
                                    </button>
                                </div>
                            </div>

                            <div style={{ marginTop: '10px' }} >
                                <button onClick={() => dispatch(swicthPosts({ option: 'posts' }))} style={{ border: '1px solid lightgray', borderRadius: '10px', background: posts.clickedOption === 'posts' ? '#fa65b1' : "#F1F0EE" }} >posts</button>
                                <button onClick={() => dispatch(swicthPosts({ option: 'myposts' }))} style={{ marginLeft: '10px', border: '1px solid lightgray', borderRadius: '10px', background: posts.clickedOption === 'myposts' ? '#fa65b1' : "#F1F0EE" }} > My posts</button>
                            </div>

                            {imagedispaly && <img style={{ height: '130px', width: '70px', marginTop: '10px', borderRadius: '15px' }} src={imagedispaly} />}

                            <hr />

                            {
                                posts.clickedOption === "posts" && posts.posts.map((post, i) => {
                                    return (

                                        <Post key={post._id} post={post} />
                                    )
                                })
                            }

                            {
                                posts.clickedOption === "myposts" && posts.myposts.map((post, i) => {
                                    return (

                                        <Post key={post._id} post={post} />
                                    )
                                })
                            }


                        </>
                }
            </div>
            <div className="notifications">
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
            </div>



        </div>

    )
}