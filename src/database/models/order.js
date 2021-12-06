module.exports = function(sequelize, dataTypes) {
    let alias = "Order";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        timestamps: false
    }

    let Order = sequelize.define(alias, cols, config);

    Order.associate = function(models) {
        Order.belongsToMany(models.User, {
            as: "users",
            through: "users_orders",
            foreignKey: "order_id",
            otherKey: "user_id",
        });
        Order.belongsToMany(models.Product, {
            as: "products",
            through: "products_order",
            foreignKey: "order_id",
            otherKey: "product_id"
        });
        Order.hasMany(models.State, {
            as: "states",
            foreignKey: "state"
        })
    
    }

    return Order
}