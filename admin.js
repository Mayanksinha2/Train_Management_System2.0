//admin_home

document.addEventListener('DOMContentLoaded', function() {
    // Load admin data
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
        alert('No admin logged in. Redirecting to login page...');
        window.location.href = 'index.html';
        return;
    }

    // Load aggregate data
    loadAggregateData();

    // Load customer data
    loadCustomerData();
});

function loadAggregateData() {
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
        salesPerQuarter[`Q${quarter}`] += parseInt(ticket.numberOfTickets) * 100; // Assuming each ticket costs 100
    });

    document.getElementById('ticketsPerClass').innerHTML = `
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
    `;

    document.getElementById('salesPerQuarter').innerHTML = `
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
    `;
}

function loadCustomerData() {
    const customers = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('ticket_')) {
            const ticket = JSON.parse(localStorage.getItem(key));
            if (!customers[ticket.userId]) {
                customers[ticket.userId] = {
                    id: ticket.userId,
                    name: ticket.name,
                    mobile: ticket.mobile,
                    tickets: 0
                };
            }
            customers[ticket.userId].tickets += parseInt(ticket.numberOfTickets);
        }
    }

    const customerTableBody = document.getElementById('customerTableBody');
    customerTableBody.innerHTML = '';
    Object.values(customers).forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.mobile}</td>
            <td>${customer.tickets}</td>
            <td><button onclick="deleteCustomer('${customer.id}')">Delete</button></td>
        `;
        customerTableBody.appendChild(row);
    });
}

function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer?')) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('ticket_')) {
                const ticket = JSON.parse(localStorage.getItem(key));
                if (ticket.userId === customerId) {
                    localStorage.removeItem(key);
                }
            }
        }
        alert('Customer deleted successfully!');
        loadCustomerData();
        loadAggregateData();
    }
}

function registerTrain(event) {
    event.preventDefault();
    const train = {
        id: Date.now(),
        name: document.getElementById('trainName').value,
        seats: document.getElementById('trainSeats').value,
        to: document.getElementById('trainTo').value,
        from: document.getElementById('trainFrom').value,
        ownership: document.getElementById('trainOwnership').value,
    };
    const trains = JSON.parse(localStorage.getItem('trains')) || [];
    trains.push(train);
    localStorage.setItem('trains', JSON.stringify(trains));
    alert('Train registered successfully!');
}

function updateProfile(event) {
    event.preventDefault();
    const admin = JSON.parse(localStorage.getItem('admin'));
    admin.username = document.getElementById('username').value;
    admin.password = document.getElementById('password').value;
    admin.mobile = document.getElementById('mobile').value;
    admin.email = document.getElementById('email').value;
    localStorage.setItem('admin', JSON.stringify(admin));
    alert('Profile updated successfully!');
}

function logout() {
    localStorage.removeItem('admin');
    alert('Logged out successfully! Redirecting to login page...');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}