import Dictionary from 'component/dictionary'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename={'/dictionary'}>
		<Dictionary/>
    </BrowserRouter>
  )
}

export default App
