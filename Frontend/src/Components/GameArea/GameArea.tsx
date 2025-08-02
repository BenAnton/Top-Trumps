import "./GameArea.css"
import Card from "../Card/Card";
import {decks} from "../../Data/2025";
import React, {useState, useEffect} from "react";
import {dealDeck, determineWinnerOfRound, randomPick} from "../GameLogic/GameLogic";
const arrowleft = "/Images/arrowleft.jpg"
const arrowright = "/Images/arrowright.png"
import {Player} from "../../Types/player";


type StatKey = "ppg" | "apg" | "rpg" | "spg" | "bpg";

interface GameAreaProps {
    deckSelected: string;
    setIsDeckSelected: {
        setIsDeckSelected: React.Dispatch<React.SetStateAction<boolean>>
    }
}

function GameArea({deckSelected, setIsDeckSelected}: GameAreaProps) {
    const [playerDeck, setPlayerDeck] = useState<Player[]>([]);
    const [cpuDeck, setCpuDeck] = useState<Player[]>([]);
    const [turn, setTurn] = useState<"cpu" | "player">("player");
    const [roundResult, setRoundResult] = useState<"cpu" | "player" | "draw" | null>(null);
    const [commentary, setCommentary] = useState<string>("Please select a stat to play with.");
    const [lastResult, setLastResult] = useState<string | null>(null);
    const [statsHidden, setStatsHidden] = useState<boolean>(true);
    const [gameOver, setGameOver] = useState<boolean>(false);
    
    useEffect(() => {
        const selectedDeck = decks[deckSelected];
        const {player, cpu} = dealDeck(selectedDeck);
        setPlayerDeck(player);
        setCpuDeck(cpu);
        setTurn("player");
        setRoundResult(null);
    }, [deckSelected]);
    
    
    useEffect(() => {
        setStatsHidden(true)
        if (turn === "cpu" && playerDeck.length && cpuDeck.length) {
            setCommentary("The CPU is choosing a stat.");
            const timeout = setTimeout(() => {
                const cpuStatIndex = randomPick();
                const stat = statFromIndex(cpuStatIndex);
                const result = determineWinnerOfRound(cpuDeck[0][stat], playerDeck[0][stat]);
                setRoundResult(result);
                updateDecks(result);
                setTurn("player");
                setCommentary("Please select a stat.");
                const difference = Math.abs(playerDeck[0][stat] - cpuDeck[0][stat]).toFixed(1);
                setLastResult(`${result} won the last round by ${difference}${stat}.`);
                setStatsHidden(false);
            }, 5000);
            
            return () => clearTimeout(timeout);
        }
    }, [turn, playerDeck, cpuDeck]);


    useEffect(() => {
        if (playerDeck.length === 0 && cpuDeck.length > 0) {
            setCommentary(`CPU wins the game!`)
            setGameOver(true);
        } else if (cpuDeck.length === 0 && playerDeck.length > 0) {
            setCommentary(`Player wins the game!`)
            setGameOver(true);
        }
    }, [playerDeck.length, cpuDeck.length]);
    
    function statFromIndex(index: number): StatKey {
        const stats: StatKey[] = ["ppg", "apg", "rpg", "spg", "bpg"];
        return stats[index] ?? "ppg";
    }
    
    function handlePlayerChoice(stat: StatKey) {
        setStatsHidden(true);
        if(turn !== "player") return;
        const result = determineWinnerOfRound(playerDeck[0][stat], cpuDeck[0][stat]);
        
        setRoundResult(result);
        updateDecks(result);
        setCommentary(`${result} wins this round`);
        setTurn("cpu");
        
        setCommentary("The CPU is choosing a stat to play with.");
        const difference = Math.abs(playerDeck[0][stat] - cpuDeck[0][stat]).toFixed(1);
        if(result !== "draw")
        {
            setLastResult(`${result} won the last round!  by ${difference}${stat}.`); 
        }
        else {
            setLastResult(`The last round was a draw.`);
        }
    }
    
    function updateDecks(result: "cpu" | "player" | "draw") {
        const newPlayerDeck = [...playerDeck];
        const newCpuDeck = [...cpuDeck];
        
        const playerCard = newPlayerDeck.shift()!;
        const cpuCard = newCpuDeck.shift()!;
        
        if(result === "player") {
            newPlayerDeck.push(playerCard, cpuCard);
        } else if (result === "cpu") {
                newCpuDeck.push(cpuCard, playerCard);
            } else {
                newPlayerDeck.push(playerCard);
                newCpuDeck.push(cpuCard);
            }
        setPlayerDeck(newPlayerDeck);
        setCpuDeck(newCpuDeck);
        
        }
    
    
    return (
        <div className="GameArea-Cont">
            <div className="GameArea-Cards">
                {gameOver && <div className="Game-Finished-Card">GAME FINISHED</div>}
                {playerDeck[0] && <Card 
                    player={playerDeck[0]}
                    onStatClick={turn === "player" ? handlePlayerChoice : undefined}
                    deckSelected={deckSelected}
                    />}
                
                <div className="GameArea-Middle-Flex">
                    <div className="GameArea-Commentary">
                        {commentary}
                        {lastResult && <p className="Last-Result">{lastResult}</p>}
                    </div>
                {turn === "player" 
                    ? <img className="Arrow Rotate-Arrow" src={arrowleft} alt="arrow-left"/> 
                    : <img className="Arrow Rotate-Arrow" src={arrowright} alt="arrow-right"/>}

                    
                </div>
                {cpuDeck[0] && <Card player={cpuDeck[0]} deckSelected={deckSelected}
                statsHidden={statsHidden}/>}
            </div>


            <div className="GameArea-Scores">
                <div className="Score-Sq">Player Deck: {playerDeck.length}</div>
                <div className="Score-Sq">Cpu Deck: {cpuDeck.length}</div>
            </div>
            {gameOver && <button className="Reset-Button" onClick={() => setIsDeckSelected.setIsDeckSelected(false)}>Reset</button>}
      
            
        </div>
    )
}

export default GameArea