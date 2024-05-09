import TagWidget, { TagWidgets } from 'components/tag/tagwidget';
import './wordlist.css'
import WordWidget from "components/word/wordwidget"
import { Fragment, useMemo } from "react";
import { IoRefresh } from 'react-icons/io5';
import { useNavigate, useParams } from "react-router-dom";

function shuffle(arr) {
	return arr.sort(()=>{
		return Math.random() - 0.5;
	})
}

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
	const tags = useMemo(()=>{
		return shuffle(handleDictionary.getAvailableTags()).slice(0,64);
	},[])
	return <div className={'innerbox wordList'}>
		<div className={'left'}>
			<div className='words'>
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
		</div>
		<div className={'right'}>
			<TagWidgets tags={tags} className={'freestyle'} expandInitial={true}/>
		</div>
	</div>
}