import express from 'express';
import error from './../middleware/error';
import users from './../routes/users';
import posts from './../routes/posts';
import auth from './../routes/auth';
import notFound from './../routes/notFound';

export default app => {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/posts', posts);
    app.use('/api/auth', auth);
    app.use(error);
    app.all('*', notFound);
};
