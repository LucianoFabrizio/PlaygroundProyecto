module.exports = function(sequelize, dataTypes) {
    let alias = "Order";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        creation_date: {
            type: dataTypes.DATE(6),
            allowNull: false
        },
        modified_date: {
            type: dataTypes.DATE(6),
            allowNull: true
        },
        state: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    };

    let config = {
        tableName: "order",
        timestamps: "false"
    }

    let Order = sequelize.define(alias, cols, config);

    Order.associate = function(models) {
        Order.hasMany()
    }

    return Order
}