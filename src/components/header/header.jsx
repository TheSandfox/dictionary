import { Link } from "react-router-dom";

export default function Header({handleDictionary}) {
	return <header>
		<ul>
			<li><Link to='/add'>단어만들기</Link></li>
			<li><Link to='/list'>리스트으</Link></li>
			<button onClick={handleDictionary.truncate}>다지우기</button>
		</ul>
	</header>
}