// 1. Book interface
interface Book {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre?: string;
}


// 2. Library class
class Library {
    // Private array of books
    private books: Book[] = [];

    // Add a book
    public addBook(book: Book): void {
        this.books.push(book);
    }

    // Find a book using ISBN
    public getBookDetails(isbn: string): Book | undefined {
        const book = this.books.find(book => book.isbn === isbn);

        return book;
    }

    // Allow subclasses to access the books safely
    protected getBooks(): Book[] {
        return this.books;
    }
}


// 3. DigitalLibrary class
class DigitalLibrary extends Library {
    // Readonly website
    readonly website: string;

    // Constructor
    constructor(website: string) {
        super();
        this.website = website;
    }

    // Return all book titles
    public listBooks(): string[] {
        return this.getBooks().map(book => book.title);
    }
}


// 4. Create a DigitalLibrary object
const digitalLibrary = new DigitalLibrary(
    "https://www.mydigitallibrary.com"
);


// 5. Create some books
const book1: Book = {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    publishedYear: 1937,
    genre: "Fantasy"
};

const book2: Book = {
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    publishedYear: 1949,
    genre: "Dystopian"
};

const book3: Book = {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    publishedYear: 2008,
    genre: "Programming"
};


// 6. Add books to the library
digitalLibrary.addBook(book1);
digitalLibrary.addBook(book2);
digitalLibrary.addBook(book3);


// 7. Print website
console.log("Website:", digitalLibrary.website);


// 8. Get details of books
console.log("Book 1:", digitalLibrary.getBookDetails("9780547928227"));
console.log("Book 2:", digitalLibrary.getBookDetails("9780451524935"));


// 9. Search for a book that does not exist
console.log(
    "Unknown book:",
    digitalLibrary.getBookDetails("0000000000")
);


// 10. Display all book titles
console.log("All book titles:");
console.log(digitalLibrary.listBooks());