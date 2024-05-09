import { useCallback, useEffect, useReducer, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { dictionaryDefault, dictionaryReducer } from "./r_dictionary";
import AddForm from "components/word/addform";
import Header from "components/header/header";
import WordList from "components/word/wordlist";
import WordDetail from "components/word/worddetail";
import appContext from "/src/appcontext";
import Footer from "components/footer/footer";

export default function Dictionary(){
	const navigate = useNavigate();
	const [dictionary,dispatchDictionary] = useReducer(dictionaryReducer,dictionaryDefault);
	const [app,setApp] = useState({

	})
	const handleApp = {

	}
	const handleDictionary = {
		//단어 getter
		getWord:(wordId)=>{
			if (dictionary.words[wordId]&&dictionary.words[wordId].visible) {
				return dictionary.words[wordId];
			} else {
				return undefined;
			}
		},
		//단어들 getter
		getWords:()=>{
			return dictionary.words.filter((word)=>{
				return word.visible
			}).sort((prev,next)=>{
				return (prev.date>next.date)?1:-1;
			});
		},
		//태그 getter
		getTag:(tagId)=>{
			return dictionary.tags[tagId];
		},
		//태그들 getter
		getTags:()=>{
			return dictionary.tags;
		},
		//단어와의 연결이 하나라도 있는 태그들 가져오기
		getAvailableTags:()=>{
			let tagIdArr = dictionary.wordTagLinks.map((wordTagLink)=>{
				return wordTagLink.tagId;
			})
			return tagIdArr.filter((tagId,index)=>{
				return tagIdArr.indexOf(tagId)===index;
			}).map((tagId)=>{
				return dictionary.tags[tagId];
			});
		},
		//연결된 태그들 getter(문자열array)
		getLinkedTags:(wordId)=>{
			return dictionary.wordTagLinks.filter((wordTagLink)=>{
				return parseInt(wordTagLink.wordId) === parseInt(wordId)
			})
			.map((wordTagLink)=>{
				return dictionary.tags[wordTagLink.tagId]
			})/* .sort((prev,next)=>{
				return (prev.name>next.name)?1:-1;
			}) */
		},
		//단어 검색
		searchWordsByKeyword:(keyword)=>{
			return dictionary.words.filter((word)=>{
				return word.visible && ( word.name.toLowerCase().includes(keyword.toLowerCase()) 
				|| word.description.toLowerCase().includes(keyword.toLowerCase()) )
			}).sort((prev,next)=>{
				return (prev.date>next.date)?1:-1;
			})
		},
		//태그로 찾기
		searchWordsByTagName:(tagName)=>{
			//태그네임에서 태그id추출
			let tagId = dictionary.tags.map((tag)=>{
				return tag.name
			}).indexOf(tagName);
			console.log(tagId);
			return dictionary.wordTagLinks.filter((wordTagLink)=>{
				return parseInt(wordTagLink.tagId)===parseInt(tagId)
			})
			.map((wordTagLink)=>{
				return dictionary.words[wordTagLink.wordId];
			})
			.filter((word)=>{
				return word.visible;
			}).sort((prev,next)=>{
				return (prev.date>next.date)?1:-1;
			})
		},
		//단어추가하기(수정,태그추가,태그연결 전부 수행)
		addWord:useCallback((newWord)=>{
			dispatchDictionary({
				type:'addWord',
				newWord:newWord
			})
		},[]),
		//태그추가
		addTag:useCallback((newTag)=>{
			dispatchDictionary({
				type:'addTag',
				newTag:newTag
			})
		},[]),
		//
		removeWord:useCallback((wordId)=>{
			dispatchDictionary({
				type:'removeWord',
				wordId
			})
		},[]),
		//단어태그연결
		wordTagLink:useCallback((wordId,tagId)=>{
			dispatchDictionary({
				type:'wordTagLink',
				wordId:wordId,
				tagId:tagId
			})
		},[]),
		//단어태그연결끊기
		wordTagUnlink:useCallback((wordId,tagId)=>{
			dispatchDictionary({
				type:'wordTagLink',
				wordId:wordId,
				tagId:tagId
			})
		},[]),
		//저장소 클리어
		truncate:useCallback(()=>{
			if(!confirm('로컬저장소를 초기화하고 기본 단어목록으로 변경합니다.\n계속 진행하시겠습니까?')){return;}
			dispatchDictionary({
				type:'truncate'
			})
		},[])
	}
	useEffect(()=>{
		if (dictionary.resultPrefix.length>0) {
			switch (dictionary.resultPrefix) {
			case 'edit':
				navigate(-1);
				break;	
			}
		}
	},[dictionary])
	return <appContext.Provider value={app}>
		<Header handleDictionary={handleDictionary} handleApp={handleApp}/>
		<main id='dictionary'>
			<Routes>
				<Route exact path={'/'} element={<WordList handleDictionary={handleDictionary}/>}/>
				<Route path={'/edit/:wordId'} element={<AddForm handleDictionary={handleDictionary} editMode={true} modal={false}/>}/>
				<Route path={'/list'} element={<WordList handleDictionary={handleDictionary}/>}/>
				<Route path={'/list/query/tag/:tagName'} element={<WordList handleDictionary={handleDictionary}/>}/>
				<Route path={'/list/query/keyword/:keyword'} element={<WordList handleDictionary={handleDictionary}/>}/>
				<Route path={'/detail/:wordId'} element={<WordDetail handleDictionary={handleDictionary}/>}/> 
				<Route path={'/*'} element={<>NOT FOUND</>}/>
			</Routes>
		</main>
		<Footer handleDictionary={handleDictionary}/>
	</appContext.Provider>

}