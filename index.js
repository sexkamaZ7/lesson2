const express = require('express');
const app = express();
const { DataTypes } = require('sequelize')
app.use(express.json())
const PORT = 3080

const { Sequelize } = require('sequelize')
app.use(express.json())

const sequelize = new Sequelize(
    "datauser",
    "postgres",
    "0000",
    {
        dialect: 'postgres',
        host: "localhost",
        port: "5432"
    }
)
const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true },
    passwd: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "Student" },
})

app.get('/FIO', (req, res) => {
    res.send('<h1>Иванов В.С 11ИС-322</h1>');
})

async function start() {
    app.listen(PORT, () => {
        console.log(`address http://localhost:${PORT}`)
    })
}
sequelize.authenticate();
sequelize.sync();
start()