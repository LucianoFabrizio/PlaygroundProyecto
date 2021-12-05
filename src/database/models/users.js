module.exports = function(sequelize, dataTypes) {
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        creation_date: {
            type: dataTypes.DATE(6),
            allowNull: false
        },
        admin: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        }
    };

    let config = {
        tableName: "users",
        timestamps: "false"
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsToMany(models.Order, {
            as: "orders",
            through: "users_orders",
            foreignKey: "user_id",
            otherKey: "order_id",
            timestamps: false
        })
    }

    return User
}