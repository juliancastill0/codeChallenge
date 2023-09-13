document.addEventListener("DOMContentLoaded", () => {
    const url = "https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/prueba000";
    const enviar = document.getElementById("enviar");
    const borraTodo = document.getElementById("borraTodo");
    const mostrarTodo = document.getElementById("mostrarTodo");
    let tabla = document.getElementById("cuerpoTabla");

    enviar.addEventListener("click", () => {
        let options = {
            headers: {"Content-Type": "application/json; charset=utf-8"}, 
            method: "POST", 
            body: JSON.stringify(persona)
        };
        
        let persona = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value, 
            grupo: document.getElementById("grupo").value, 
            sala: document.getElementById("sala").value
        };

        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            Array.from(document.getElementsByClassName("campos")).forEach(element => {element.value = "";});
            agregarALista();
        })
    });
    

    mostrarTodo.addEventListener("click", () => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            tabla.innerHTML = "";
            data.forEach(element => {   
                let tr = document.createElement("tr");
                let boton = document.createElement("button");
                let img = document.createElement("img");

                tr.innerHTML = `<td>${element.nombre}</td><td>${element.apellido}</td><td>${element.grupo}</td><td>${element.sala}</td>`;
                
                img.src = "basura.png";
                img.addEventListener("click", () => {
                    borrarElemento(element._id, tr);
                });

                boton.appendChild(img); // Agregar la imagen al botón
                tr.appendChild(boton);
                tabla.appendChild(tr);
            });
        })
    });

    function agregarALista(){
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let element = data[data.length - 1];
            let tr = document.createElement("tr");
            let button = document.createElement("button");
            let img = document.createElement("img");

            tr.innerHTML = `<td>${element.nombre}</td><td>${element.apellido}</td><td>${element.grupo}</td><td>${element.sala}</td>`;
            
            img.src = "basura.png";
            img.addEventListener("click", () => {
                borrarElemento(element._id, tr);
            });

            button.appendChild(img); // Agregar la imagen al botón
            tr.appendChild(button);
            tabla.appendChild(tr);

        })
    };

    function borrarElemento(id, tr){
        fetch(url + "/" + id, {method: 'DELETE'});
        tr.remove();
    };

        // PARA PONERLE ESTILO A LA ALERTA DE CONFIRMACION
        const customConfirm = document.getElementById("custom-confirm");
        const confirmYes = document.getElementById("confirm-yes");
        const confirmNo = document.getElementById("confirm-no");
        
        borraTodo.addEventListener("click", () => {
            // Mostrar la ventana de confirmación
            customConfirm.style.display = "block";
        });
        
        confirmYes.addEventListener("click", () => {
            // Ejecutar la eliminación si se confirma
            fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    fetch(url + '/' + element._id, {method:'DELETE'});
                });
                tabla.innerHTML = "";
            });
        
            // Ocultar la ventana de confirmación después de la eliminación
            customConfirm.style.display = "none";
        });
        
        confirmNo.addEventListener("click", () => {
            // Ocultar la ventana de confirmación si se cancela
            customConfirm.style.display = "none";
        });
        //  TERMINA LA ALERTA DE CONFIRMACION
        

});

