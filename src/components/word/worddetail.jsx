import './worddetail.css'
import { TagWidgets } from "components/tag/tagwidget";
import { useMemo } from "react";
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
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
		if (!confirm(`'${word.name}' 단어를 삭제할까요?`)) {return;}
		handleDictionary.removeWord(wordId);
		navigate(`/list`);
	}
	return <div className="wordDetail innerbox">
		{word
			//단어&설명 
			?<>
				<div className='title genericShadow2px'>{word.name}:</div>
				<div>{word.description}</div>
			</>
			:'not-found'
		}
		<TagWidgets tags={tags} size={10} expandInitial={true}/>
		<div className='buttonContainer'>
			<div className={'genericButton edit'} onClick={()=>{navigate(`/edit/${word.wordId}`)}}>
				<MdEdit/>
				수정하기
			</div>
			<div className={'genericButton delete'} onClick={()=>{removeRequest(word.wordId)}}>
				<MdDelete/>
				삭제하기
			</div>
			<div className={'genericButton back'} onClick={()=>{navigate(-1)}}>
				<IoArrowBackOutline/>
				돌아가기
			</div>
		</div>
	</div>
}