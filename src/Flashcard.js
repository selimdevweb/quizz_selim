import React, {useEffect, useState, useRef} from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import './Flashcard.css'

export default function Flashcard({flashcard}) {
    /* faire une rotation avec la question et la réponse */
    /* mettre à faux pour ensuite faire le contraire à l'écoute de l'évenement */
    const [flip, setflip] = useState(false)

   const [height, setheight] = useState('initial')

    const frontEl = useRef()
    const backEl = useRef()
    
    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setheight(Math.max(frontHeight, backHeight, 100)) 
    }
    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
    useEffect(() => {
      window.addEventListener('resize', setMaxHeight)
      return () => window.removeEventListener('resize', setMaxHeight)
    }, [])

    return (
        <div className={`card ${flip ? /* si flip est vrai alors la classe flip */'flip': ''}`}
        style={{height:height}}>

            <div className="front" ref={frontEl}>
                {/* récupérer le for .map flasjhcard de app.js */}
                <p><strong>{flashcard.question}</strong></p>
                <div className="flashcard__options">
                    {/* récupérer les options de flashcard de .map dans app.js et ensuite faire un .map des options */}
                    <div>{flashcard.options.map(option =>{
                        return <div className="flashcard__option"
                         /* toujours denner une clé quand on utilise .map */
                         key={option}>
                            {option}
                        </div>
                    })}...</div>
                </div>
            </div>
            <div className="back" ref={backEl}>
                {flashcard.answer}
            </div>
            <button 
            className="btn-box" 
            /* au click mettre à jout flip en le mettant à true */
            onClick={()=>setflip(!flip)}>Voir réponse <VisibilityIcon/></button>
        </div>
    )
}
