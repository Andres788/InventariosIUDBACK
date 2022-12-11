const { check, body, validationResult } = require('express-validator');
const { resultadoValidacion } = require('./validacionHelper');

const validarCreacionUsuario = [
    check('nombre', 'falta ingresar el nombre') 
        .exists()     
        .not().isEmpty(),  

    check('email', 'falta ingresar el email').exists().not().isEmpty(),
    check('estado', 'falta ingresar el estado').exists().not().isEmpty(),
    (req, res, next) => {
       
        resultadoValidacion(req, res, next);
    }

   

]

const validarUsuario = (req) => {

    const validacion = [];

    if (!req.body.nombre) {
        validacion.push('Nombre requerido')
    }

    if (!req.body.email) {
        validacion.push('Email requerido')
    }

    if (!req.body.estado) {
        validacion.push('Estado requerido')
    }

    return validacion;

}






module.exports = { validarCreacionUsuario, validarUsuario };