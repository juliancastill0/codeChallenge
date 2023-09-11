const url = "https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/prueba000";


document.addEventListener("DOMContentLoaded", () => {
    let tabla = document.getElementById("cuerpoTabla");
    const borraTodo = document.getElementById("borraTodo")

    borraTodo.addEventListener("click", () => {
        fetch(url)
        .then(response=>response.json())
        .then (datos => {
            for (let i = 0; i < datos.length; i++){;
                fetch(url + '/' + datos[i]._id, {headers: {"Content-Type": "application/json; charset=utf-8"}, method:'delete'})
            };
            tabla.innerHTML = "";
        })
    })

    function agregarALista(){
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let element = data[data.length - 1];
            let tr = document.createElement("tr");
            tr.innerHTML += '<td>' + element.nombre + '</td><td>' + element.apellido + '</td><td>' + element.grupo + '</td><td>' + element.sala + '</td>';
            let button = document.createElement("button");
            button.innerHTML = "borrar";
            button.addEventListener("click", () => {
                fetch(url + "/" + element._id, {method: 'DELETE'})
                tr.remove();
            });
            tr.appendChild(button);
            tabla.appendChild(tr);

        })
    };

    document.getElementById("enviar").addEventListener("click", () => {
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
        })

        agregarALista();
    });
});