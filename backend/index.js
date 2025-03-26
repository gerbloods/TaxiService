require('dotenv').config()
const express = require('express')
const cors = require("cors")
const sequelize = require("./db")

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

const start = async () => {
    try {
        await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => {
			console.log(`Cервер запущен на ${PORT} порту`)
		})
    } catch (e) {
        console.log(e)
    }
}

start()


app.get('/orders/inforders', async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM orders`);
        res.status(200).send(result);
    } catch (error) {
        console.log('ERROR: ', error)
        res.status(500).send('Ошибка сервера')
    }
})

app.post('/orders/neworder', async (req, res) => {
    try {
        const { id_client, id_category, id_driver, price, from_to, to_from } = req.body
        if (!id_client || !id_category || !id_driver || !price || !from_to || !to_from) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }
        const result = await sequelize.query(
            `INSERT INTO orders(id_client, id_category, id_driver, price, from_to, to_from) VALUES (?, ?, ?, ?, ?, ?) RETURNING *`,
            {
                replacements: [id_client, id_category, id_driver, price, from_to, to_from],
                type: sequelize.QueryTypes.INSERT,
            }
        );
        res.status(201).json({ message: 'Заказ создан'});
    } catch (error) {
        console.log('ERROR: ', error)
        res.status(500).send('Ошибка сервера')
    }
})

app.get('/drivers/infodrivers', async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM drivers`);
        res.status(200).send(result);
    } catch (error) {
        console.log('ERROR: ', error)
        res.status(500).send('Ошибка сервера')
    }
})

app.post('/drivers/newdriver', async (req, res) => {
    try {
        const { id_car, id_district, name, surname } = req.body
        if (!id_car || !id_district || !name || !surname) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }
        const result = await sequelize.query(
            `INSERT INTO drivers(id_car, id_district, name, surname) VALUES ( ?, ?, ?, ?) RETURNING *`,
            {
                replacements: [id_car, id_district, name, surname],
                type: sequelize.QueryTypes.INSERT,
            }
        );
        await sequelize.query(`UPDATE cars SET car_used = TRUE FROM drivers WHERE cars.id_car = drivers.id_car`);
        res.status(201).json({ message: 'Водитель добавлен'});
    } catch (error) {
        console.log('ERROR: ', error)
        res.status(500).send('Ошибка сервера')
    }
})

app.post('/drivers/deldriver', async (req, res) => {
    try {
        const { id_driver } = req.body;
        
        if (!id_driver) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const result = await sequelize.query(
            `DELETE FROM drivers WHERE id_driver = ? RETURNING *`, 
            {
                replacements: [id_driver],
                type: sequelize.QueryTypes.DELETE,
            }
        );

        res.status(200).json({ message: 'Водитель удален' });

    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Ошибка сервера');
    }
});


app.get('/clients/infoclients', async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM clients`);
        res.status(200).send(result);
    } catch (error) {
        console.log('ERROR: ', error)
        res.status(500).send('Ошибка сервера')
    }
})