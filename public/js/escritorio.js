// File to custom the events via WebSocket between the client and the server
// Referencias HTML
const lblEscritorio = document.querySelector('h1'); // Find first h1 element
const btnAtender    = document.querySelector('button'); // Find first button element
const lblTicket     = document.querySelector('small'); // Find first small element
const divAlerta     = document.querySelector('.alert'); // Find first element with class 'alert'
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams( window.location.search ); // Window interface is a window containing a DOM document

if ( !searchParams.has('escritorio') ) { // If there is no 'escritorio' param in the URL --> Move to the index.html
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio'); // Get the value of the element
lblEscritorio.innerText = escritorio; // Override the value of the selector h1

divAlerta.style.display = 'none'; // Not to show by default


const socket = io(); // Comes from /socket.io/socket.io library


socket.on('connect', () => { // Listener to the "connect" event. Launched in case the socket client connects to the server
    btnAtender.disabled = false;
});

socket.on('disconnect', () => { // Listener to the "disconnect" event. Launched in case the socket client connects to the server
    btnAtender.disabled = true;
});

socket.on('tickets-pendientes', ( pendientes ) => { // Listener to the "tickets-pendientes" event. Launched in case the socket client connects to the server
    if ( pendientes === 0 ) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
    }
})


btnAtender.addEventListener( 'click', () => { // Add event listener to the "btnAtender" HTML element under action "click"
    

    socket.emit( 'atender-ticket', { escritorio }, ( { ok, ticket, msg } ) => { // Emit events
        
        if ( !ok ) { // Callback's argument to control if there are elements or not
            lblTicket.innerText = 'Nadie.';
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = 'Ticket ' + ticket.numero;

    });
    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});



