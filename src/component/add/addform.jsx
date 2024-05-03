import { useEffect, useState } from "react";

export default function AddForm({handleDictionary}) {
	//인풋창&핸들러
	const newFormDefault = {
		nameInput:'',
		descriptionInput:'',
		tagsInput:''
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
			handleDictionary.addWord({
				name:newForm.nameInput,
				description:newForm.descriptionInput,
				tags:newForm.tagsInput
			})
		}
	}
	//RETURN JSX
	return <><div>
		<label>이름</label>
		<input type='text' name='nameInput' value={newForm.nameInput} onChange={handleNewForm.modify}/>
		<label>설명</label>
		<input type='text' name='descriptionInput' value={newForm.descriptionInput} onChange={handleNewForm.modify}/>
		<label>태그</label>
		<input type='text' name='tagsInput' value={newForm.tagsInput} onChange={handleNewForm.modify}/>
		<button onClick={handleNewForm.submit}>추가하기</button>
	</div></>	
}