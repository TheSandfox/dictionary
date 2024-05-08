import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import './footer.css'
import { useState } from "react";
import AddForm from "components/word/addform";

export default function Footer({handleDictionary}) {
	const [displayAdd,setDisplayAdd] = useState(false);
	const handleDisplayAdd = {
		toggle:()=>{
			setDisplayAdd(
				!displayAdd
			);
		}
	}
	const handleModal = {
		close:()=>{
			setDisplayAdd(false);
		}
	}
	return <footer>
		<div className="innerbox">
			<div className="footerWidget add genericShadow2px" onClick={handleDisplayAdd.toggle}>
				<IoMdAdd
					title={'단어 추가하기'} 
				/>
				단어 추가하기
			</div>
			<div className="footerWidget truncate genericShadow2px" onClick={handleDictionary.truncate}>
				<MdDelete
					title={'데이터 초기화'} 
				/>
				데이터 초기화
			</div>
		</div>
		{
			displayAdd
			?<AddForm handleDictionary={handleDictionary} handleModal={handleModal}/>
			:<></>
		}
	</footer>
}