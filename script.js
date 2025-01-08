function agregarPantalla() {
    var pantalla = document.getElementById('pantalla').value;
    var fecha = document.getElementById('fecha').value;
    var hora = document.getElementById('hora').value;
    var agente = document.getElementById('agente').value;
    var estatus = document.getElementById('estatus').value;

    if (pantalla && fecha && hora && agente && estatus) {
        var tableBody = document.getElementById('pantallas-body');
        var row = document.createElement('tr');

        var cellPantalla = document.createElement('td');
        var cellFecha = document.createElement('td');
        var cellHora = document.createElement('td');
        var cellAgente = document.createElement('td');
        var cellEstatus = document.createElement('td');

        cellPantalla.textContent = pantalla;
        cellFecha.textContent = fecha;
        cellHora.textContent = hora;
        cellAgente.textContent = agente;
        cellEstatus.textContent = estatus;

        row.appendChild(cellPantalla);
        row.appendChild(cellFecha);
        row.appendChild(cellHora);
        row.appendChild(cellAgente);
        row.appendChild(cellEstatus);

        tableBody.appendChild(row);

        document.getElementById('pantalla').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('hora').value = '';
        document.getElementById('agente').value = '';
        document.getElementById('estatus').value = 'disponible';

        // Guardar en localStorage
        guardarPantallas();
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

function filtrarPantallas() {
    var filterDate = document.getElementById('filtrarFecha').value;
    var tableBody = document.getElementById('pantallas-body');
    var rows = tableBody.getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var cellFecha = row.getElementsByTagName('td')[1];
        var fecha = cellFecha.textContent;

        if (fecha === filterDate || filterDate === '') {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

function guardarPantallas() {
    var tableBody = document.getElementById('pantallas-body');
    var rows = tableBody.getElementsByTagName('tr');
    var pantallas = [];

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var pantalla = {
            nombre: row.getElementsByTagName('td')[0].textContent,
            fecha: row.getElementsByTagName('td')[1].textContent,
            hora: row.getElementsByTagName('td')[2].textContent,
            agente: row.getElementsByTagName('td')[3].textContent,
            estatus: row.getElementsByTagName('td')[4].textContent
        };
        pantallas.push(pantalla);
    }

    localStorage.setItem('pantallas', JSON.stringify(pantallas));
}

function cargarPantallas() {
    var pantallas = JSON.parse(localStorage.getItem('pantallas') || '[]');
    var tableBody = document.getElementById('pantallas-body');

    for (var i = 0; i < pantallas.length; i++) {
        var pantalla = pantallas[i];
        var row = document.createElement('tr');

        var cellPantalla = document.createElement('td');
        var cellFecha = document.createElement('td');
        var cellHora = document.createElement('td');
        var cellAgente = document.createElement('td');
        var cellEstatus = document.createElement('td');

        cellPantalla.textContent = pantalla.nombre;
        cellFecha.textContent = pantalla.fecha;
        cellHora.textContent = pantalla.hora;
        cellAgente.textContent = pantalla.agente;
        cellEstatus.textContent = pantalla.estatus;

        row.appendChild(cellPantalla);
        row.appendChild(cellFecha);
        row.appendChild(cellHora);
        row.appendChild(cellAgente);
        row.appendChild(cellEstatus);

        tableBody.appendChild(row);
    }
}

// Cargar pantallas al cargar la página
window.onload = cargarPantallas;
