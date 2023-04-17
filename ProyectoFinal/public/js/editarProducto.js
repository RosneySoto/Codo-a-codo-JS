// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
const contenedor = document.querySelector("#imagenCargada")
const elInput = document.querySelector("#rutaImagen");

contenedor.addEventListener("click", function (e) {
    if (elInput) {
        elInput.click();
        document.querySelector("#imagenCargada img").style.display = "none";
        elInput.style.display = "block"
        contenedor.classList.remove("editar")
    }
}, false);