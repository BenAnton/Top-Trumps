import "./Card.css"
import {Player} from "../../Types/player";
 

type StatKey = "ppg" | "apg" | "rpg" | "spg" | "bpg";

interface CardProps {
    player: Player,
    onStatClick?: (stat: StatKey) => void;
    statsHidden?: boolean;
    deckSelected: string;
}

function Card ({
                   player,
                   onStatClick,
    deckSelected,
                   statsHidden= false} : CardProps ){
    return (
        <div className="Card-Cont">
            <h3 className="Deck-Title">{deckSelected}</h3>
                <h2 className="Player-Name">{player.name}</h2>
          
            <img className="Card-Player-Img Width-Adjustment" src={player.img} alt="player"/>
            
            <div className="Card-Lower-Flex">
                <div className="Card-Stats-Flex-Left">
                    <p className="Player-Text Hidden">{player.name} played at {player.team} he averaged {player.mpg} minutes per game with {player.gp} games played</p>
                    <img className="Card-Team-Img Hidden" src={`/Images/Team-Logos/${player.team}.svg`} alt="player"/>
                </div>
                <div className={`Card-Stats-Flex-Right ${statsHidden ? "Black-Box" : ""}`}>
                    <button className="Card-Stats-Button" onClick={() => onStatClick?.("ppg")}>Points Per Game: {player.ppg}</button>
                    <button className="Card-Stats-Button" onClick={() => onStatClick?.("apg")}>Assists Per Game: {player.apg}</button>
                    <button className="Card-Stats-Button" onClick={() => onStatClick?.("rpg")}>Rebounds Per Game: {player.rpg}</button>
                    <button className="Card-Stats-Button" onClick={() => onStatClick?.("spg")}>Steals Per Game: {player.spg}</button>
                    <button className="Card-Stats-Button" onClick={() => onStatClick?.("bpg")}>Blocks Per Game: {player.bpg}</button> 
                    
                </div>
                
            </div>
            
        </div>
    )
}

export default Card