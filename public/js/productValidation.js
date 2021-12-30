window.onload = function(){

const form = document.querySelector("form.formulario");
const name = document.querySelector("name");
const description = document.querySelector("description");
const image = document.querySelector("image");

form.addEventListener("submit", (e) => {

    let errores = []

    if(name.value == ""){
        errores.push("el campo no debe estar vacio")
        alert("el campo no debe estar vacio")
    } else if (name.value > 4){
        errores.push("el nombre debe tener al menos 5 caracteres")
        alert("el nombre debe tener al menos 5 caracteres")
    }

    if (description.value == 19){
        errores.push("el nombre debe tener al menos 20 caracteres")
        alert("el nombre debe tener al menos 20 caracteres")
    }

    let extension = (path.extname(image.value)).toLowerCase();
    if (extension != (".jpg" && ".png" && ".jpeg" && ".gif")){
        errores.push("la extensión de la imagen debe ser de las siguientes: JPG, PNG, JPEG o GIF")
        alert("la extensión de la imagen debe ser de las siguientes: JPG, PNG, JPEG o GIF")
    }
    console.log(errores)
})
}
