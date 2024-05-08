import SearchForm from "components/word/searchform";
import { Link } from "react-router-dom";
import './header.css'

export default function Header({}) {
	return <header>
		<div className="innerbox">
			<h1 className="genericShadow">
				<Link to='/'>
				단어장.jsx
				</Link>
			</h1>
			<SearchForm/>
		</div>
	</header>
}