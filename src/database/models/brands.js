module.exports = function(sequelize, dataTypes) {
    let alias = "Brand";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };

    let config = {
        tableName: "brands",
        timestamps: "false"
    }

    let Brand = sequelize.define(alias, cols, config);

    return Brand
}