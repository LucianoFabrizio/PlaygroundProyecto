module.exports = function(sequelize, dataTypes) {
    let alias = "Category";

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
        tableName: "categories",
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config);

    return Category
}