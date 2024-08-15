const texto = document.querySelector(".texto");
const mensaje = document.querySelector(".mensaje");
const mensajeEncriptado = document.getElementById("mensaje-encriptado");
const tituloMensaje = document.getElementById("titulo-mensaje");
const parrafo = document.getElementById("parrafo");
const imagen = document.querySelector(".encriptado img");

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

function verificarTexto() {
    const textarea = document.querySelector(".texto");
    const texto = textarea.value;

    // Expresión regular para detectar letras mayúsculas y acentuadas
    const regex = /[A-ZÁÉÍÓÚÑ]|[\u00C0-\u00FF]/;

    // Verifica si el texto contiene letras mayúsculas o acentuadas
    if (regex.test(texto)) {
        // Muestra alerta si el texto no es válido
        alert('Solo letras minúsculas y sin acento');
        // Limpia el contenido del textarea
        textarea.value = '';
        return false; // Indica que el texto no es válido
    }
    return true; // Indica que el texto es válido
}


function btnEncriptar() {
    if (!verificarTexto()) {
        return; // Sale de la función si el texto no es válido
    }
    const textoEncriptado = encriptar(texto.value.trim()); // Encripta el texto ingresado

    if (textoEncriptado === "") {
        // Si no hay texto encriptado, muestra la imagen y el mensaje predeterminado
        imagen.style.display = "block";
        tituloMensaje.style.display = "block";
        parrafo.style.display = "block";
        mensaje.style.display = "none"; // Oculta el textarea de mensaje
        mensaje.value = ""; // Limpia el textarea

    } else {
        // Si hay texto, muestra el texto encriptado y oculta la imagen y los mensajes predeterminados
        mensaje.value = textoEncriptado;
        texto.value = ""; // Limpia el área de texto original
        imagen.style.display = "none"; // Oculta la imagen
        tituloMensaje.style.display = "none"; // Oculta el título predeterminado
        parrafo.style.display = "none"; // Oculta el párrafo predeterminado
        mensaje.style.display = "block"; // Muestra el textarea con el mensaje encriptado
        
    }
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
    }
    return stringEncriptada;
}

function btnDesencriptar() {
    if (!verificarTexto()) {
        return; // Sale de la función si el texto no es válido
    }
    const textoDesencriptado = desencriptar(mensaje.value.trim());
    texto.value = textoDesencriptado;
    
    // Limpiar el textarea del mensaje encriptado
    mensaje.value = "";
    mensaje.style.display = "none"; // Oculta el textarea

    // Mostrar la imagen y el mensaje predeterminado
    imagen.style.display = "block";
    tituloMensaje.style.display = "block";
    parrafo.style.display = "block";
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
    }
    return stringDesencriptada;
}

function copiarTexto() {
    // Obtiene el elemento textarea
    const textoEncriptado = document.getElementById('mensaje');
    
    // Verifica si hay texto en el textarea
    if (textoEncriptado.value.trim() === "") {
        // Muestra un mensaje de alerta si el textarea está vacío
        alert('Ingrese texto para copiar');
        return; // Sale de la función si no hay texto
    }
    
    // Selecciona el contenido del textarea
    textoEncriptado.select();
    textoEncriptado.setSelectionRange(0, 99999); // Para dispositivos móviles
    
    // Copia el contenido al portapapeles
    document.execCommand('copy');
    
    // Muestra un mensaje de éxito o cambia el estado del botón si lo deseas
    alert('Texto copiado al portapapeles');
}
