import { Link } from "react-router-dom";

export default function Header({}) {
	return <header>
		<ul>
			<li><Link to='/add'>단어만들기</Link></li>
			<li><Link to='/list'>리스트응</Link></li>
		</ul>
	</header>
}