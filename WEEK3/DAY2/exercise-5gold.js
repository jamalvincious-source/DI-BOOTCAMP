// Get the table element
let table = document.body.firstElementChild;

// Get all rows in the table
let rows = table.querySelectorAll("tr");

// Iterate through each row
rows.forEach((row, rowIndex) => {
  // Get all cells in the current row
  let cells = row.querySelectorAll("td");
  
  // Iterate through each cell
  cells.forEach((cell, cellIndex) => {
    // Color diagonal cells (where row index equals cell index) red
    if (rowIndex === cellIndex) {
      cell.style.backgroundColor = "red";
    }
  });
});
