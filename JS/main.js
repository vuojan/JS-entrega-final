fetch(URLProvincias)
    .then((response)=> data = response.json() )
    .then((data)=> provincias.push(...data))
    .then(()=> cargarArrays(provincias,selectProvincia))

fetch(URLpanelesPotencia)
    .then((response)=> data = response.json() )
    .then((data)=> panelesPotencia.push(...data))
    .then(()=> cargarArrays(panelesPotencia,selectPotencia))

function cargarArrays (array,select){
    if (array.length > 0) {
         array.forEach(elemento => {
             select.innerHTML += `<option value= "${elemento.value}"> ${elemento.input}</option>`
         });
     } 
 }

const validador = () => {
    return (selectProvincia.value != '' && inputConsumo.value > 0 && selectPotencia.value != '' && (inputNombre.value != '' && isNaN(inputNombre.value)) && (inputApellido.value != '' && isNaN(inputApellido.value)) && inputMail.value != '' )
}  

const calcular = ()=> {
    const calcu = new Calculador (selectProvincia.value, inputConsumo.value, parseInt(selectPotencia[selectPotencia.selectedIndex].text))
        inputPaneles.value = calcu.calculoPaneles() 
        inputCosto.value = calcu.calculoPaneles () * selectPotencia.value
}

const revisarDatos = ()=> {
    Swal.fire({
        icon: 'error',
        title: 'Caramba!',
        text: 'Por favor, verificar los datos ingresados!',
        customClass: {
        confirmButton: 'confirmBtn',
    }
      })
}

const ejecutarCalculador = ()=> {
    if (validador()){
        calcular ()
        hiddenForm.classList.remove ("hiddenForm--displaynone")
    }else{
        revisarDatos()
    }
}

const mailEnviado = ()=> {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te hemos un enviado un correo con los resultados!',
        text: 'Gracias por confiar en nosotros!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: 'true'
      })
}

const enviarMail =()=> {
    const panelesNecesarios = {nombre: inputNombre.value,
                               apellido: inputApellido.value, 
                               mail: inputMail.value,
                               provincia: selectProvincia[selectProvincia.selectedIndex].text,
                               consumo: inputConsumo.value,
                               potencia: selectPotencia[selectPotencia.selectedIndex].text,
                               paneles: inputPaneles.value,
                               costo: inputCosto.value}

    localStorage.setItem("calculoRealizado", JSON.stringify(panelesNecesarios))
    mailEnviado()

    const inputs = document.querySelectorAll("#nombre, #apellido,#mail,#ubicacion,#consumo,#potencia")
    inputs.forEach(input=>{
        input.value=''
    })
    
    hiddenForm.classList.add ("hiddenForm--displaynone")
}

botonDimensionar.addEventListener("click", ejecutarCalculador)
botonEnviar.addEventListener("click", enviarMail)
