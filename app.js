let customers = [];

document.getElementById('customerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('customerName').value;
    let phone = document.getElementById('customerPhone').value;
    let outstandingAmount = parseFloat(document.getElementById('outstandingAmount').value);

    customers.push({ name, phone, outstandingAmount });
    displayCustomers();
    e.target.reset();
});

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let phone = document.getElementById('paymentPhone').value;
    let paymentAmount = parseFloat(document.getElementById('paymentAmount').value);

    let customer = customers.find(c => c.phone === phone);
    if (customer) {
        customer.outstandingAmount -= paymentAmount;
        alert(Payment of ${paymentAmount} received from ${customer.name}. Remaining balance: ${customer.outstandingAmount});
        displayCustomers();
    } else {
        alert('Customer not found!');
    }
    e.target.reset();
});

function displayCustomers() {
    let customerList = document.getElementById('customerList').getElementsByTagName('tbody')[0];
    customerList.innerHTML = '';
    customers.forEach(function(customer, index) {
        let row = customerList.insertRow();
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.outstandingAmount.toFixed(2)}</td>
            <td><button onclick="sendSMS('${customer.phone}', ${customer.outstandingAmount})">Send SMS</button></td>
        `;
    });
}

function sendSMS(phone, amount) {
    alert('SMS sent to ' + phone + ' for the remaining amount of ' + amount.toFixed(2));
}