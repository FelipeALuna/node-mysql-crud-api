const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./task.service');

// routes

router.get('/task', getAll);
router.get('/task/:id', getById);
router.post('/task', createSchema, create);
router.put('/task/:id', updateSchema, update);
router.delete('/task/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Tarefa criada com sucesso!' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Tarefa atualizada com sucesso!' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'Tarefa deletada' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        done: Joi.string().empty(''),
        tittle: Joi.string().empty(''),
        createdOn: Joi.string().empty(''), 
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        done: Joi.string().empty(''),
        tittle: Joi.string().empty(''),
        createdOn: Joi.string().empty(''), 
    });
    validateRequest(req, next, schema);
}
