import React, { useState, useEffect } from 'react';
import './style.css';

const BASE_URL = 'https://openlibrary.org/subjects/world.json';

export default function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [highlightedBook, setHighlightedBook] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // useEffect: fetch data
    // runs when the component mounts (first renders)

    fetch(BASE_URL)
      .then((response) => response.json())
      // converts the response to JSON format

      .then((data) => {
        setBooks(data.works);
        setFilteredBooks(data.works);
      })
      // updates the books state with the fetched data

      .catch((error) => console.error('Error fetching data:', error));
    //if there’s an issue with the request.
  }, []);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setFilter(filterValue);

    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(filterValue) ||
        // upper or lower all to lower
        (book.authors &&
          book.authors.some((author) =>
            author.name.toLowerCase().includes(filterValue)
          ))
    );

    setFilteredBooks(filtered);
  };

  const handleBookClick = (book) => {
    setHighlightedBook(book);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="filter by title or author here"
        // Create an input field at the top that filters both title OR author

        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />

      <div className="book-list">
        {highlightedBook && (
          <div className="book-card highlighted">
            <h2>{highlightedBook.title}</h2>
            <p>
              {highlightedBook.authors
                ? highlightedBook.authors
                    // condition check

                    .map((author) => author.name)
                    .join(', ')
                : 'Unknown Author'}
            </p>
          </div>
        )}

        {filteredBooks.map((book) => (
          //use map to display

          <div
            key={book.key}
            className={`book-card ${
              highlightedBook === book ? 'highlighted' : ''
            }`}
            onClick={() => handleBookClick(book)}
          >
            <h2>{book.title}</h2>
            <p>
              {book.authors
                ? book.authors.map((author) => author.name).join(', ')
                : // condition check

                  'Unknown Author'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
