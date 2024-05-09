import './wordlist.css'
import WordWidget from "components/word/wordwidget"
import { Fragment } from "react";
import { IoRefresh } from 'react-icons/io5';
import { useNavigate, useParams } from "react-router-dom";

export default function WordList({handleDictionary}) {
	const navigate = useNavigate();
	let words = [];
	let reset = false;
	const params = useParams();
	if (params.tagName) {
		words = handleDictionary.searchWordsByTagName(decodeURI(params.tagName));
		reset = true;
	} else if (params.keyword) {
		words = handleDictionary.searchWordsByKeyword(decodeURI(params.keyword));
		reset = true;
	} else {
		words = handleDictionary.getWords();
	}
	return <div className={'innerbox wordList'}>
		{reset
			?<div 
				className={'genericButton clear'}
				onClick={()=>{navigate('/')}}>
				<IoRefresh/>
				필터 초기화
			</div>
			:<></>
		}
		{(words&&words.length>0)
			?words
			.filter((word)=>{
				return word.visible;
			})
			.map((word)=>{
				return <Fragment key={word.wordId}>
					<WordWidget word={word} handleDictionary={handleDictionary}/>
				</Fragment>
			})
			:<></>
		}
	</div>
}