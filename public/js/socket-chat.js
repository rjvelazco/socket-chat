var socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(res) {
        console.log('Usuarios conectados: ', res);
    });
});

// on -> escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});

// Enviar informacion.
// socket.emit('crearMensaje', {
//     usuario: 'Rafael',
//     mensaje: 'Hola Mundo'
// }, function(res) {
//     console.log('Respuesta server: ', res);
// });

// Escuchar informacion
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor: ', mensaje);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    console.log(personas);
});

// Mensajes privados

socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado: ', mensaje);
});