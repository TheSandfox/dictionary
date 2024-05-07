import { Link } from "react-router-dom";

export default function TagWidget({tag}){
	return <div className="tagWidget fontRadialMo">
		<Link 
			to={`/list/query/tag/${encodeURI(tag.name)}`}>
			#{tag.name}
		</Link>
	</div>
}

function TagWidgets({tags,className}){
	return <div className={`tagWidgets${className?` ${className}`:''}`}>{
		tags.map((tag)=>{
			return <TagWidget tag={tag} key={tag.tagId}/>
		})
	}</div>
}

export {TagWidget,TagWidgets}