import { useState, useRef } from 'react'
import sonnetsData from './data/sonnetsData'
import Header from './components/Header'
import './styles.css'
export default function App() {
  const inputRef = useRef()
  const [searchInput, setSearchInput] = useState('')

  function handleClick() {
    setSearchInput(inputRef.current.value.trim())
  }


function highlightWord (line) {
  return line.split(" ").map(word => {
    const lowerCaseWord = word.toLowerCase();
    const lowerCaseSearchInput = searchInput.toLowerCase();
    if (lowerCaseWord.includes(lowerCaseSearchInput)&&searchInput.length>0) {
      return <span>{word}</span>;
    }
    return `${word} `;
  })
}


const filterSonnets = sonnetsData.filter(sonnets=>{
return sonnets.lines.some(line=>line.includes(searchInput))
})

const sonnet=filterSonnets.map(filterSonnet=>{
  return (<div key={crypto.randomUUID()}>
  <h3>{filterSonnet.number}</h3>
  <div className='sonnet'> {filterSonnet.lines.map(filterSonetLine=>{
    return <p key={crypto.randomUUID()}>{highlightWord(filterSonetLine)}</p>
  })} </div>
  </div>)
})


console.log(searchInput)
console.log(filterSonnets)

  return (
    <div className='wrapper'>
      <Header searchProps={{ inputRef, handleClick }} />

      <div className='sonnets-container'> {filterSonnets.length<1 ? <p className='no-result-message'>"Ne yazık ki, araman sonucunda hiçbir şey bulamadın."</p> : sonnet} </div>
    </div>
  )
}

