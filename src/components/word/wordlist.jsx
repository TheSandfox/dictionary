import WordWidget from "components/word/wordwidget"
import { Fragment } from "react";
import { useParams } from "react-router-dom";

export default function WordList({handleDictionary}) {
	let words = [];
	const params = useParams();
	if (params.tagName) {
		words = handleDictionary.searchWordsByTagName(decodeURI(params.tagName));
	} else if (params.query) {

	} else {
		words = handleDictionary.getWords();
	}
	return <>
		{(words&&words.length>0)?words.map((word)=>{
			return <Fragment key={word.wordId}>
				<WordWidget word={word} handleDictionary={handleDictionary}/>
			</Fragment>
		}):<></>}
	</>
}