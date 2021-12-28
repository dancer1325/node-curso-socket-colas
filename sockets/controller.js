const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // Cuando un cliente se conecta
    socket.emit( 'ultimo-ticket', ticketControl.ultimo ); // It will launch the event 'ultimo-ticket' via socket with a payload
    socket.emit( 'estado-actual', ticketControl.ultimos4 ); // It will launch the event 'estado-actual' via socket with a payload
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length); // It will launch the event 'tickets-pendientes' via socket with a payload
        

    socket.on('siguiente-ticket', ( payload, callback ) => { // Socket to listen on 'siguiente-ticket' event
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length); // To be launched to all clients connected to the server via socket, not just the one which trigger the call to the server

    });

    socket.on('atender-ticket', ({ escritorio }, callback) => { // Socket to listen on 'atender-ticket' event
        
        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'Es escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 ); // To be launched to all clients connected to the server via socket, not just the one which trigger the call to the server
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length); // It will launch the event 'tickets-pendientes' via socket with a payload
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length); // To be launched to all clients connected to the server via socket, not just the one which trigger the call to the server

        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }

    })

}



module.exports = {
    socketController
}

