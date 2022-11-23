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
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body)
    res.status(201).send(newMinion);
});

minionsRouter.get('/', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  let updateMinionInstance = updateInstanceInDatabase('minions', req.body);
  res.send(updateMinionInstance);
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    let deleted = deleteFromDatabaseById('minions', req.params.minionId);
    if(deleted){
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})

//Bonus Routes

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
          return singleWork.id === req.params.minionId;
    })
    res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    let workToAdd = req.body;
    workToAdd.minionId === req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
});


minionsRouter.param('workId', (req, res, next) => {
    const work = getFromDatabaseById('work', id);
    if(work){
        req.work = work;
        next();
    } else{
        res.status(404).send();
    }
})

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if(req.params.minionId !== req.body.minionId){
        res.status(400).send();
    }else {

        updateWork = updateInstanceInDatabase('work', req.body);
  res.send(updateWork);
    }
    
    
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabaseById('work', req.params.workId);

    if(deleted){
        res.status(201);
    } else{
       res.status(500);
    }
    res.send();
})