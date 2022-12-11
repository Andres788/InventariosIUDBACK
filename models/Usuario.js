const {Schema, model} = require('mongoose');

const UsuariosSchema = (add) => {

    const schema = Schema({

        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true
        },
        estado: {
            type: String,
            required: true,
            enum: [
                'Activo',
                'Inactivo'
            ]
        },
        fechaCreacion: {
            type: Date,
            required: true
        },
        fechaActualizacion: {
            type: Date,
            required: true
        }
    });

    if (add) {
        schema.add(add)
    }

    return schema
}


const UsuarioSchema  = UsuariosSchema()

const UsuarioAuthSchema = UsuariosSchema({
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: [
            'admin', 
            'docente'
        ]
    }
})


module.exports = model('Usuario', UsuarioSchema);
module.exports = model('UsuarioAuth', UsuarioAuthSchema);