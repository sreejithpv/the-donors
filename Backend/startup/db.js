import mongoose from 'mongoose';
import winston from 'winston';
import config from 'config';

export default () => {
    mongoose.connect(config.get('db'), { useNewUrlParser: true })
    .then(() => winston.info('Connection to MongoDB established successfully...'));
};
