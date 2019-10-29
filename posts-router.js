const express = require('express')
// const cors = require('cors')
const db = require('./data/db.js')

const router = express.Router();

router.get('/:id/comments', getComment)
router.post('/:id/comments', addComment)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.get('/:id', getPost)
router.get('/', getAllPosts)
router.post('/', addPost)

function getComment(req,res) {
    const {id} = req.params;

    db.findCommentById(id)
    .then(data => {
        if(data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({errorMessage: "The comment with the specified ID does not exist."})
        }
    })
    .catch(() => {
        res.status(500).json({errorMessage: "The comments information could not be retrieved."})
    })
}

function addComment(req, res) {
    const {id} = req.params;

    const textbody = {
        text: req.body.text,
        post_id: id
    }

    if(!textbody) {
        res.status(400).json({errorMessage: "Please provide text for the comment."})
    } else {
        db.insertComment(textbody)
        .then(data => {
            if (data) {
                res.status(201).json(textbody)
            } else {
                res.status(404).json({errorMessage: "The post with the specified ID does not exist"})
            }
            
        })
        .catch(() => {
            res.status(500).json({errorMessage: "There was an error while saving the comment to the database"})
        })
    }
}

function updatePost(req, res) {
    const {id} = req.params;

    const body = {
        contents: req.body.contents,
        title: req.body.title
    }

    if (!body) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    } else {
        db.update(id, body)
        .then(data => {
            if (data) {
                res.status(200).json(body)
            } else {
                res.status(404).json({errorMessage: "The post with the specified ID does not exist."})
            }
        })
        .catch(() => {
            res.status(500).json({errorMessage: "The post could not be modified"})
        })
    }
}

function deletePost(req, res) {
    const {id} = req.params;

    db.remove(id)
    .then(data => {
        if (!data) {
            res.status(404).json({errorMessage: "The post with the specified ID does not exist."})
        } else {
            res.status(200).json(data)
        }
    })
    .catch(() => {
        res.status(500).json({errorMessage: "The user could not be removed"})
    })
}

function getPost(req, res) {
    const {id} = req.params;

    db.findById(id)
    .then(data => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({errorMessage: "The post with the specified ID does not exist."})
        }
    })
    .catch(() => {
        res.status(500).json({errorMessage: "There was an error while saving the post to the database"})
    })
}

function addPost(req, res) {
    const post = {
        contents: req.body.contents,
        title: req.body.title
    }

    if (!post){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    } else {
        db.insert(post)
        .then(data => {
            console.log(data)
            res.status(201).json(post);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "There was an error while saving the post to the database"})
        })
    }
}

function getAllPosts(req, res) {
    db.find()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(() => {
        res.status(500).json({errorMessage: "The posts information could not be retrieved."})
    })
}

module.exports = router;