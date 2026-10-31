import express from "express";
import pool from "./db.js";
const PORT = 4000;


const app = express();
app.use(express.json());
app.get('/api/check',(req,res)=>{
    res.status(200).json({ok: true, v: "v2"});
})
app.get('/api/datafetch',async (req, res) => {
    try {
        let data = await pool.query(`SELECT * FROM employee`);
        res.status(200).json({ ok: true ,
            data: data.rows
        });
    } catch (err) {
        res.status(500).json({ message: "ssssomething went wrong" , error: err.message})
    }
})
app.post('/api/datainsert',async (req, res) => {
    try {
        const {name,email} = req.body;
        await pool.query(`INSERT INTO employee (name, email) VALUES ($1,$2)`,[name,email]);
        res.status(201).json({message: "created"})
    } catch (err) {
        res.status(500).json({ message: "something went wrong" })
    }
})
app.get('/api/dbcreation', async(req, res) => {
    try {
        await pool.query(`CREATE TABLE employee(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100))
            
            `)
          res.status(201).json({message: "created"})
    } catch (err) {
        res.status(500).json({ message: "ssssomething went wrong" , error: err.message})
    }
})

app.listen(PORT, () => console.log('server is on'));