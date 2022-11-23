const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabaseById,
} = require('./db');

minionsRouter.param('minionsId', (req, res, next, id) => {
   const minion = getFromDatabaseById('minions', id);
   if(minion){
    req.minion = minion;
    next(); 
   }else{
    res.status(404).send();
   }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'))
});

minionsRouter.put('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body)
    res.status(201).send(newMinion)
})