import auth from './../middleware/auth';
import _ from 'lodash';
import {Post, validate} from './../models/posts';
import express from 'express';
const router = express.Router();

router.post('/', auth, async ({body}, res) => {
    const {error} = validate(body);
    if(error) return res.status(400).send(error.details[0].message);

    const post = new Post(
        _.pick(body, ["postTitle", "postText", "userID"])
    );

    await post.save();

    res.send(_.pick(post, ["_id"]));
});

router.get('/', async (req, res) => {

    const posts = await Post.find().populate({ path: 'userID', select: '-password -_id'});

    res.send(posts);
})


export default router;
