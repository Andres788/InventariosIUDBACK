const { request, response } = require('express');
const UsuarioAuth = require('../models/Usuario');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registro = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        const usuarioExiste = await UsuarioAuth.findOne({
            email: email
        })

        if (usuarioExiste) {
            return res.status(400).json({
                msg: 'Usuario existente'
            })
        }

        const usuario = new UsuarioAuth()
        const salt = await bcrypt.genSalt()
        const passwordEncript = bcrypt.hashSync(password, salt)

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.password = passwordEncript
        usuario.rol = req.body.rol;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();


        const usuarioSave = await usuario.save()
        return res.status(400).json(usuarioSave)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

const login = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        const usuarioExiste = await UsuarioAuth.findOne({
            email: email
        })

        if (!usuarioExiste) {
            return res.status(400).json({
                msg: 'Usuario no creado'
            })
        }

        if (usuarioExiste.estado == 'Inactivo') {
            return res.status(400).json({
                msg: 'El usuario esta inactivo'
            })
        }

        const compare = bcrypt.compareSync(password, usuarioExiste.password)
        if (!compare) {
            return res.status(400).json({
                msg: 'contraseña incorrecta'
            })
        }

        const token = jwt.sign(
            {
                email: usuarioExiste.email,
                nombre: usuarioExiste.nombre,
                rol: usuarioExiste.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        )

        return res.json({ usuarioExiste, token })
    } catch (error) {

    }
}

module.exports = { registro, login }