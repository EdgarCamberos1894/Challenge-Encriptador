// Objeto con la clave de encriptación
const CLAVE_ENCRIP = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};

// Ocultar el botón de copiar al inicio
document.getElementById("btnCopiar").style.display = "none";




// Función para encriptar el texto
function encriptar() {
    let texto = document.getElementById("txtAreaEncDes").value; // Obtener el texto del textarea
    let textAreaResultado = document.getElementById("txtAreaResultado");

    // Expresión regular que coincida con todas las vocales (insensible a mayúsculas y minúsculas)
    let regex = /[aeiou]/ig;

    // Reemplazar las coincidencias de vocales con los valores de la clave de encriptación
    let textoEncriptado = texto.replace(regex, vocal => CLAVE_ENCRIP[vocal.toLowerCase()] || vocal);

    textAreaResultado.value = textoEncriptado;

    ocultarElementosAdicionales();
}

// Función para desencriptar el texto
function desencriptar() {
    let textoEncriptado = document.getElementById("txtAreaEncDes").value; // Obtener el texto del textarea
    let textAreaResultado = document.getElementById("txtAreaResultado");

    // Recorrer el texto encriptado y revertir los valores en la clave de encriptación
    Object.entries(CLAVE_ENCRIP).forEach(([vocal, valor]) => {
        let regex = new RegExp(valor, 'g');
        textoEncriptado = textoEncriptado.replace(regex, vocal);
    });

    textAreaResultado.value = textoEncriptado;

    ocultarElementosAdicionales();
}

// Función para copiar el texto al portapapeles
function copiar() {
    let botonCopiar = document.getElementById("btnCopiar");
    let resultado = document.getElementById("txtAreaResultado");

    // Copiar el texto al portapapeles
    navigator.clipboard.writeText(resultado.value);

    // Cambiar el texto del botón a "Copiado!" y restaurarlo después de 2 segundos
    botonCopiar.textContent = "Copiado!";
    setTimeout(function () {
        botonCopiar.innerHTML = "<i class='fas fa-copy'></i>";
    }, 2000);
}

// Función para limpiar los textos y mostrar elementos ocultos
function limpiar() {
    isSpaceAllowed = false;
    document.getElementById('txtAreaEncDes').value = '';
    document.getElementById('txtAreaResultado').value = '';
    document.getElementById('btnCopiar').style.display = 'none';
    mostrarElementosAdicionales();
    document.getElementById('txtAreaEncDes').focus();
}

// Función para ocultar elementos adicionales
function ocultarElementosAdicionales() {
    document.getElementById('mensaje-no-encontrado').style.display = 'none';
    document.getElementById('imagen-placeholder').style.display = 'none';
    document.getElementById('texto-instruccion').style.display = 'none';
    document.getElementById("btnCopiar").style.display = "block"; // Mostrar el botón de copiar
}

// Función para mostrar elementos adicionales
function mostrarElementosAdicionales() {
    document.getElementById('mensaje-no-encontrado').style.display = 'block';
    document.getElementById('imagen-placeholder').style.display = 'block';
    document.getElementById('texto-instruccion').style.display = 'block';
}

// Agregar evento al textArea para validar cada carracter ingresado
document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById("txtAreaEncDes");
    textarea.addEventListener("input", validateInput);
});

// Función de validación de caracteres
let isSpaceAllowed = false;
function validateInput(event) {
    const textarea = event.target;
    const char = textarea.value.slice(-1);
    const isLetter = /^[a-zA-Z]$/.test(char); // Verifica si el carácter es una letra (mayúscula o minúscula)
    const isEmpty = textarea.value.trim() === ''; // Verifica si el textarea está vacío

    if (isEmpty && char === ' ') {
        // Si el textarea está vacío y se intenta agregar un espacio en blanco, se ignora
        textarea.value = '';
        return;
    }


    // Verificar si el carácter es una letra sin acentos y sin caracteres especiales
    if (isLetter) {
        // Convertir a minúscula si es una letra mayúscula
        const validChar = char.toLowerCase();
        textarea.value = textarea.value.slice(0, -1) + validChar;
        // Permitir espacios en blanco después de haber ingresado al menos un carácter
        isSpaceAllowed = true;
    } else if (isSpaceAllowed && char === ' ') {
        // Permitir espacios en blanco si están permitidos y se ingresa uno
        textarea.value = textarea.value.slice(0, -1)+ ' ';
    } else {
        // Si no es una letra ni un espacio en blanco, no se permite añadir al textarea
        textarea.value = textarea.value.slice(0, -1);
    }
}