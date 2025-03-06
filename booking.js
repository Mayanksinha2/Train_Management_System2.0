document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get('ticketId');
    const ticket = JSON.parse(localStorage.getItem(`ticket_${ticketId}`));
    if (ticket) {
        document.getElementById('ticketId').innerText = ticket.id;
        document.getElementById('trainId').innerText = ticket.train;
        document.getElementById('boardingStation').innerText = ticket.boardingStation;
        document.getElementById('destinationStation').innerText = ticket.destinationStation;
        document.getElementById('date').innerText = ticket.date;
        document.getElementById('numberOfTickets').innerText = ticket.numberOfTickets;
    } else {
        alert('Invalid ticket ID. Redirecting to home page...');
        window.location.href = 'home.html';
    }
});