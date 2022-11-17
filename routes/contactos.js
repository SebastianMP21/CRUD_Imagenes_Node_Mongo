const express = require('express')
const router = express.Router()
const multer  = require('multer')


const contactoController = require('../controllers/contactoController')

//Mostrar todos los contactos(GET)
router.get('/', contactoController.mostrar)
//Crear contactos(POST)
router.post('/crear', contactoController.crear)
//Editar contactos(POST)
router.post('/editar', contactoController.editar)
//Borrar alumno (GET)
router.get('/borrar/:id', contactoController.borrar)
module.exports = router