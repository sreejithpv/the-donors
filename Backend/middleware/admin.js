export default ({user}, res, next) => {
    if(!user.isAdmin) return res.status(403).send('Access denied.');
    next();
};
