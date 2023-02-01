import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Create from './components/games/Create';
import Catalog from './components/games/Catalog';
import Details from './components/games/Details';
import { getAll } from './services/gameService';
import { useEffect, useState } from "react";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAll()
      .then(result => {
        setGames(result);
      });
  }, []);

  const addComment = (gameId, comment) => {
    setGames(state => {
      const game = state.find(x => x._id == gameId);
      
      const comments = game.comments || [];
      comments.push(comment);

      const newArr = [
        ...state.filter(x => x._id !== gameId),
        { ...game, comments: comments }
      ];

      return newArr;
    });
  }

  return (
    <div id="box">
      <Header />
      {/* Main Content */}
      <main id="main-content">
        <Routes>
          <Route path='/' element={<Home games={games} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<Create />} />
          <Route path='/catalog' element={<Catalog games={games} />} />
          <Route path='/details/:gameId' element={<Details games={games} addComment={addComment} />} />
        </Routes>
      </main>
    </div>

  );
}

export default App;
