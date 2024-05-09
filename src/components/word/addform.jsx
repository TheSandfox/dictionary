import './addform.css'
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoCloseSharp, IoRefresh } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";

export default function AddForm({handleDictionary,editMode,handleModal}) {
	const navigate = useNavigate();
	const preventLinkBreak = useRef(false);
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
			if(preventLinkBreak.current) {return;}
			if(e.target.name==='nameInput'){
				setNewForm({
					...newForm,
					[e.target.name]:e.target.value.trim().replaceAll(' ','')
				})
				return;
			}
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
			if(newForm.nameInput.trim().replaceAll(' ','')==='') {
				alert('이름을 빼먹었다구');
				nameInputRef.current.focus();
				return;
			}
			if(newForm.descriptionInput.trim()==='') {
				alert('설명을 빼먹었다구');
				descriptionInputRef.current.focus();
				preventLinkBreak.current = true;
				return;
			}
			//제출!
			handleDictionary.addWord({
				name:newForm.nameInput,
				description:newForm.descriptionInput,
				tags:newForm.tagsInput,
				wordId:newForm.idInput,
				redirect:Boolean(!handleModal)
			})
		}
	}
	const enterCallback = (e)=>{
		preventLinkBreak.current = false;
		if(e.keyCode!==13){return;}
		handleNewForm.submit();
	}
	useEffect(()=>{
		const escapeCallback = (e)=>{
			if(e.keyCode!==27) {return;}
			if(handleModal) {
				handleModal.close();
			}
		}

		window.addEventListener('keydown',escapeCallback);

		return ()=>{
			window.removeEventListener('keydown',escapeCallback);
		}
	},[handleModal])
	//RETURN JSX
	return <><div className={`addForm${handleModal?' modal':' innerbox'}`}>
		<div className='top'>
			<div className='infoTitle'>
				{editMode?'수정하기':'새로 만들기'}
			</div>
			<div className='name'>
				<label>이름:</label>
				<input 
					type='text' 
					name='nameInput' 
					value={newForm.nameInput} 
					onChange={handleNewForm.modify}
					onKeyDown={enterCallback}
					placeholder={'공백 사용불가'}
					ref={nameInputRef}
				/>
			</div>
			<div className='description'>
				<label>설명:</label>
				<textarea 
					type='text' 
					name='descriptionInput' 
					value={newForm.descriptionInput} 
					onChange={handleNewForm.modify}
					onKeyDown={enterCallback}
					ref={descriptionInputRef}
				/>
			</div>
			<div className='tags'>
				<label>태그:</label>
				<textarea 
					type='text' 
					name='tagsInput' 
					value={newForm.tagsInput} 
					onChange={handleNewForm.modify}
					onKeyDown={enterCallback}
					placeholder={'쉼표(,) 사용으로 여러 개 등록 가능(최대 10개)'}
				/>
			</div>
		</div>
		<div className='bottom'>
			<div className={'genericButton add'} onClick={handleNewForm.submit}>
				<IoMdAdd/>
				{editMode?'저장':'추가'}
			</div>
			<div className={'genericButton clear'} onClick={handleNewForm.clear}>
				<IoRefresh/>
				{'비우기'}
			</div>
			{handleModal
			?<div className={'genericButton close'} onClick={handleModal.close}>
				<IoCloseSharp/>
				{'취소/닫기'}
			</div>
			:<div className={'genericButton close'} onClick={()=>{navigate(-1)}}>
			<IoArrowBackOutline/>
			{'뒤로가기'}
		</div>
			}
		</div>
	</div></>	
}