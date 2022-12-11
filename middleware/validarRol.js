const { request, response } = require('express')


const validarRol = (req = request, res = response, next) => {



    try {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Debe validar el token'
            })
        }
        const { rol } = req.user
        if (rol !== 'admin') {
            return res.status(403).json({
                msg: 'No tienes permiso para esta acción'
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            msg: 'Rol invalido'
        })
    }
}


module.exports = validarRol