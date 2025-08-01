import './App.css'
import Header from "./Components/Header/Header.jsx"
import GameArea from "./Components/GameArea/GameArea";
import {useEffect, useState} from "react";
import {decks} from "./Data/2025";
import DeckSelection from "./Components/DeckSelection/DeckSelection";



function App() {
    const [deckSelected, setDeckSelected] = useState<string> ("");
const [isDeckSelected, setIsDeckSelected] = useState(false);    

const availableDecks = Object.keys(decks) as string[];

useEffect(() => {
    console.log(deckSelected);
}, [deckSelected]);

const handleDeckSelect = (deck:string) => {
    setDeckSelected(deck);
    setIsDeckSelected(true);
    console.log(deckSelected);
}

  return (
    <>
        
      <Header/>

        
        {isDeckSelected ? ( <GameArea deckSelected={deckSelected}/> ): (<DeckSelection availableDecks={availableDecks} setDeckSelected={handleDeckSelect}/>)}
      
        
        
     
    </>
  );
}

export default App
