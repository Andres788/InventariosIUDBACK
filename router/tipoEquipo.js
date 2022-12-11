const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const {  validarTipoEquipo } = require('../helpers/validar-tipoEquipo');
const validarJwt = require('../middleware/validarJWT')
const validarRol = require('../middleware/validarRol')


const router  = Router();

router.post('/',validarJwt, validarRol,  async function(req, res){
    
    try {

        const validar = validarTipoEquipo(req);
        
        if (validar.length > 0) {
            return res.status(400).send(validar);
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.get('/',validarJwt, async function(req, res){
    
    try {
        
        let tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.put('/:tipoEquipoId',validarJwt, validarRol,  async function(req, res){
   
    try {
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        
        if (!tipoEquipo) {
            return res.status(400).send('Tipo de Equipo no existe');
        }

        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

    
        tipoEquipo = await tipoEquipo.save(); 
    
        res.send(tipoEquipo);

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.get('/:tipoEquipoId',validarJwt, async function( req, res ) {
    try {
        const tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId)
        if (!tipoEquipo) {
            return res.status(404).send('Tipo Equipo no existe')
        }
        res.send(tipoEquipo)
    } catch (error) {
        console.log(error);
    }
})



module.exports = router