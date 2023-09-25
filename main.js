document.addEventListener("DOMContentLoaded", () => {
    const url = "https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/prueba000";
    const enviar = document.getElementById("enviar");
    const borraTodo = document.getElementById("borraTodo");
    const mostrarLista = document.getElementById("mostrarLista");
    let tabla = document.getElementById("cuerpoTabla");

    async function fetchData(url){ // Acorta codigo del fetch y su response
        const response = await fetch(url);
        return await response.json();
    };

    enviar.addEventListener("click", () => {
        let persona = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value, 
            grupo: document.getElementById("grupo").value, 
            sala: document.getElementById("sala").value
        };

        let options = {
            headers: {"Content-Type": "application/json; charset=utf-8"},
            method: 'POST',
            body: JSON.stringify(persona)
        };

        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            Array.from(document.getElementsByClassName("campos")).forEach(element => {element.value = "";});
            agregarElemento(data);
        })
    });

    mostrarLista.addEventListener("click", () => {
        fetchData(url)
        .then(data => {
            tabla.innerHTML = "";
            let contador = 0;
            let intervaloID = setInterval(() => {
                if (contador < data.length){
                    agregarElemento(data[contador]);
                    contador++;
                }
                else{
                    clearInterval(intervaloID);
                };
            }, 0); // 1500
        })
    });

    function agregarElemento(element){
        let tr = document.createElement("tr");
        let buttonDelete = document.createElement("button");
        let buttonEdit = document.createElement("button");
        let img = document.createElement("img");

        tr.innerHTML = `<td>${element.nombre}</td><td>${element.apellido}</td><td>${element.grupo}</td><td>${element.sala}</td>`;

        img.src = "basura.png";
        buttonDelete.addEventListener("click", () => {
            eliminarElemento(element._id, tr);
            tr.remove();
        });

        buttonEdit.addEventListener("click", () => {
            editarElemento(element._id);
        });

        buttonEdit.innerHTML = "editar";
        buttonDelete.appendChild(img);
        tr.appendChild(buttonEdit);
        tr.appendChild(buttonDelete);
        tabla.appendChild(tr); 
    }


    function eliminarElemento(id){
        fetch(url + "/" + id, {method: 'DELETE'});
    };

    // function editarElemento(id){
    //     let options = {
    //         headers: {"Content-Type": "application/json; charset=utf-8"},
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             nombre: "nombre",
    //             apellido: "apellido",
    //             grupo: "grupo",
    //             sala: "sala"
    //         })
    //     };

    //     fetchData(url)
    //     .then(data => {
    //         console.log(data)
    //         let nombre = document.getElementById("nombre");
    //         let apellido = document.getElementById("apellido");
    //         let grupo = document.getElementById("grupo");
    //         let sala = document.getElementById("sala");
            
    //         fetch(url + "/" + id, options)
    //     })
        
    // };

    function editarElemento(id){
        fetchData(url + "/" + id)
        .then(data => {
            document.getElementById("nombre").value = data.nombre;
            document.getElementById("apellido").value = data.apellido;
            document.getElementById("grupo").value = data.grupo;
            document.getElementById("sala").value = data.sala;
        })
    }


    // ALERTA DE CONFIRMACION PARA ELIMINAR TODA LA LISTA
    const customConfirm = document.getElementById("custom-confirm");
    const confirmYes = document.getElementById("confirm-yes");
    const confirmNo = document.getElementById("confirm-no");

    borraTodo.addEventListener("click", () => { 
        customConfirm.style.display = "block"; // Mostrar la ventana de confirmación
    });

    confirmYes.addEventListener("click", () => { // Ejecutar la eliminación si se confirma
        fetchData(url)
        .then(data => {
            data.forEach(element => {
                eliminarElemento(element._id);
            });
            tabla.innerHTML = "";
        });

        customConfirm.style.display = "none"; // Ocultar la ventana de confirmación después de la eliminación
    });

    confirmNo.addEventListener("click", () => { 
        customConfirm.style.display = "none"; // Ocultar la ventana de confirmación si se cancela
    });

});

