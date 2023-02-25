// Table data
let tableData = [];

// Add new row to the table
function addRow() {
  const tbody = document.querySelector("#myTable tbody");
  const newRow = document.createElement("tr");
  let id = tableData.length + 1;
  newRow.innerHTML = `
    <td>${id}</td>
    <td><input type="text" name="student_name"></td>
    <td><input type="text" name="student_roll"></td>
    <td><input type="text" name="subject"></td>
    <td><input type="text" name="marks"></td>
    <td><input type="text" name="markedBy"></td>
    <td><button class="saveButton">Save</button></td>
  `;
  tbody.appendChild(newRow);
  
  const saveButton = newRow.querySelector(".saveButton");
  saveButton.addEventListener("click", saveTableRow);
}

// Validate input fields
// Validate input fields
function validateInputs(inputs) {
  let isValid = true;
  inputs.forEach(input => {
    if (input.name === "marks" && isNaN(Number(input.value))) {
      alert("Marks field only accepts numbers!");
      isValid = false;
    } else if (input.name === "markedBy" && !isValidEmail(input.value)) {
      alert("Please enter a valid email address in the Marked By field!");
      isValid = false;
    } else if (input.value === "") {
      alert("All fields are required!");
      isValid = false;
    }
  });
  return isValid;
}


// Save table row
function saveTableRow(event) {
  const row = event.target.closest("tr");
  const inputs = row.querySelectorAll("input");
  if (!validateInputs(inputs)) {
    return;
  }
  const rowData = {
    id: row.querySelector("td:first-of-type").textContent,
    student_name: inputs[0].value,
    student_roll: inputs[1].value,
    subject: inputs[2].value,
    marks: Number(inputs[3].value),
    markedBy: inputs[4].value
  };
  const rowIndex = row.rowIndex - 1; // adjust for header row
  tableData[rowIndex] = rowData;
  console.log("Updated row data:", rowData);
  console.log("Table data:", tableData);
}

// Check if email is valid
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Event listeners
document.querySelector("#addRow").addEventListener("click", addRow);
