import './App.css';
import { GameBoard } from './ui/game-board/GameBoard';
import { GameKeyBoard } from './ui/game-keyboard/GameKeyboard';
import { Header } from './ui/header/Header';

function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <GameBoard />
        <GameKeyBoard />
      </div>
    </div>
  );
}

export default App;
