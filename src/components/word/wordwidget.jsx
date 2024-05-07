import { TagWidgets } from "components/tag/tagwidget";
import { useMemo } from "react"
import { Link } from "react-router-dom";

export default function WordWidget({word,handleDictionary}) {
	const tags = useMemo(()=>{
		return handleDictionary.getLinkedTags(word.wordId);
	},[word])
	return <div className="wordWidget">
		<Link to={`/detail/${word.wordId}`}>{word.name}</Link>, {word.description}, {
			<TagWidgets tags={tags.slice(0,5)}/>
		}
	</div>
}