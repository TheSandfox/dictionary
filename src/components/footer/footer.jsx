import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import './footer.css'
import { useState } from "react";
import AddForm from "/src/components/word/addform";
import DeleteForm from "/src/components/word/deleteform";

export default function Footer({handleDictionary}) {
	const [displayAdd,setDisplayAdd] = useState(false);
	const [displayDelete,setDisplayDelete] = useState(false);
	const handleDisplayAdd = {
		toggle:()=>{
			if(!displayAdd) {setDisplayDelete(false);}
			setDisplayAdd(
				!displayAdd
			);
		},
		close:()=>{
			setDisplayAdd(false);
		}
	}
	const handleDisplayDelete = {
		toggle:()=>{
			if(!displayDelete) {setDisplayAdd(false)}
			setDisplayDelete(
				!displayDelete
			);
		},
		close:()=>{
			setDisplayDelete(false);
		}
	}
	return <footer>
		<div className="innerbox">
			<div className="footerWidget add genericShadow2px" onClick={handleDisplayAdd.toggle}>
				<FaPlus
					title={'단어 추가하기'} 
				/>
				<span>단어 추가하기</span>
			</div>
			{/* <DeleteForm handleTruncate={handleDictionary.truncate}/> */}
			<div className="footerWidget truncate genericShadow2px" onClick={handleDisplayDelete.toggle} >
				<FaTrash
					title={'데이터 초기화'} 
				/>
				<span>데이터 초기화</span>
			</div>
		</div>
		{
			displayAdd
			?<AddForm handleDictionary={handleDictionary} handleDisplayAdd={handleDisplayAdd}/>
			:<></>
		}
		{
			displayDelete
			?<DeleteForm handleDictionary={handleDictionary} handleDisplayDelete={handleDisplayDelete}/>
			:<></>
		}
	</footer>
}