import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [allowNumbers, setAllowNumbers] = useState(false);
  const [allowCharacters, setAllowCharacters] = useState(false);
  const [removeCapitals, setRemoveCapitals] = useState(false);
  const [password, setPassword] = useState('');

  // useref hook
  const passwordRef = useRef(null)
  
  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyz"
    if(!removeCapitals) str+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(allowNumbers) str+="0123456789"
    if(allowCharacters) str+="~!@#$%^&*()_+`"

    for (let i = 1; i <= length; i++) {
      let char= Math.floor(Math.random() * str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)

  }, [length, allowNumbers, allowCharacters, removeCapitals, setPassword])
  
  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()},
    [length, allowNumbers, allowCharacters, removeCapitals, passwordGenerator])
  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg 
     px-4 py-3 my-8 bg-gray-600 text-orange-500" >
        <h1 className='text-white text-center my-3'>password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value={password}
        className='outline-none bg-white w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPassword}
        className='outline-none px-3 py-0.5 bg-red-700 text-white'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>


        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
           />
           <label>Length:{length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
           id="capRemove"
           checked={removeCapitals} 
           onChange={() => setRemoveCapitals((prev) => !prev)}
           />
           <label htmlFor="capRemove">No Capitals</label>
        </div>


        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={allowNumbers}
           id="numberInput" 
          onChange={() => setAllowNumbers((prev) => !prev)}
           />
           <label htmlFor="numberInput">Numbers</label>
        </div>


        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={allowCharacters} 
           id="characterInput" 
           onChange={() => setAllowCharacters((prev) => !prev)} 
           />
           <label htmlFor="numberInput">Characters</label>
        </div>

      </div>
     </div>
    </>
  )
}

export default App
