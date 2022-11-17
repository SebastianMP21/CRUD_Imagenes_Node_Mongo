const modalContacto = new bootstrap.Modal(document.getElementById('modalContacto'))
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}
on(document, 'click', '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    id_editar.value = fila.children[0].innerHTML
    nombre_editar.value = fila.children[1].innerHTML
    apellido_editar.value = fila.children[2].innerHTML
    email_editar.value = fila.children[3].innerHTML
    numero_editar.value = fila.children[5].innerHTML
    modalContacto.show()
})