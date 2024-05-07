import { TagWidgets } from "components/tag/tagwidget";
import { useMemo } from "react";
import { useParams } from "react-router-dom"

export default function WordDetail({handleDictionary}){
	const params = useParams();
	const word = params.wordId?handleDictionary.getWord(params.wordId):undefined;
	const tags = useMemo(()=>{
		return handleDictionary.getLinkedTags(word.wordId);
	},[word])
	return <>
		{word?`${word.name} ${word.description}`:'not-found'}
		<TagWidgets tags={tags.slice(0,5)}/>
	</>
}