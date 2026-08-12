import logo from './logo.svg';
import "./css/pico.violet.min.css";
import Header from './Components/Header'
import Footer from './Components/Footer';
import AddBook from './Components/AddBook';
import BooksMain from './Components/BooksMain';
import AuthorsMain from './Components/AuthorsMain';
import AddAuthor from './Components/AddAuthor';
import './css/main.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
       <Routes>
        <Route path="/addbook" element={<AddBook />} />
        <Route path ="/" element={<Homepage />} />
        <Route path="/authors" element={<AuthorsMain />} />
        <Route path="/books" element={<BooksMain />} />
        <Route path="/addauthor" element={<AddAuthor />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
