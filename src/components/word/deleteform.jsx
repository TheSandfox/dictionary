import { useState } from 'react';
import './deleteform.css'
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";


export default function DeleteForm({handleDictionary,handleDisplayDelete}) {
	const [method,setMethod] = useState('0');
	return <div className='deleteForm'>
		<div className='top'>
			<select value={method} onChange={(e)=>{setMethod(e.target.value)}}>
				<option value='0'>기본값으로 초기화</option>
				<option value='1'>완전히 비우기</option>
			</select>
		</div>
		<div className='bottom'>
			<div className={'genericButton add'} onClick={()=>{
				switch(method) {
				case '0':
					handleDictionary.reset()
				case '1':
					handleDictionary.truncate()
				default:
				}
			}}>
				<IoMdAdd/>
				{'실행하기'}
			</div>
			<div className={'genericButton close'} onClick={handleDisplayDelete.close}>
				<IoCloseSharp/>
				{'취소/닫기'}
			</div>
		</div>
	</div>
}