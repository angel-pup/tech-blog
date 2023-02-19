const User = require('./User');
const Note = require('./Note');

Note.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Note, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { 
    User,
    Note
};
