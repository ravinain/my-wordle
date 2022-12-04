import './App.scss';
import { GameBoard } from './ui/game-board/GameBoard';
import { GameKeyBoard } from './ui/game-keyboard/GameKeyboard';
import { Header } from './ui/header/Header';
import { useEffect, useReducer } from 'react';
import { BACKSPACE } from './Constant';
import Context from './state/context';
import { reducer } from './state/reducer';
import { getAppState } from './state/state';
import { ActionType } from './state/action';


function App() {
  const [ state, dispatch ] = useReducer(reducer, getAppState());

  const handleKeyDownEvent = (): void => {
    dispatch({type: ActionType.RESET_KEY_DATA});
  };

  const handleKeyUpEvent = (event: any): void => {
    const keyCode = event.keyCode;
    switch(keyCode) {
      case 13:
      case 8:
        dispatch({type: ActionType.UPDATE_KEY_DATA, payload: {value: event.key.toUpperCase(), shake: keyCode === 13}});
        break;
      default:
        if (keyCode > 64 && keyCode < 91) {
          dispatch({type: ActionType.UPDATE_KEY_DATA, payload: {value: event.key.toUpperCase(), shake: false}});
        }
    }
  };

  const handleVirtualKeyEvent = (value: string): void => {
    switch(value) {
      case "DEL":
        dispatch({type: ActionType.UPDATE_KEY_DATA, payload: {value: BACKSPACE, shake: false}});
        break;
      case "ENTER":
        dispatch({type: ActionType.UPDATE_KEY_DATA, payload: {value, shake: true}});
        break;
      default:
        dispatch({type: ActionType.UPDATE_KEY_DATA, payload: {value, shake: false}});
    }
    
  };

  useEffect(() => {
    
    document.body.addEventListener('keydown', handleKeyDownEvent);
    document.body.addEventListener('keyup', handleKeyUpEvent);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDownEvent);
      document.body.removeEventListener('keyup', handleKeyUpEvent);
    }
  }, []);

  return (
    <Context.Provider value={{state, dispatch}}>
      <div className="app">
        <div className="container">
          <Header />
          <GameBoard />
          <GameKeyBoard handleOnClick={handleVirtualKeyEvent}/>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
