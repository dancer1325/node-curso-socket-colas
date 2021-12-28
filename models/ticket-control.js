const path = require('path');
const fs   = require('fs');

class Ticket {
    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

// Class to control the tickets created
class TicketControl {


    constructor() {
        this.ultimo   = 0;
        this.hoy      = new Date().getDate(); // it just returns the day, not hours ..
        this.tickets  = [];
        this.ultimos4 = [];

        this.init(); // Each time an instance of TicketControl is created --> It will launch init()
    }


    get toJson() { // Return the properties stored in the .json
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }

    init() {
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json'); // Destructuring the .json directly
        if ( hoy === this.hoy ) { // Just in case the information stored in the "../db/data.json" is today --> We will use them
            this.tickets  = tickets;
            this.ultimo   = ultimo;
            this.ultimos4 = ultimos4;
        } else { // Launch from the scratch
            // Es otro dia
            this.guardarDB();
        }
    }

    guardarDB() {

        const dbPath = path.join( __dirname, '../db/data.json' ); // Establish the folder's path
        // "__dirname" points to the current location to the file "ticket-control.js" --> That's why "../" to move to the previous/up location
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) ); // Override the file each day

    }

    siguiente() {
        this.ultimo += 1; // Update TicketControl class with a new entry
        const ticket = new Ticket( this.ultimo, null ); // Create a new ticket
        this.tickets.push( ticket ); // Update TicketControl class with a new entry in the array of tickets

        this.guardarDB();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket( escritorio ) {

        // No tenemos tickets
        if ( this.tickets.length === 0 ) {
            return null;
        }

        const ticket = this.tickets.shift(); // ===  this.tickets[0]; this.tickets[i] = this.tickets[i+1]   === Pick the first element, removing and switching all  one less position
        ticket.escritorio = escritorio;

        this.ultimos4.unshift( ticket ); // Insert an element at the start of the array

        if ( this.ultimos4.length > 4 ) {
            this.ultimos4.splice(-1,1);  // Remove elements from an array, from the end
        }

        this.guardarDB();

        return ticket;
    }



}



module.exports = TicketControl;