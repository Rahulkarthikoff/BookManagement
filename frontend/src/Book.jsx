import React, { useState, useEffect } from 'react';
import { getBooks, addBook, updateBook, deleteBook } from './services/api';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSubmit = async () => {
    if (!bookName || !authorName) {
      alert("Please fill in both fields.");
      return;
    }

    if (editingBook) {
      // Update existing book
      const updatedBook = { name: bookName, author: authorName };
      await updateBook(editingBook._id, updatedBook);
      setEditingBook(null);
    } else {
      // Add new book
      const bookData = { name: bookName, author: authorName };
      await addBook(bookData);
    }

    fetchBooks();
    setBookName("");
    setAuthorName("");
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setBookName(book.name);
    setAuthorName(book.author);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">📚 Books List</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input 
          type="text"
          placeholder="🔍 Search books..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Input Form */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-3">
          <label className="block text-lg font-semibold">Book Name</label>
          <input 
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-lg font-semibold">Author Name</label>
          <input 
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>

        <button 
          className={`w-full py-2 rounded-md font-semibold transition ${
            editingBook ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          onClick={handleSubmit}
        >
          {editingBook ? "✅ Update Book" : "➕ Add Book"}
        </button>
      </div>

      {/* Books List */}
      <ul className="mt-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li 
              key={book._id}
              className="bg-white p-4 mb-2 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <strong className="text-lg">{book.name}</strong>
                <p className="text-gray-600">by {book.author}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  onClick={() => handleEdit(book)}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(book._id)}
                >
                  ❌ Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No books available</p>
        )}
      </ul>
    </div>
  );
};

export default Book;
