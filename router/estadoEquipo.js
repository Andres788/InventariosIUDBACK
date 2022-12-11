const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const {  validarEstadoEquipo } = require('../helpers/validar-estadoEquipo');
const validarJwt = require('../middleware/validarJWT')
const validarRol = require('../middleware/validarRol')

const router  = Router();

router.post('/',validarJwt, validarRol, async function(req, res){
    
    try {

        const validar = validarEstadoEquipo(req);
        
        if (validar.length > 0) {
            return res.status(400).send(validar);
        }

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/',validarJwt, async function(req, res){
    
    try {

        let estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocuarrio un error');
    }

});

router.put('/:estadoEquipoId',validarJwt, validarRol, async function(req, res){
    try {
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        
        if (!estadoEquipo) {
            return res.status(400).send('El estado no existe');
        }

        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();

    
        estadoEquipo = await estadoEquipo.save(); 
    
        res.send(estadoEquipo);

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/:estadoEquipoId',validarJwt, async function( req, res ) {
    try {
        const estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId)
        if (!estadoEquipo) {
            return res.status(404).send('Estado Equipo no existe')
        }
        res.send(estadoEquipo)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router