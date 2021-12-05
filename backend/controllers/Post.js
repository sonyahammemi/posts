const Post = require('../models/Post')

module.exports = {
    create: (req, res) => {

        console.log(req.body);


        const data = {
            user: req.user.sub,
            text: req.body.text,
            /* image : req.file && req.file.filename */
        }

        console.log(data);


        const t = new Post(data)
        t.save().then(t => t.populate('user')
            .then(post => {
                res.status(200).json({
                    message: 'post created',
                    data: post
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'post not created ',
                    data: null
                })
            })
        )
    },
    deletepost: (req, res) => {
        Post.findByIdAndDelete({ _id: req.params.id }, (err, post) => {
            if (err) {
                res.status(500).json({
                    message: ' post not deleted'
                })
            } else {
                res.status(200).json({
                    message: ' post successfuly deleted',
                    data: post
                })
            }
        })
    },
    getById: (req, res) => {
        Post.findBYId({ _id: req.params.id })
            .populate('user')
            .then(post => {
                res.status(200).json({ message: "post", data: post })
            })
            .catch(err => {
                res.status(500).json({ message: "post not found", data: null })
            })
    },
    getAll: (req, res) => {
        Post.find({})
            .populate('user')
            .populate({ path: 'comments', populate: { path: 'user' } })
            .then(posts => {
                res.status(200).json({ message: "posts", data: posts })
            })
            .catch(err => {
                res.status(500).json({ message: "no posts in system", data: null })
            })
    },
    updatePost: (req, res) => {
        Post.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true },
            (err, post) => {
                if (err) {
                    res.status(500).json({ message: "post not updated", data: null })

                } else {

                    res.status(200).json({ message: "post successfuly updated", data: post })
                }
            })
    },

    getOwnPosts: (req, res) => {
        const { sub } = req.user

        Post.find({ user: sub })
            .populate('user')
            .populate({ path: 'comments', populate: { path: 'user' } })
            .then(posts => {
                res.status(200).json({
                    message: 'user posts',
                    data: posts
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'no user posts',
                    data: null
                })
            })
    },
    like: (req, res) => {
        Post.findOneAndUpdate({ _id: req.params.id }, { $push: { 'likes': req.user.sub } }, { new: true })
            .populate('user')
            .populate({ path: 'comments', populate: { path: 'user' } })
            .then(post => {
                res.status(200).json({
                    message: "post liked",
                    data: post
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: "post not liked"
                })
            })
    },
    dislike: async (req, res) => {


        const post = await Post.findById({ _id: req.params.id })


        const newpost = new Post(post)
        newpost.likes.filter(uid => uid !== req.user.sub)

        await Post.findByIdAndUpdate({ _id: req.params.id }, newpost, { new: true })
            .populate('user')
            .populate({ path: 'comments', populate: { path: 'user' } })
            .then(post => {
                res.status(200).json({
                    message: "post liked",
                    data: post
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: "post not liked" + err
                })
            })



        /* Post.findOneAndUpdate({ _id: req.params.id }, { $push: { 'likes': req.user.sub } }, { new: true })
            .populate('user')
            .populate({ path: 'comments', populate: { path: 'user' } })
            .then(post => {
                res.status(200).json({
                    message: "post liked",
                    data: post
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: "post not liked"
                })
            }) */
    }
}