import './addform.css'
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoCloseSharp, IoRefresh } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";

export default function AddForm({handleDictionary,editMode,handleDisplayAdd}) {
	const navigate = useNavigate();
	const preventLinkBreak = useRef(false);
	const wordId = useParams().wordId;
	const containerRef = useRef(null);
	const nameInputRef = useRef(null);
	const descriptionInputRef = useRef(null);
	const word = useMemo(()=>{
		if (wordId) {
			return handleDictionary.getWord(wordId);
		} else {
			return undefined;
		}
	},[editMode]);
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
				alert('단어 이름을 입력해주세요');
				nameInputRef.current.focus();
				return;
			}
			if(newForm.descriptionInput.trim()==='') {
				alert('단어 설명을 입력해주세요');
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
				redirect:Boolean(!handleDisplayAdd)
			})
		}
	}
	const enterCallback = (e)=>{
		preventLinkBreak.current = false;
		if(e.keyCode!==13){return;}
		if(e.shiftKey){return;}
		handleNewForm.submit();
	}
	//창닫기 버튼 입력 시
	useEffect(()=>{
		const escapeCallback = (e)=>{
			if(e.keyCode!==27) {return;}
			if(handleDisplayAdd) {
				handleDisplayAdd.close();
			}
		}

		window.addEventListener('keydown',escapeCallback);

		return ()=>{
			window.removeEventListener('keydown',escapeCallback);
		}
	},[handleDisplayAdd])
	//마운트시 포커싱&바깥클릭 리스너 추가
	useEffect(()=>{
		nameInputRef.current.select();

		const clickCallback = (e)=>{
			console.log('옹');
			if (e.button!==0) {return;}
			if (!handleDisplayAdd) {return;}
			if (e.target===containerRef.current||containerRef.current.contains(e.target)) {return;}
			handleDisplayAdd.close();
		}

		window.addEventListener('mousedown',clickCallback);
		
		return ()=>{
			window.removeEventListener('mousedown',clickCallback);
		}

	},[handleDisplayAdd])
	//RETURN JSX
	return <><div ref={containerRef} className={`addForm${handleDisplayAdd?' modal':' innerbox'}`}>
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
					placeholder='줄띄움 시 shift+Enter 입력'
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
				{editMode?'되돌리기':'비우기'}
			</div>
			{handleDisplayAdd
			?<div className={'genericButton close'} onClick={handleDisplayAdd.close}>
				<IoCloseSharp/>
				{'취소/닫기'}
			</div>
			:<div className={'genericButton back'} onClick={()=>{navigate(-1)}}>
			<IoArrowBackOutline/>
			{'돌아가기'}
		</div>
			}
		</div>
	</div></>	
}