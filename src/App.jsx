import Dictionary from 'components/dictionary'
import { BrowserRouter } from 'react-router-dom'

function App() {
	return (
		<BrowserRouter basename={'/dictionary'}>
			<Dictionary/>
		</BrowserRouter>
	)
}

export default App
