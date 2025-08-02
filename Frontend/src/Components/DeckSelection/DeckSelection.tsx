import "./DeckSelection.css"
import "../Card/Card.css"
import CardRear from "../CardRear/CardRear";
import React, {useState} from "react";
import {decks} from "../../Data/2025";
import {Player} from "../../Types/player";

interface DeckSelectionProps {
    availableDecks: string[];
    setDeckSelected: (deck: string) => void;
}

const DeckSelection = ({availableDecks, setDeckSelected}: DeckSelectionProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    
    function handleCollapsed () {
        setIsCollapsed(!isCollapsed);
    }
    
    return (
        <>
            <h2 className="DeckSelection-Heading">Please select a deck to play with</h2>
            <div className="DeckSelection-Grid">
                {availableDecks.map((deck: string) => <CardRear key={deck} cardTitle={deck} setDeckSelected={setDeckSelected}/>)}
            </div>

            {isCollapsed ?
                <button className="Show-Database-Button" onClick={handleCollapsed}>Show Player Database ↑</button> :
                <button className="Show-Database-Button" onClick={handleCollapsed}>Hide Player Database ↓</button>
            }
            
            {isCollapsed ? <div></div> : 
                
            <div className="Player-Grid-Cont">
                {Object.entries(decks).flatMap(([deckname, players]) =>
                    players.map((player, index) => (
                            <div key={`${deckname}-${index}`} className="Card-Cont">
                                <h3 className="Deck-Title">{deckname}</h3>
                                <h2 className="Player-Name">{player.name}</h2>
                                <img className="Card-Player-Img" src={player.img} alt="player"/>
                                <div className="Card-Lower-Flex">
                                    <div className="Card-Stats-Flex-Left">
                                        <p className="Player-Text">{player.name} played at {player.team} he averaged {player.mpg} minutes per game with {player.gp} games played</p>
                                        <img className="Card-Team-Img" src={`/Images/Team-Logos/${player.team}.svg`} alt="player"/>
                                    </div>
                                    <div className={`Card-Stats-Flex-Right`}>
                                        <button className="Card-Stats-Button">Points Per Game: {player.ppg}</button>
                                        <button className="Card-Stats-Button">Assists Per Game: {player.apg}</button>
                                        <button className="Card-Stats-Button">Rebounds Per Game: {player.rpg}</button>
                                        <button className="Card-Stats-Button">Steals Per Game: {player.spg}</button>
                                        <button className="Card-Stats-Button">Blocks Per Game: {player.bpg}</button>
                                    </div>
                                </div>
                            </div>
                        ))
                )}
                    
            </div>}
        </>
    )}


export default DeckSelection