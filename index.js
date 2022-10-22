const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
var cors = require('cors')
require('dotenv').config()

const app = express()
const port = 5000

//middleware
app.use(cors())

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.')
} catch(error) {
  console.error('Unable to connect to the database:', error)
}

const User = sequelize.define('User', {
  // contoh
  firstName: {
    type: DataTypes.STRING
  },
  // di sini mas Wi tinggal tambahin kolom" sesuai databasenya. Ini harus semuanya ya mas soalnya kalau engga nanti dia throw error
  // Untuk tambahin kolomnya, tinggal copy paste contoh (firstName) yang di atas mas 
}, {
  // Di sini, mas Wi bisa men-define nama tabelnya
  tableName: ''
})

app.get('/api/', async (req, res) => {
  const allUser = await User.findAll({
    attributes: {
      // untuk exclude ini, mas Wi sesuain kolum mana yang gamau di kirim ke lewat apinya. 
      // Contoh, kalau mas Wi masukin kolum password seperti yang di bawah ini, kolum ini bakal ga ke kirim dalam responsenya.
      exclude: ['password'] 
    }
  })
  if(allUser) {
    res.status(200).json({allUser})
  }
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})