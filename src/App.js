
import './App.css';
import React, {useEffect, useState, useRef} from 'react'
import FlashcardList from './FlashcardList';
/*import CachedIcon from '@material-ui/icons/Cached';
 import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; */
import axios from 'axios'
/* axios sert à faire de l'asynchrone  */



function App() {
  const [flashcards, setflashcards] = useState([])
  const [categ, setCateg] = useState([])
  const CategoryEl = useRef()
  const amountEl = useRef()

  /* pour utiliser l'asychrone et mettre à jour setCateg */
  useEffect(() => {
    axios
    .get(`https://opentdb.com/api_category.php`)
    .then(res => {
      setCateg(res.data.trivia_categories)
    })
  }, [])

  /* pour envlever les quotes et affciher les valeurs en tant que élement html */
  function decodeString(str) {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = str
    return textarea.value
  }

  
  function handleSubmit(e) {
    e.preventDefault()
    axios.get(`https://opentdb.com/api.php`,{
      params: {
        amount: amountEl.current.value,
        categ:CategoryEl.current.value
      }
    })
    .then(res => {
         setflashcards(res.data.results.map((questionItem, index)=>{
      const answer = decodeString(questionItem.correct_answer)
      const options = [
        ...questionItem.incorrect_answers.map(a =>decodeString(a)), 
        answer
      ]
      return{
        id:`${index}-${Date.now()}`,
        question: decodeString(questionItem.question) ,
        answer: answer,
        options: options.sort(()=> Math.random()-.5),

      }
    }))
    })
  }
  return (     
        <>
        <form className="header" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">
              Category
            </label>
            <select id="category" ref={CategoryEl}>
              {categ.map(categ => {
                return <option value={categ.id} key={categ.id}>{categ.name}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">
              Number of questions
            </label>
            <input type="number" id="amount" min="1" step="1"
            defaultValue="10" ref={amountEl}/>
          </div>
          <div className="form-group">
            <button className="btn"
            /* onSubmit={submit} */>
              Generate
            </button>
          </div>
        </form>
          <div className="App"> 
            <FlashcardList flashcards={flashcards} />
           {/*  <button>
            <a href="./"><CachedIcon/></a>
            </button> */}
          </div>
        </>
  );
}



export default App;
