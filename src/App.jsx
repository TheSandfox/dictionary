import Dictionary from 'components/dictionary'
import { BrowserRouter, HashRouter } from 'react-router-dom'

function App() {
	return (
		<HashRouter>
		{/* <BrowserRouter basename={'/dictionary'}> */}
			<Dictionary/>
		{/* </BrowserRouter> */}
		</HashRouter>
	)
}

export default App
