import "./CardRear.css"
import * as React from "react";

interface CardRearProps {
    cardTitle: string;
    setDeckSelected: (deck: string) => void;
}


function CardRear ({cardTitle, setDeckSelected} : CardRearProps){
    
    return (
        <>
        <div className="Card-Rear-Cont">
            <h2 className="Card-Rear-H2">{cardTitle}</h2>
            <button onClick={()=> setDeckSelected(cardTitle)} className="Card-Rear-Button">SELECT</button>
        </div>
        
    </>
            )
}

export default CardRear