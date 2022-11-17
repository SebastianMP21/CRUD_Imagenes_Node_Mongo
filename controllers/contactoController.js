const Contacto = require('../model/Contacto')
const {uploadToBucket} = require('../s3/s3')


//Mostrar
module.exports.mostrar = (req, res)=>{
    Contacto.find({}, (error, contactos)=>{
        if(error) {
            return res.status(500).json({
                message: 'Error mostrando los contactos'
            })
        }
        return res.render('index', {contactos: contactos})
    })
}

//Crear 
module.exports.crear = async (req, res)=>{
    try {
        const file = req.files.foto
        const result = await uploadToBucket(file)
        const url = await result.Location
        await saveData(url,req)  
        res.redirect('/') 
    } catch (error) {
       console.log(error) 
    }
    
}

///S3
const saveData = (url_image, req) => {
    const contacto = new Contacto({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        foto: url_image,
        numero: req.body.numero
    })
    contacto.save(function(error,contacto){
        if(error){
            return res.status(500).json({
                message: 'Error al crear el Contacto'
            })
        }
    })
}


//Editar
module.exports.editar = async(req,res)=>{
    try {
    const id = req.body.id_editar
    const nombre = req.body.nombre_editar
    const apellido = req.body.apellido_editar
    const email = req.body.email_editar
    const numero = req.body.numero_editar
    const newData = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        numero: numero,
    }
    if (req.files) {
        const file = req.files.foto_editar
        const result = await uploadToBucket(file)
        const url = await result.Location
        newData.foto= url  
    }
    await Contacto.findByIdAndUpdate(id, {$set:newData}) 
    res.redirect('/');
    } catch (error) {
       console.log(error) 
    }
    
}

//Borrar
module.exports.borrar = (req, res)=>{
    const id = req.params.id
    Contacto.findByIdAndRemove(id, (error, contacto)=>{
        if(error){
            return res.status(500).json({
                message: 'Error intentando eliminar Contacto'
            })
        }
        res.redirect('/')
    })
}
