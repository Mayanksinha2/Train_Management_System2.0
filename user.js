


//Home.html


document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        // alert('No user logged in. Redirecting to login page...');
        window.location.href = 'index.html';
        return;
    }

    // Populate user ID in Book Ticket form
    document.getElementById('userId').value = user.username;

    // Load available trains
    loadAvailableTrains();

    // Handle form submissions
    document.getElementById('bookTicketForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const ticket = {
            id: Date.now(),
            userId: user.username,
            name: document.getElementById('name').value,
            mobile: document.getElementById('mobile').value,
            age: document.getElementById('age').value,
            date: document.getElementById('date').value,
            boardingStation: document.getElementById('boardingStation').value,
            destinationStation: document.getElementById('destinationStation').value,
            ticketCategory: document.getElementById('ticketCategory').value,
            train: document.getElementById('train').value,
            numberOfTickets: document.getElementById('numberOfTickets').value
        };
        localStorage.setItem(`ticket_${ticket.id}`, JSON.stringify(ticket));
        alert('Ticket booked successfully! Redirecting to booking confirmation page...');
        setTimeout(() => {
            window.location.href = `booking_confirmation.html?ticketId=${ticket.id}`;
        }, 1000);
    });

    // Load tickets for View Ticket section
    loadTickets();

    // Calculate and display aggregate data
    calculateAggregateData();
});

function loadAvailableTrains() {
    const dummyTrains = [
        { name: 'Entercity Express' },
        { name: 'RajyaRani Express' },
        { name: 'Coalfield Express' },
        { name: 'Lokman Tilak Express' }
    ];

    const trains = JSON.parse(localStorage.getItem('trains')) || [];
    const trainSelect = document.getElementById('train');
    trainSelect.innerHTML = '';

    dummyTrains.concat(trains).forEach(train => {
        const option = document.createElement('option');
        option.value = train.name;
        option.textContent = train.name;
        trainSelect.appendChild(option);
    });
}



function loadTickets() {
    const user = JSON.parse(localStorage.getItem('user'));
    const ticketsContainer = document.getElementById('ticketsContainer');
    ticketsContainer.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('ticket_')) {
            const ticket = JSON.parse(localStorage.getItem(key));
            if (ticket.userId === user.username) {
                const ticketElement = document.createElement('div');
                ticketElement.className = 'ticket';
                ticketElement.innerHTML = `
                    <p><strong>Ticket ID:</strong> ${ticket.id}</p>
                    <p><strong>Train ID:</strong> ${ticket.train}</p>
                    <p><strong>User ID:</strong> ${ticket.userId}</p>
                    <p><strong>User Name:</strong> ${ticket.name}</p>
                    <p><strong>Boarding Station:</strong> ${ticket.boardingStation}</p>
                    <p><strong>Destination Station:</strong> ${ticket.destinationStation}</p>
                    <p><strong>Boarding Date and Time:</strong> ${ticket.date}</p>
                    <p><strong>Number of Tickets:</strong> ${ticket.numberOfTickets}</p>
                    <button onclick="cancelTicket(${ticket.id})">Cancel Ticket</button>
                `;
                ticketsContainer.appendChild(ticketElement);
            }
        }
    }
}

function calculateAggregateData() {
    const tickets = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('ticket_')) {
            tickets.push(JSON.parse(localStorage.getItem(key)));
        }
    }

    const ticketsPerClass = {
        'First class': 0,
        'A.C tier 1': 0,
        'A.C tier 2': 0,
        'Tatkal': 0
    };

    const salesPerQuarter = {
        Q1: 0,
        Q2: 0,
        Q3: 0,
        Q4: 0
    };

    tickets.forEach(ticket => {
        ticketsPerClass[ticket.ticketCategory] += parseInt(ticket.numberOfTickets);

        const date = new Date(ticket.date);
        const month = date.getMonth() + 1;
        const quarter = Math.ceil(month / 3);
        salesPerQuarter[`Q${quarter}`] += parseInt(ticket.numberOfTickets) * 500; // Assuming each ticket costs 100
    });

    document.getElementById('ticketsPerClass').innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Class</th>
                    <th>Tickets Booked</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>First class</td>
                    <td>${ticketsPerClass['First class']}</td>
                </tr>
                <tr>
                    <td>A.C tier 1</td>
                    <td>${ticketsPerClass['A.C tier 1']}</td>
                </tr>
                <tr>
                    <td>A.C tier 2</td>
                    <td>${ticketsPerClass['A.C tier 2']}</td>
                </tr>
                <tr>
                    <td>Tatkal</td>
                    <td>${ticketsPerClass['Tatkal']}</td>
                </tr>
            </tbody>
        </table>
    `;

    document.getElementById('salesPerQuarter').innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Quarter</th>
                    <th>Sales (₹)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Q1</td>
                    <td>₹${salesPerQuarter.Q1}</td>
                </tr>
                <tr>
                    <td>Q2</td>
                    <td>₹${salesPerQuarter.Q2}</td>
                </tr>
                <tr>
                    <td>Q3</td>
                    <td>₹${salesPerQuarter.Q3}</td>
                </tr>
                <tr>
                    <td>Q4</td>
                    <td>₹${salesPerQuarter.Q4}</td>
                </tr>
            </tbody>
        </table>
    `;
}

function cancelTicket(ticketId) {
    if (confirm('Are you sure you want to cancel this ticket?')) {
        localStorage.removeItem(`ticket_${ticketId}`);
        alert('Ticket cancelled successfully!');
        location.reload();
    }
}

function updateDetails() {
    const user = JSON.parse(localStorage.getItem('user'));
    user.email = document.getElementById('updateEmail').value;
    user.mobileNumber = document.getElementById('updateMobile').value;
    user.address = document.getElementById('updateAddress').value;
    if (document.getElementById('updatePassword').value) {
        if (document.getElementById('currentPassword').value === user.password) {
            if (document.getElementById('newPassword').value === document.getElementById('confirmPassword').value) {
                user.password = document.getElementById('newPassword').value;
            } else {
                alert('New password and confirm password do not match.');
                return;
            }
        } else {
            alert('Current password is incorrect.');
            return;
        }
    }
    localStorage.setItem('user', JSON.stringify(user));
    alert('Details updated successfully!');
}

function logout() {
    localStorage.removeItem('user');
    // alert('Logged out successfully! Redirecting to login page...');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}