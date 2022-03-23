/* Realmente en vez de implementar un editor de texto rico
 en JavaScript se suele hacer uso de librerías externas
 que lo incorporan en nuestro sitio web, como Quilljs.

 Sin embargo, quería al menos empezar a entender cómo 
 funciona JavaScript y he decidido documentarme y seguir 
 un tutorial para crear un pequeño editor.
*/
const btnOrden = document.querySelector("#lista-ord")
const btnDesorden = document.querySelector("#lista-desord")
const btnNegrita = document.querySelector("#negrita")
const btnSubrayado = document.querySelector("#subrayado")
const btnCursiva = document.querySelector("#cursiva")
const btnColor = document.querySelector("#boton-color")
const btnBorrar = document.querySelector("#borrar")

const btnNuevoArchivo = document.querySelector("#nuevo-archivo")
const btnGuardarTxt = document.querySelector("#guardar-txt")

const texto = document.querySelector("#texto")
const nombreArchivo = document.querySelector("#nombre-archivo")
const archivoAbrir = document.querySelector("#inputfile")

const btnTemas = document.querySelector("#temas")

const btnsCarrito = document.querySelectorAll(".btn-carrito")
const btnConsultarCarrito = document.querySelector("#btn-consultar-carrito")
/* var: variable usable globalmente */
var contadorCarrito = 0

// Este método sobrecargado está obsoleto según las nuevas
// especificaciones de JavaScript, pero no hay una alternativa
// a él aún, y sigue funcionando.
// Añadiendo eventos a las opciones, cambia el texto a negrita,
// crea una lista, etc, según seleccionemos el botón correspondiente.
btnOrden.addEventListener("click", () => {
    document.execCommand("insertOrderedList", false, "");
})

btnDesorden.addEventListener("click", () => {
    document.execCommand("insertUnorderedList", false, "");
})

btnNegrita.addEventListener("click", () => {
    document.execCommand("bold")
})

btnSubrayado.addEventListener("click", () => {
    document.execCommand("underline")
})

btnCursiva.addEventListener("click", () => {
    document.execCommand("italic")
})
/**
 * Cambia el color de la fuente a uno elegido en un menú tipo color
 * El tercer parámetro recibe el color elegido en el menú
 * desplegable de tipo color btnColor
 */
btnColor.addEventListener("input", () => {
    document.execCommand("forecolor", false, btnColor.value)
})

btnBorrar.addEventListener("click", () => {
    document.execCommand("removeFormat")
})

/**
 * Hace que el contenido del elemento texto
 * sea una cadena vacía (borra todo)
 */
btnNuevoArchivo.addEventListener("click", () => {
    texto.innerHTML = ""
})

/**
 * Guarda el contenido del elemento texto (las 4 primeras líneas son copiadas
 * de un sitio web de ejemplos)
 */
btnGuardarTxt.addEventListener("click", () => {
    const a = document.createElement("a")
    const blob = new Blob([texto.innerText])
    const dataUrl = URL.createObjectURL(blob)
    a.href = dataUrl
    // Pide confirmación de la descarga
    if (confirm("¿Quieres descargar el archivo " + nombreArchivo.value + ".txt?")) {
        a.download = nombreArchivo.value + ".txt"
    } else {
        // No sé por qué funciona pero fue la última opción en la que pensé
        // y acabó funcionando. Si se quita, la página abre el blob y se rompe
        return
    }
    a.click()
})

/**
 * Abre un archivo de tipo texto
 */
archivoAbrir.addEventListener("change", function () {
    var fr = new FileReader()
    // Escribe el contenido del FileReader en el elemento con id #texto esperando
    // hasta que haya cargado
    fr.onload = function () {
        document.getElementById("texto")
            .textContent = fr.result
    }
    fr.readAsText(this.files[0])
})

/**
 * Añadir tema oscuro generado por Dark Reader sobre el CSS existente
 * El tema empieza siendo claro por defecto, de ahí la variable oscuro = false
 */
var oscuro = false
var temaOscuro = document.createElement("link")
const cabeza = document.getElementsByTagName("head")[0]
temaOscuro.rel = "stylesheet"
temaOscuro.type = "text/css"
temaOscuro.href = "temaOscuro.css"

btnTemas.addEventListener("click", () => {
    // Si no se ha aplicado el tema oscuro, se añade el link creado al html
    if (!oscuro) {
        cabeza.appendChild(temaOscuro)
        oscuro = true
    // Si ya se ha aplicado el tema, simplemente se retira el link que referencia
    // al archivo .css (el último hijo que se haya añadido a cabeza)
    } else if (oscuro) {
        cabeza.removeChild(cabeza.lastChild)
        oscuro = false
    }
})

/**
 * Cambio de icono al pulsar en botón de cambio de temas:
 * se cambia la clase de fa-moon por fa-sun
 */
document.getElementById("temas").onclick = function () {
    document.getElementById("luna").classList.toggle("fa-sun")
}

/**
 * Notificación cada vez que se añade un producto al carrito
 */
btnsCarrito.forEach(boton => {
    boton.addEventListener("click", () => {
        alert("Ha añadido un elemento al carrito")
        contadorCarrito++
    })
})

/**
 * Llevar la cuenta de productos en el carrito
 */
btnConsultarCarrito.addEventListener("click", () => {
    alert("Tiene " + contadorCarrito + " elementos en el carrito actualmente")
})