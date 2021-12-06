module.exports = function(sequelize, dataTypes) {
    let alias = "State";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };

    let config = {
        tableName: "states",
        timestamps: false
    }

    let State = sequelize.define(alias, cols, config);

    return State
}