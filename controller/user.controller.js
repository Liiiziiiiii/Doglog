const db = require('../db')
class StoneController {
    async createUser(req, res) {
        try {
            const { first_name, last_name, password, email, phone_number, location, breeding_name } = req.body;
            const result = await db.query(
                'INSERT INTO users (first_name, last_name, password, email, phone_number, location, breeding_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [first_name, last_name, password, email, phone_number, location, breeding_name]

            );

            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async loginUser(req, res) {
        const { first_name, password } = req.body; 
    
        const query = 'SELECT * FROM users WHERE first_name = $1 AND password = $2;';
        const values = [first_name, password];
    
        try {
            const result = await db.query(query, values);
    
            if (result.rows.length > 0) {
                res.json({ status: 'ok', data: result.rows[0] });
            } else {
                res.status(401).json({ status: 'error', message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    }
    

    async getUser(req, res) {
        const users = await db.query('SELECT * FROM users')
        res.json(users.rows)
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const stone = await db.query('SELECT * FROM users id = $1', [id])
        res.json(stone.rows[0])
    }


    async getDogs(req, res) {
        const dogs = await db.query('SELECT * FROM dogs')
        res.json(dogs.rows)
    }

    async createDog(req, res) {
        const {name, breed, coat, birth_date, gender, height, weight, chip, mother_id, father_id} = req.body
        const newDog = await db.query(`INSERT INTO dogs (name, breed, coat, birth_date, gender, height, weight, chip, mother_id, father_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`, [name, breed, coat, birth_date, gender, height, weight, chip, mother_id, father_id])
        res.json(newDog.rows[0])

    }
}


module.exports = new StoneController()
