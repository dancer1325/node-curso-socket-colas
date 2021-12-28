// File to custom the events via WebSocket between the client and the server
// Referencias HTML
const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');


const socket = io(); // Comes from /socket.io/socket.io library



socket.on('estado-actual', ( payload ) => { // Launched in case the socket server emit the event "estado-actual"

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play(); // Reproduce an audio


    const [ ticket1, ticket2, ticket3, ticket4 ] = payload; // Destructuring the payload

    if( ticket1 ){
        lblTicket1.innerText = 'Ticket ' + ticket1.numero; //Insert the information into the HTML element
        lblEscritorio1.innerText = ticket1.escritorio; //Insert the information into the HTML element
    }
    
    if( ticket2 ){
        lblTicket2.innerText = 'Ticket ' + ticket2.numero; //Insert the information into the HTML element
        lblEscritorio2.innerText = ticket2.escritorio; //Insert the information into the HTML element
    }
    
    if( ticket3 ){
        lblTicket3.innerText = 'Ticket ' + ticket3.numero; //Insert the information into the HTML element
        lblEscritorio3.innerText = ticket3.escritorio; //Insert the information into the HTML element
    }
    
    if( ticket4 ){
        lblTicket4.innerText = 'Ticket ' + ticket4.numero; //Insert the information into the HTML element
        lblEscritorio4.innerText = ticket4.escritorio; //Insert the information into the HTML element
    }
    


});