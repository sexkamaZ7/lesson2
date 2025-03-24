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
app.get('/', (req, res) => {
    res.send('<h1>Test</h1>');
})

app.get('/FIO', (req, res) => {
    res.send('<h1>Иванов В.С 11ИС-322</h1>');
})

app.post('/Create_User', (req, res) => {
    const { id, login, passwd, role } = req.body
    const type = User.create({
        id, login, passwd, role
    });
    res.send("Data created")
    return res.json(type);
})

app.delete('/Delete_User/Delete_ID/:Delete_ID', (req, res) => {
    const { id, login, passwd, role } = req.body
    let Delete_ID = Number(req.params.Delete_ID)
    const type = User.destroy({ where: { id: Delete_ID } });
    res.send("Data deleted")
})

async function start() {
    app.listen(PORT, () => {
        console.log(`address http://localhost:${PORT}`)
    })
}
sequelize.authenticate();
sequelize.sync();
start()