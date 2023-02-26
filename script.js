const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const copia = document.querySelector(".copiar");

copia.style.display = "none";

function validarTexto() {
  let textoEscrito = textArea.value;
  let validador = textoEscrito.match(
    /^[a-z\s!@#$%^&*()_+\-\=\[\]\\{}|\;':"<>,.?\/]*$/
  );

  if (!validador || validador === 0) {
    alert("Solo son permitidas letras minúsculas y sin acentos");
    location.reload();
    return true;
  }
}

function Encriptar() {
  if (!validarTexto()) {
    const textoEncriptado = encriptar(textArea.value);
    mensaje.value = textoEncriptado;
    mensaje.style.backgroundImage = "none";
    textArea.value = "";
    copia.style.display = "block";
  }
}

function encriptar(stringE) {
  const llavesEncript = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];

  const textoEnMinusculas = stringE.toLowerCase();

  const textoEncriptado = textoEnMinusculas
    .split("")
    .map((letra) => {
      const llaveEncontrada = llavesEncript.find((llave) => llave[0] === letra);
      return llaveEncontrada ? llaveEncontrada[1] : letra;
    })
    .join("");

  return textoEncriptado;
}

function Desencriptar() {
  const textoEncriptado = desencriptar(textArea.value);
  mensaje.value = textoEncriptado;
  textArea.value = "";
  copia.style.display = "block";
}

function desencriptar(stringD) {
  const llavesEncript = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];

  return llavesEncript.reduce((str, [key, value]) => {
    const regex = new RegExp(value, "g");
    return str.replace(regex, key);
  }, stringD.toLowerCase());
}

document.querySelector(".copiar").addEventListener("click", () => {
  mensaje.select();
  navigator.clipboard.writeText(mensaje.value);
  mensaje.value = "";
  alert("Texto Copiado");
  copia.style.display = "none";
});
