import { TagWidgets } from "components/tag/tagwidget";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function WordDetail({handleDictionary}){
	const navigate = useNavigate();
	const params = useParams();
	const word = params.wordId?handleDictionary.getWord(params.wordId):undefined;
	const tags = useMemo(()=>{
		if(word) {
			return handleDictionary.getLinkedTags(word.wordId);
		} else {
			return []
		}
	},[word])
	const removeRequest = (wordId)=>{
		if (!confirm('진짜로?')) {return;}
		handleDictionary.removeWord(wordId);
		navigate(`/list`);
	}
	return <div className="wordDetail innerbox">
		{word?`${word.name} ${word.description}`:'not-found'}
		<button onClick={()=>{removeRequest(word.wordId)}}>삭제하기</button>
		<button onClick={()=>{navigate(`/edit/${word.wordId}`)}}>수정하기</button>
		<TagWidgets tags={tags} size={5}/>
	</div>
}