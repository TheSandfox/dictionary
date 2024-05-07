import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function AddForm({handleDictionary,editMode}) {
	const wordId = useParams().wordId;
	const nameInputRef = useRef(null);
	const descriptionInputRef = useRef(null);
	const word = useMemo(()=>{
		if (wordId) {
			return handleDictionary.getWord(wordId);
		} else {
			return undefined;
		}
	},[editMode])
	//인풋창&핸들러
	const newFormDefault = word
	?{
		nameInput:word.name,
		descriptionInput:word.description,
		tagsInput:handleDictionary.getLinkedTags(word.wordId).map((tag)=>{
			return tag.name;
		}).toString(),
		idInput:word.wordId
	}
	:{
		nameInput:'',
		descriptionInput:'',
		tagsInput:'',
		idInput:-1,//음수로 넘겨야 새로생성
	}
	const [newForm,setNewForm] = useState({
		...newFormDefault
	});
	const handleNewForm = {
		modify:(e)=>{
			setNewForm({
				...newForm,
				[e.target.name]:e.target.value
			})
		},
		clear:()=>{
			setNewForm({
				...newFormDefault
			})
		},
		submit:()=>{
			//유효성 검사
			if(newForm.nameInput.trim().replaceAll(' ','')==='')
				{alert('이름을 빼먹었다구');return;}
			if(newForm.descriptionInput.trim()==='')
				{alert('설명을 빼먹었다구');return;}
			//제출!
			handleDictionary.addWord({
				name:newForm.nameInput,
				description:newForm.descriptionInput,
				tags:newForm.tagsInput,
				wordId:newForm.idInput
			})
		}
	}
	//RETURN JSX
	return <><div>
		<label>이름</label>
		<input 
			type='text' 
			name='nameInput' 
			value={newForm.nameInput} 
			onChange={handleNewForm.modify}
			placeholder={'공백 무시됩니다.'}
			ref={nameInputRef}
		/>
		<label>설명</label>
		<input 
			type='text' 
			name='descriptionInput' 
			value={newForm.descriptionInput} 
			onChange={handleNewForm.modify}
			ref={descriptionInputRef}
		/>
		<label>태그</label>
		<input type='text' name='tagsInput' value={newForm.tagsInput} onChange={handleNewForm.modify}/>
		<button onClick={handleNewForm.submit}>추가하기</button>
	</div></>	
}