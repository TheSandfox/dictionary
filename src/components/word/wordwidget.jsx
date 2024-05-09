import './wordwidget.css'
import { TagWidgets } from "components/tag/tagwidget";
import { useMemo } from "react"
import { Link } from "react-router-dom";

export default function WordWidget({word,handleDictionary}) {
	const tags = useMemo(()=>{
		if (word) {
			return handleDictionary.getLinkedTags(word.wordId);
		} else {
			return []
		}
	},[word])
	return <div className="wordWidget">
		<div className='dateName'>
			<Link 
				to={`/detail/${word?word.wordId:''}`}
				className={'genericShadow2px'}
			>
				{word?new Date(word.date).toLocaleDateString():''}
				<span>{word?word.name:''}</span>
			</Link>
		</div>
		{(tags.length>0)?<TagWidgets tags={tags}/>:null}
	</div>
}