import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {UserModel} from "../../typescript-backend/user.model";

function App() {
  const [count, setCount] = useState(0)
  const [inputName, setInputName] = useState('')
  const [inputAge, setInputAge] = useState('')

  const [users, setUsers] = useState<UserModel[]>([])

  useEffect(()=>{
    getUsersFromBE()
  },[])

  const createUser = () => {
    const newUser:UserModel = { name: inputName, age: Number.parseInt(inputAge) ,favoriteColor:''}
    // a = [1,2,3]
    // b = 4
    // c = [...a, b, 5] -> [1,2,3,4,5]
    setUsers((users) => {
      const newUsers = [...users, newUser];
      console.log(newUsers);
      return newUsers
    })

    // console.log(users) <- incorrect
  }

  const getUsersFromBE = async () => {
    try{
      const res = await fetch('http://localhost:3000/users')
      const json = await res.json()
      const fetchedUsers = JSON.parse(json)
      setUsers(fetchedUsers)

    } catch{
      alert("Cannot read users");
      
    }


  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">

        <form>
          {/* <input placeholder='test here' onChange={e => setInputValue(e.target.value)}></input>
          <button onClick={()=>console.log(inputValue)}>Test</button> */}
          <input {...{
            placeholder: "name",
            onChange: (e) => setInputName(e.target.value)
          }}></input>
          <input {...{
            placeholder: "age",
            onChange: (e) => setInputAge(e.target.value)
          }}></input>
          <button {...{
            type: 'button',
            onClick: createUser
          }}>Test</button>
        </form>


        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <button {...{ onClick: getUsersFromBE }}>GET</button>
      <div>
        {
          users.map((user,i) => <div key={i}>
            <p>{user.name} <span>{user.age}</span></p>
          </div>)
        }
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
