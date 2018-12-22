import mongoose from 'mongoose';

export default ({params}, res, next) => {
    if(!mongoose.Types.ObjectID.isValid(params.id))
        return res.status(404).send('Invalid ID.');

    next();
};
