const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Task.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    const task = new db.Task(params);
    await task.save();
}

async function update(id, params) {
    const task = await getUser(id);
    Object.assign(user, params);
    await task.save();
}

async function _delete(id) {
    const task = await getUser(id);
    await task.destroy();
}

// helper functions

async function getUser(id) {
    const task = await db.User.findByPk(id);
    if (!task) throw 'Tarefa não encontrada';
    return task;
}
