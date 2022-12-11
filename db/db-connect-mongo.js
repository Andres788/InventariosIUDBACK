const mongoose = require('mongoose')

const getConnection = async () => {
    try {
        const url = 'mongodb+srv://db-connect:12345@cluster0.neqof.mongodb.net/?retryWrites=true&w=majority'

        const envurl = process.env.URL

        await mongoose.connect(envurl);

        console.log("La Conexion fue.... Exitosa");

    } catch (error) {
        console.log(error);
    }
}

module.exports = { getConnection }