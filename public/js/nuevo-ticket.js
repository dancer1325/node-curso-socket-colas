// File to custom the events via WebSocket between the client and the server
// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');


const socket = io(); // Comes from /socket.io/socket.io library


socket.on('connect', () => { // Listener to the "connect" event. Launched in case the socket client connects to the server
    btnCrear.disabled = false; // Enable the button when the socket connection is done
});

socket.on('disconnect', () => { // Listener to the "disconnect" event. Launched in case the socket client connects to the server
    btnCrear.disabled = true; // Disable the button when the socket connection is done
});

socket.on('ultimo-ticket', (ultimo) => { // Listener to the "ultimo-ticket" event. Launched in case the socket client connects to the server
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;
})


btnCrear.addEventListener( 'click', () => { // Add event listener to the "btnCrear" HTML element under action "click"
   
    socket.emit( 'siguiente-ticket', null, ( ticket ) => { // Emit events
        lblNuevoTicket.innerText = ticket;
    });

});