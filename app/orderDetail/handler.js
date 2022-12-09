const { orderDetail: OrderDetail, transaction: Transaction } = require('../../models');
const { validateCreateOrderDetailSchema } = require('../../validator/orderDetail');
const { Katalog } = require('../../models');


module.exports = {
    handlerGetOrderDetail: async (req, res) => {
        try {
            const orderDetail = await OrderDetail.findAll();
            res.status(200).json({
                status: 'success',
                data: orderDetail,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }

    },
    handlerGetOrderDetailById: async (req, res) => {
        try {
            const { id } = req.params;
            const orderDetail = await OrderDetail.findByPk(id);
            if (!order) {
                res.status(400).json({
                    status: 'error',
                    message: 'Order not found',
                });
            }
            res.status(200).json({
                status: 'success',
                data: orderDetail,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }
    },

    handlerCreateOrderDetail: async (req, res) => {
        try {
            // id: {
            //     type: DataTypes.INTEGER,
            //     autoIncrement: true,
            //     primaryKey: true,
            //     allowNull: false,
            //   },
            //   id_transaction: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //     references: {
            //       model: 'order',
            //       key: 'id'
            //     }
            //   },
            //   id_user: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //     references: {
            //       model: 'users',
            //       key: 'id'
            //     }
            //   },
            //   id_katalog: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //     references: {
            //       model: 'Katalog',
            //       key:'id'
            //     }
            //   },
            //   quantity: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //   },
            //   total_price: {
            //     type: DataTypes.INTEGER,
            //   },
            //   createdAt: {
            //     type: DataTypes.DATE,
            //     allowNull: false,
            //   },
            //   updatedAt: {
            //     type: DataTypes.DATE,
            //     allowNull: false,
            //   },
            const { id, id_transaction, id_katalog, quantity, detail } = req.body;
            console.log(req.body);
            detail.forEach(async catalog => {
                const catalogData = await Katalog.findByPk(catalog.id_katalog);
                const total_price = 4 * catalogData.price;
                await OrderDetail.create({
                    id,
                    id_transaction,
                    id_katalog: catalog.id_katalog,
                    quantity: catalog.quantity,
                    total_price,
                });
            }); 
            res.status(201).json({
                status: 'success',
                // data: await Transaction.findOne({ where: { id: id_transaction }, include: [OrderDetail] }),
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
            });
            console.log(error);
        }
    },

    handlerDeleteOrderDetail: async (req, res) => {
        try {
            const { id } = req.params;
            const orderDetail = await OrderDetail.findByPk(id);
            if (!order) {
                res.status(400).json({
                    status: 'error',
                    message: 'Order not found',
                });
            }
            await orderDetail.destroy();
            res.status(200).json({
                status: 'success',
                message: 'Order deleted',
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }
    },
};