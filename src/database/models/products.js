module.exports = function(sequelize, dataTypes) {
    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,            
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
        },
        creation_date: {
            type: dataTypes.DATE(6),
            allowNull: false
        },
        modified_date: {
            type: dataTypes.DATE(6),
        },
        deletion_date: {
            type: dataTypes.DATE(6),
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        gallery: {
            type: dataTypes.STRING,
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        brand_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.hasMany(models.Brand, {
            as: "brands",
            foreignKey: "brand_id"
        });
        Product.hasMany(models.Category, {
            as: "categories",
            foreignKey: "category"
        });
        Product.belongsToMany(models.Order, {
            as: "orders",
            through: "products_order",
            foreignKey: "product_id",
            otherKey: "order_id",
        })
    }

    return Product
}