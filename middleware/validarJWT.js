const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const validarJwt = ( req = request, res = response, next ) => {
    
    const token = req.header('access-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No tiene Token'
        })
    }

    try {
       const payload = jwt.verify(token, process.env.JWT_SECRET)
       req.user = payload
       next()
    } catch (error) {
        return res.status(401).json({
            msg: 'Token invalido'
        })
    }
}


module.exports = validarJwt 