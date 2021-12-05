const Comment = require('../models/Comment')
const Post = require('../models/Post')

module.exports = {
    create: async (req, res) => {

        const data = {
            user: req.user.sub,
            text: req.body.text
        }

        const comment = new Comment(data)

        comment.save().then(com => {
            Post.findByIdAndUpdate({ _id: req.body.post }, { $push: { comments: com._id } }, { new: true })
                .populate('user')
                .populate({ path: 'comments', populate: { path: 'user' } })
                .then(post => {
                    res.status(200).json({ message: 'comments added to post', data: post })
                })
                .catch(err => {
                    res.status(500).json({ message: 'comment not added to post', data: null })
                })
        })

    }
}