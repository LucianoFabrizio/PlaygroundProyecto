window.onload = function(){

const form = document.querySelector("form.formulario");
const name = document.getElementById("name")
const email = document.getElementById("email");
const password = document.querySelector("password");
const password2 = document.querySelector("password2")


form.addEventListener("submit", (e)=> {

    let errores = []
    
    if(name.value == ""){
        errores.push("el campo no debe estar vacio")
        alert("el campo no debe estar vacio")
    } else if (name.value > 2){
        errores.push("el nombre debe tener al menos 3 caracteres")
        alert("el nombre debe tener al menos 3 caracteres")
    }


    let atposition=email.value.indexOf("@");  
    let dotposition=email.value.lastIndexOf(".");  
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.value.length){  
        errores.push("ingresa un mail válido")
        alert("ingresa un mail válido")
    }


    if(password == ""){ 
        errores.push("el campo no debe estar vacío")
        alert("el campo no debe estar vacío")
    } else if(password != password2){
        errores.push("las contraseñas deben coincidir")
        alert("las contraseñas deben coincidir")
    }
    })

    e.preventDefault();
}