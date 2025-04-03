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
        res.status(500).send('Ошибка сервера')
    }
})

app.post('/orders/inforder', async (req, res) => {
    try {
        const { id_order } = req.body;

        if (!id_order) {
            return res.status(400).send('id_order обязателен');
        }

        const result = await sequelize.query(
            `SELECT * FROM orders WHERE id_order = ?`,
            {
                replacements: [id_order],
                type: sequelize.QueryTypes.SELECT,
            }
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).send('Ошибка сервера');
    }
});

app.post('/districts/getdistrict', async (req, res) => {
    try {
        const { id_district } = req.body;

        if (!id_district) {
            return res.status(400).send('id_district обязателен');
        }

        const result = await sequelize.query(
            `SELECT * FROM districts WHERE id_district = ?`,
            {
                replacements: [id_district],
                type: sequelize.QueryTypes.SELECT,
            }
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).send('Ошибка сервера');
    }
})

app.get('/category/getcategory', async (req, res) => {
    try {
        // const { id_category } = req.body;

        // if (!id_category) {
        //     return res.status(400).send('id_category обязателен');
        // }

        const result = await sequelize.query(
            `SELECT * FROM categories`,
            // {
            //     replacements: [id_category],
            //     type: sequelize.QueryTypes.SELECT,
            // }
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).send('Ошибка сервера');
    }
})

app.get('/orders/getmoney', async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT sum(price) FROM orders`);
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

app.post('/orders/delorder', async (req, res) => {
    try {
        console.log(req.body)
        const { id_order } = req.body;
        
        if (!id_order) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const result = await sequelize.query(
            `DELETE FROM orders WHERE id_order = ? RETURNING *`, 
            {
                replacements: [id_order],
                type: sequelize.QueryTypes.DELETE,
            }
        );

        res.status(200).json({ message: 'Заказ удален' });

    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Ошибка сервера');
    }
});

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

app.post('/cars/delcar', async (req, res) => {
    try {
        const { id_car } = req.body;
        
        if (!id_car) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const result = await sequelize.query(
            `DELETE FROM cars WHERE id_car = ? RETURNING *`, 
            {
                replacements: [id_car],
                type: sequelize.QueryTypes.DELETE,
            }
        );

        res.status(200).json({ message: 'Автомобиль удален' });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Ошибка сервера');
    }
})

app.post('/brands/delbrand', async (req, res) => {
    try {
        const { id_brand } = req.body;
        
        if (!id_brand) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const result = await sequelize.query(
            `DELETE FROM brands WHERE id_brand = ? RETURNING *`, 
            {
                replacements: [id_brand],
                type: sequelize.QueryTypes.DELETE,
            }
        );

        res.status(200).json({ message: 'Марка удалена' });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Ошибка сервера');
    }
})

app.post("/districts/deldistrict", async (req, res) => {
    try {
        const { id_district } = req.body;
        
        if (!id_district) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const result = await sequelize.query(
            `DELETE FROM districts WHERE id_district = ? RETURNING *`, 
            {
                replacements: [id_district],
                type: sequelize.QueryTypes.INSERT,
            }
        );

        res.status(200).json({ message: 'Район удален' });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Ошибка сервера');
    }
})

app.get('/clients/infoclients', async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM clients`);
        res.status(200).send(result);
    } catch (error) {
        console.log('ERROR: ', error)
        res.status(500).send('Ошибка сервера')
    }
})

app.post("/cars/addcar", async (req, res) => {
    try {
        const { id_brand, model, car_num } = req.body;
        const car_used = false;
        
        if (!id_brand || !model || !car_num) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const result = await sequelize.query(
            `INSERT INTO cars(id_brand, model, car_used, car_num) VALUES (?, ?, ?, ?) RETURNING *`, 
            {
                replacements: [id_brand, model, car_used, car_num],
                type: sequelize.QueryTypes.INSERT,
            }
        );

        res.status(200).json({ message: 'Автомобиль добавлен' });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Ошибка сервера');
    }
})

app.post("/clients/addclient", async (req, res) => {
    try {
        const { number } = req.body;
        
        if (!number) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const result = await sequelize.query(
            `INSERT INTO clients(number) VALUES (?) RETURNING *`, 
            {
                replacements: [number],
                type: sequelize.QueryTypes.INSERT,
            }
        );

        res.status(200).json({ message: 'Клиент добавлен' });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Ошибка сервера');
    }
})

app.post("/brands/addBrand", async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const result = await sequelize.query(
            `INSERT INTO brands(name) VALUES (?) RETURNING *`, 
            {
                replacements: [name],
                type: sequelize.QueryTypes.INSERT,
            }
        );

        res.status(200).json({ message: 'Марка добавлена' });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Ошибка сервера');
    }
})

app.post("/districts/addistrict", async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const result = await sequelize.query(
            `INSERT INTO districts(name) VALUES (?) RETURNING *`, 
            {
                replacements: [name],
                type: sequelize.QueryTypes.INSERT,
            }
        );

        res.status(200).json({ message: 'Район добавлен' });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Ошибка сервера');
    }
})


