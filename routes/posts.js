const express = require("express")
const router = express.Router()
const Post = require('../moduls/Post')

router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(error => {
            res.json({message: error})
        })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.json(post)
            } else {
                res.json({message: `post for id ${req.params.id} not found`})
            }
        })
        .catch(error => {
            res.json({message: error})
        })
})

router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    post.save()
        .then(data => {
            res.json(post)
        })
        .catch(error => {
            res.json({message: error})
        })
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.remove({_id: req.params.id})
        if (post) {
            res.json(post)
        } else {
            res.json({message: `post for id ${req.params.id} not found`})
        }
    } catch (error) {
        res.json({message: error})
    }
})
router.patch('/:id', (req, res) => {
    Post.updateOne({_id : req.params.id}, {$set: {title : req.body.title}})
        .then(post => {
            if (post) {
                res.json(post)
            } else {
                res.json({message: `post for id ${req.params.id} not found`})
            }
        })
        .catch(error => {
            res.json({message: error})
        })
})
module.exports = router