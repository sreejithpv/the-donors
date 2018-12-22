import auth from './../middleware/auth';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import {User} from './../models/user';
import express from 'express';

const router = express.Router();

// auth (login) users
router.post('/', async ({body}, res) => {
    const {error} = validate(body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: body.email});
    if (!user) return res.status(400).send('Invalid Email or Password.')

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or Password.')

    const token = user.generateAuthToken();
    res.send(token);
});

// check auth status
router.get('/status', auth, async (req,res,next) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(true);
});

export default router;

function validate(req){
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }

    return Joi.validate(req, schema);
}
