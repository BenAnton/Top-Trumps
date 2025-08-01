
import {Player} from "../../Types/player";  

export function shuffleDeck (deck: Player[]): Player[] {
    return [...deck].sort(() => Math.random() - 0.5);
}

export function dealDeck (deck: Player[]): { player: Player[], cpu: Player[] }  {
        const shuffled = shuffleDeck(deck);
        const player = shuffled.filter((_, i) => i % 2 !== 0);
        const cpu = shuffled.filter((_, i) => i % 2 === 0);
    return {player, cpu}
    }
    
    export function changeTurn (turn: boolean): boolean {
        return !turn;
    }
    
    const Max_Random_Number = 5;
    export function randomPick (): number {
        const randomNumber =  Math.floor(Math.random() * Max_Random_Number) + 1;
        
        // [4] = ppg, [5] = apg, [6] = rpg, [7] = spg, [8] = bpg
        switch (randomNumber) {
            case 1:
                return 4
            case 2: 
                return 5;
            case 3: 
                return 6;
            case 4: 
                return 7;
            case 5: 
                return 8;
            default: 
                return 0;
        }
}


export function determineWinnerOfRound (playerStats: number, cpuStats: number, ): "cpu" | "player" | "draw" {
        if (playerStats > cpuStats) return "player"
        if (cpuStats > playerStats) return "cpu"
        return "draw";
}

