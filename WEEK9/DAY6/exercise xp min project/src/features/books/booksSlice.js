import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      title: "The Haunting of Hill House",
      author: "Shirley Jackson",
      genre: "Horror",
      color: "plum",
      mark: "HH",
    },
    {
      id: 2,
      title: "Mexican Gothic",
      author: "Silvia Moreno-Garcia",
      genre: "Horror",
      color: "rose",
      mark: "MG",
    },
    {
      id: 3,
      title: "The Shining",
      author: "Stephen King",
      genre: "Horror",
      color: "ember",
      mark: "TS",
    },
    {
      id: 4,
      title: "A Wizard of Earthsea",
      author: "Ursula K. Le Guin",
      genre: "Fantasy",
      color: "moss",
      mark: "WE",
    },
    {
      id: 5,
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      genre: "Fantasy",
      color: "ochre",
      mark: "NW",
    },
    {
      id: 6,
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
      genre: "Fantasy",
      color: "fern",
      mark: "TH",
    },
    {
      id: 7,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
      color: "sand",
      mark: "DU",
    },
    {
      id: 8,
      title: "Kindred",
      author: "Octavia E. Butler",
      genre: "Science Fiction",
      color: "indigo",
      mark: "KI",
    },
    {
      id: 9,
      title: "The Left Hand of Darkness",
      author: "Ursula K. Le Guin",
      genre: "Science Fiction",
      color: "slate",
      mark: "LH",
    },
    {
      id: 10,
      title: "The Fifth Season",
      author: "N. K. Jemisin",
      genre: "Fantasy",
      color: "copper",
      mark: "FS",
    },
    {
      id: 11,
      title: "The Only Good Indians",
      author: "Stephen Graham Jones",
      genre: "Horror",
      color: "night",
      mark: "OI",
    },
    {
      id: 12,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Science Fiction",
      color: "ocean",
      mark: "HM",
    },
  ],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
});

export default booksSlice.reducer;
