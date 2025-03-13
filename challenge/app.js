// app.js mejorado con validaciones y mejoras

let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }
    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return;
    }

    amigos.push(nombre);
    input.value = "";
    actualizarLista();
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.onclick = () => eliminarAmigo(index);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Agrega al menos 2 amigos para hacer el sorteo.");
        return;
    }
    let copia = [...amigos];
    let resultado = {};
    for (let amigo of amigos) {
        let posibles = copia.filter(a => a !== amigo);
        if (posibles.length === 0) {
            return alert("No se pudo realizar el sorteo. Intenta nuevamente.");
        }
        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        resultado[amigo] = elegido;
        copia = copia.filter(a => a !== elegido);
    }
    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    const lista = document.getElementById("resultado");
    lista.innerHTML = "";
    for (let [amigo, asignado] of Object.entries(resultado)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${asignado}`;
        lista.appendChild(li);
    }
}
