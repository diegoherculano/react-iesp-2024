import './App.css'
import { useState } from 'react'
import MealList from './MealList'
import BoasVindas from './BoasVindas'
import useFetchMeal from './useFetchMeal'

function App() {
  const [nome, setNome] = useState('')
  const foods = useFetchMeal(nome)
  return (
    <div>
      <input type="text" onChange={(evt)=>{
        setNome(evt.target.value) 
      }} value={nome}/>
      <BoasVindas nome={nome} />
      <MealList meals={foods}/>  

      <button onClick={() => setNome('')}>
        Limpar
      </button>
    </div>
  )
}

export default App
