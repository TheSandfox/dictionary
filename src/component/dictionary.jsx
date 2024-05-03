import { useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import { dictionaryDefault, dictionaryReducer } from "./r_dictionary";
import AddForm from "./add/addform";
import Header from "./header/header";
import WordList from "./list/wordlist";

export default function Dictionary(){
	const [dictionary,dispatchDictionary] = useReducer(dictionaryReducer,dictionaryDefault);
	const handleDictionary = {
		getLinkedTags:(wordId)=>{
			return [dictionary.wordTagLinks].filter((wordTagLink)=>{
				return parseInt(wordTagLink.wordId) === parseInt(wordId)
			}).map((wordTagLink)=>{
				return dictionary.tags.filter((tag)=>{
					tag.id===wordTagLink.tagId
				})[0]
			})
		},
		addWord:(newWord)=>{
			dispatchDictionary({
				type:'addWord',
				newWord:newWord
			})
		},
		addTag:(newTag)=>{
			dispatchDictionary({
				type:'addTag',
				newTag:newTag
			})
		},
		wordTagLink:(wordId,tagId)=>{
			dispatchDictionary({
				type:'wordTagLink',
				wordId:wordId,
				tagId:tagId
			})
		},
		wordTagUnlink:(wordId,tagId)=>{
			dispatchDictionary({
				type:'wordTagLink',
				wordId:wordId,
				tagId:tagId
			})
		},
	}
	return <>
		<Header/>
		<main id='dictionary'>
			<Routes>
				<Route exact path={'/'} element={<>메인</>}/>
				<Route path={'/add'} element={<AddForm handleDictionary={handleDictionary}/>}/>
				<Route path={'/list'} element={<WordList words={dictionary.words} handleDictionary={handleDictionary}/>}/>
				<Route path={'/*'} element={<>NOT FOUND</>}/>
			</Routes>
		</main>
	</>
}