var DB = require('./DB-connect');

function getSkillsList() {
    return DB.getCollection('skills');
}


module.exports = {
    getSkillsList
};