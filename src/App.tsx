import './App.scss';
import { GameBoard } from './ui/game-board/GameBoard';
import { GameKeyBoard } from './ui/game-keyboard/GameKeyboard';
import { Header } from './ui/header/Header';
import { useEffect, useState } from 'react';
import { BACKSPACE } from './Constant';
import { KeyState } from './types/KeyboardType';

const DEFAULT_DATA = {
  value: "",
  shake: false
};

function App() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [keyStates, setKeyStates] = useState<KeyState[]>();

  const handleKeyDownEvent = (event: any): void => {
    setData(DEFAULT_DATA);
  };

  const handleKeyUpEvent = (event: any): void => {
    const keyCode = event.keyCode;
    switch(keyCode) {
      case 13:
      case 8:
        setData({value: event.key.toUpperCase(), shake: keyCode === 13});
        break;
      default:
        if (keyCode > 64 && keyCode < 91) {
          setData({value: event.key.toUpperCase(), shake: false});
        }
    }
  };

  const handleVirtualKeyEvent = (value: string): void => {
    switch(value) {
      case "DEL":
        setData({value: BACKSPACE, shake: false});
        break;
      case "ENTER":
        setData({value, shake: true});
        break;
      default:
        setData({value, shake: false});
    }
    
  };

  const handleRowChange = (keyStates: KeyState[]): void => {
    setKeyStates(keyStates);
  }


  useEffect(() => {
    
    document.body.addEventListener('keydown', handleKeyDownEvent);
    document.body.addEventListener('keyup', handleKeyUpEvent);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDownEvent);
      document.body.removeEventListener('keyup', handleKeyUpEvent);
    }
  }, []);

  return (
    <div className="app">
      <div className="container">
        <Header />
        <GameBoard data={data} onRowChange={handleRowChange} />
        <GameKeyBoard handleOnClick={handleVirtualKeyEvent} keyStates={keyStates} />
      </div>
    </div>
  );
}

export default App;
