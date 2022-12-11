const { Router } = require('express');
const Marca = require('../models/Marca');
const {  validarMarca } = require('../helpers/validar-marca');
const validarJwt = require('../middleware/validarJWT')
const validarRol = require('../middleware/validarRol')

const router  = Router();

router.post('/',validarJwt, validarRol, async function(req, res){
    try {

        const validar = validarMarca(req);
        
        if (validar.length > 0) {
            return res.status(400).send(validar);
        }

        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();
        res.send(marca);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/',validarJwt, async function(req, res){
    try {
        
        let marcas = await Marca.find();
        res.send(marcas);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:marcaId',validarJwt, validarRol, async function(req, res){
    
    try {
        let marca = await Marca.findById(req.params.marcaId);
        
        if (!marca) {
            return res.status(400).send('La marca no existe');
        }

        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();

    
        marca = await marca.save(); 
    
        res.send(marca);

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.get('/:marcaId',validarJwt, async function( req, res ) {
    try {
        const marca = await Marca.findById(req.params.marcaId)
        if (!marca) {
            return res.status(404).send('Marca no existe')
        }
        res.send(marca)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router