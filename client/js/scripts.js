// Authour: Tully McDonald
// Purpose: Script for DropBearTables website
// Client: Karen

// Global variables
var viewingRestaurant = "";
var selectedTime = 0;

// Validates the form inputs
function validate() {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          event.preventDefault()
          event.stopPropagation()
          console.log(document.getElementById('first-name').value);
          console.log(document.getElementById('phone-number').value);
          console.log(document.getElementById('number-of-people').value);
          console.log(viewingRestaurant);
          console.log(selectedTime);
          addReservation();
        }

        form.classList.add('was-validated')
      }, false)
    })
};

// Keeps track of which restaurant is being viewed
function viewRestaurant(name) {
  viewingRestaurant = name;

};

// Keeps track of which time is being entered
function printTime(time) {
  selectedTime = time;
}

// Adds reservation to the reservations modal
function addReservation() {
  // Build table row
  var body = document.getElementById('reserve-tbody');
  var cell1 = document.createElement('td');
  var cell2 = document.createElement('th');
  var cell3 = document.createElement('td');
  var cell4 = document.createElement('td');
  var cell5 = document.createElement('td');

  var row = document.createElement('tr');

  var remove = document.createElement('button');
  var icon = document.createElement('i');

  // Define attributes of delete button
  icon.setAttribute('class', 'bi bi-x-circle');
  remove.setAttribute('class', 'btn btn-outline-danger removebtn');
  remove.setAttribute('type', 'button');
  remove.setAttribute('aria-expanded', 'false');
  remove.setAttribute('aria-controls', 'removed');

  // Add event listener for delete button in reservations
  remove.addEventListener('click', function (event) {
    event.target.parentElement.parentElement.parentElement.remove();
    console.log("removed");
  })

  // Append all and insert text
  remove.appendChild(icon);

  cell1.appendChild(remove);
  cell2.innerHTML = viewingRestaurant;
  cell3.innerHTML = document.getElementById('first-name').value;
  cell4.innerHTML = selectedTime;
  cell5.innerHTML = document.getElementById('number-of-people').value;

  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  row.appendChild(cell4);
  row.appendChild(cell5);
  body.appendChild(row);

}

validate();