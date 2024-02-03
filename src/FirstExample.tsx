import { useState } from 'react'
import MealList from './MealList'
import BoasVindas from './BoasVindas'
import useFetchMeal from './useFetchMeal'
import { useParams, useSearchParams } from 'react-router-dom'

function App() {
  const [nome, setNome] = useState('')
  const foods = useFetchMeal(nome)
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  console.log({params, searchParams: searchParams.toString()})
  
  return (
    <div>
      <input type="text" onChange={(evt)=>{
        setNome(evt.target.value) 
      }} value={nome}/>
      <BoasVindas nome={nome} />
      <MealList meals={foods}/>  

      <button onClick={() => {
        setSearchParams({teste: '123'})
      }}>
        add query param
      </button>

      <button onClick={() => setNome('')}>
        Limpar
      </button>
    </div>
  )
}

export default App
