import express from 'express';
const router = express.Router();

router.use('/', (req,res) => {
    res.send('Invalid request');
});

export default router;
