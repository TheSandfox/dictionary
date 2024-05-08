import './searchform.css'
import { IoSearchSharp } from "react-icons/io5";
import { IoRefresh } from "react-icons/io5";

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchForm({}) {
	const [searchMode,setSearchMode] = useState(
		sessionStorage.getItem('searchMode')||'keyword'
	)
	const navigate = useNavigate();
	const [inputValue,setInputValue] = useState('')
	const handleInputValue = {
		modify:(e)=>{
			if (searchMode==='tag') {
				setInputValue(e.target.value.trim().replaceAll(' ',''));
				return;
			}
			setInputValue(e.target.value);
		},
		clear:()=>{
			setInputValue('');
		}
	}
	const handleSearchMode = {
		set:(e)=>{
			sessionStorage.setItem('searchMode',e.target.value)
			setSearchMode(e.target.value)
		}
	}
	const submit = ()=>{
		if (inputValue.length<=0) {
			navigate('/')
			return;
		}
		switch (searchMode) {
		case 'keyword' :
			navigate(`/list/query/keyword/${encodeURI(inputValue)}`);
			return;
		case 'tag':
			navigate(`/list/query/tag/${encodeURI(inputValue)}`);
			return;
		default:
			return;
		}
	}
	const clear = ()=>{
		handleInputValue.clear();
		navigate(`/`)

	}
	const enterCallback = (e)=>{
		if (e.keyCode!==13) {return;}
		if (e.target.value.length>0) {
			submit();
		} else {
			clear();
		}
	}
	return <div className="searchForm">
		<label>검색하기:</label>
		<input 
			type="text" 
			name="keyword" 
			value={inputValue} 
			onChange={handleInputValue.modify}
			onKeyDown={enterCallback}
		/>
		<select className='selectMode' value={searchMode} onChange={handleSearchMode.set}>
			<option value={'keyword'}>단어/설명</option>
			<option value={'tag'}>태그</option>
		</select>
		<IoSearchSharp onClick={submit} className={'iconButton search'} title={'검색하기'}/>
		<IoRefresh onClick={clear} className={'iconButton clear'} title={'필터초기화'}/>
	</div>
}