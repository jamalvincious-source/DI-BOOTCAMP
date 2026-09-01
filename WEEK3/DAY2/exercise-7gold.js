const allBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://picsum.photos/id/10/100/150",
        alreadyRead: true
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        image: "https://picsum.photos/id/24/100/150",
        alreadyRead: false
    }
];

const section = document.querySelector(".listBooks");

allBooks.forEach(book => {
    const bookDiv = document.createElement("div");
    
    // Create details paragraph
    const details = document.createElement("p");
    details.textContent = `${book.title} written by ${book.author}`;
    
    if (book.alreadyRead) {
        details.style.color = "red";
    }
    
    // Create image element
    const img = document.createElement("img");
    img.src = book.image;
    img.style.width = "100px";
    
    // Append details and image to the book div
    bookDiv.appendChild(details);
    bookDiv.appendChild(img);
    
    // Append book div to the section
    section.appendChild(bookDiv);
});
