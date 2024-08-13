import SearchForm from "/src/components/word/searchform";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import './header.css'

export default function Header({}) {
	return <header>
		<div className="innerbox">
			<h1 className="genericShadow2px">
				<Link to='/'>
					<FaBook/>
					단어짱.jsx
				</Link>
			</h1>
			<SearchForm/>
		</div>
	</header>
}