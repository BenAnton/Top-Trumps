import "./DeckSelection.css"
import CardRear from "../CardRear/CardRear";

interface DeckSelectionProps {
    availableDecks: string[];
    setDeckSelected: (deck: string) => void;
}

const DeckSelection = ({availableDecks, setDeckSelected}: DeckSelectionProps) => {
    return (
        <>
            <h2 className="DeckSelection-Heading">Please select a deck to play with</h2>
            <div className="DeckSelection-Grid">
                {availableDecks.map((deck: string) => <CardRear key={deck} cardTitle={deck} setDeckSelected={setDeckSelected}/>)}
            </div>
        
        </>
    
      
        
    )
}

export default DeckSelection