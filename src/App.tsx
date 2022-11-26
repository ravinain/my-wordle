import './App.css';
import { GameBoard } from './ui/game-board/GameBoard';
import { GameKeyBoard } from './ui/game-keyboard/GameKeyboard';
import { Header } from './ui/header/Header';
import { useEffect, useState } from 'react';

function App() {
  const [currentValue, setCurrentValue] = useState("");

  const handleKeyDownEvent = (event: any): void => {
    const keyCode = event.keyCode;
    switch(keyCode) {
      case 13:
      case 8:
        setCurrentValue(event.key);
        break;
      default:
        if (keyCode > 64 && keyCode < 91) {
          setCurrentValue(event.key);
        }
    }
  };

  useEffect(() => {
    
    document.body.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDownEvent);
    }
  }, []);

  return (
    <div className="app">
      <div className="container">
        <Header />
        <GameBoard value={currentValue} />
        <GameKeyBoard />
      </div>
    </div>
  );
}

export default App;
