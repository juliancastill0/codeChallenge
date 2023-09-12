document.addEventListener("DOMContentLoaded", () => {
    const url = "https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/prueba000";
    const enviar = document.getElementById("enviar");
    const borraTodo = document.getElementById("borraTodo");
    const mostrarTodo = document.getElementById("mostrarTodo");
    let tabla = document.getElementById("cuerpoTabla");

    enviar.addEventListener("click", () => {
        let persona = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value, 
            grupo: document.getElementById("grupo").value, 
            sala: document.getElementById("sala").value
        };

        let options = {
            headers: {"Content-Type": "application/json; charset=utf-8"}, 
            method: "POST", 
            body: JSON.stringify(persona)
        };

        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            Array.from(document.getElementsByClassName("campos")).forEach(element => {element.value = "";});
            agregarALista();
        })
    });

    borraTodo.addEventListener("click", () => {
        fetch(url)
        .then(response => response.json())
        .then (data => {
            data.forEach(element => {
                fetch(url + '/' + element._id, {method:'DELETE'})
            });
            tabla.innerHTML = "";
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

                tr.innerHTML = `<td>${element.nombre}</td><td>${element.apellido}</td><td>${element.grupo}</td><td>${element.sala}</td>`;
                boton.innerHTML = "🗑️";
                boton.addEventListener("click", () => {
                    fetch(url + "/" + element._id, {method: 'DELETE'})
                    tr.remove();
                })

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

            tr.innerHTML = `<td>${element.nombre}</td><td>${element.apellido}</td><td>${element.grupo}</td><td>${element.sala}</td>`;
            button.innerHTML = "🗑️";
            button.addEventListener("click", () => {
                fetch(url + "/" + element._id, {method: 'DELETE'})
                tr.remove();
            });

            tr.appendChild(button);
            tabla.appendChild(tr);

        })
    };
});