import './wordlist.css'
import WordWidget from "components/word/wordwidget"
import { Fragment } from "react";
import { useParams } from "react-router-dom";

export default function WordList({handleDictionary}) {
	let words = [];
	const params = useParams();
	if (params.tagName) {
		words = handleDictionary.searchWordsByTagName(decodeURI(params.tagName));
	} else if (params.keyword) {
		words = handleDictionary.searchWordsByKeyword(decodeURI(params.keyword));
	} else {
		words = handleDictionary.getWords();
	}
	return <div className={'innerbox wordList'}>
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