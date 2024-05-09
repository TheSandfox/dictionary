const wordsPrefix = 'words'
const tagsPrefix = 'tags'
const wordTagLinksPrefix = 'wordTagLinks'

//WORDS
const dictionaryDefault = {

	//워드 템플릿
	// wordTemplate:{
	// 	wordId:0,
	// 	name:'wordName',
	// 	description:'wordDescription',
	//	date:100000000,
	//	visible:true
	// },
	//워드 목록(로컬에서 가져오기)
	words:JSON.parse(localStorage.getItem(`${wordsPrefix}`))
		||[{"wordId":0,"name":"리액트","description":"컴포넌트 기반의 자바스크립트 프레임워크","date":1715152940750,"visible":true},{"wordId":1,"name":"자바스크립트","description":"브라우저 최적화 언어","date":1715157706288,"visible":true},{"wordId":2,"name":"jquery","description":"체이닝 특화 js라이브러리","date":1715158102929,"visible":true},{"wordId":3,"name":"node.js","description":"자바스크립트 런타임 패키지","date":1715215381683,"visible":true},{"wordId":4,"name":"딸기","description":"(딸기설명)","date":1715215452835,"visible":true},{"wordId":5,"name":"바나나","description":"키우면 탑승이 가능한 과일","date":1715215472083,"visible":true},{"wordId":6,"name":"키위","description":"키우면 새가 되는 과일","date":1715215725803,"visible":true},{"wordId":7,"name":"파인애플","description":"흉기로 사용할 수 있는 과일","date":1715217543406,"visible":true},{"wordId":8,"name":"두리안","description":"흉기로 사용할 수 있는 과일,\n냄새가 굉장히 고약하다.","date":1715217574095,"visible":true},{"wordId":9,"name":"당근","description":"달짝지근한 맛이 나는 야채","date":1715217839925,"visible":true},{"wordId":10,"name":"베가아이언","description":"흉기로 사용할 수 있는 스마트폰","date":1715217891789,"visible":true},{"wordId":11,"name":"베가아이언2","description":"삭제된 항목","date":1715218090360,"visible":false},{"wordId":12,"name":"도도새","description":"귀여운 새","date":1715218356851,"visible":true},{"wordId":13,"name":"dd","description":"삭제된 항목","date":1715218701559,"visible":false},{"wordId":14,"name":"dda","description":"삭제된 항목","date":1715218702935,"visible":false},{"wordId":15,"name":"express","description":"rest API구축에 사용되는 자바스크립트 기반 백엔드\n 프레임워크","date":1715219842178,"visible":true}],
	//태그 템플릿
	// tagTemplate:{
	// 	tagId:0,
	// 	name:'tagName'
	// },
	//태그 목록(로컬에서 가져오기)
	tags:JSON.parse(localStorage.getItem(`${tagsPrefix}`))
		||[{"tagId":0,"name":"react"},{"tagId":1,"name":"프레임워크"},{"tagId":2,"name":"js"},{"tagId":3,"name":"node"},{"tagId":4,"name":"jsx"},{"tagId":5,"name":"html"},{"tagId":6,"name":"css"},{"tagId":7,"name":"script"},{"tagId":8,"name":"라이브러리"},{"tagId":9,"name":"과일"},{"tagId":10,"name":"과일일"},{"tagId":11,"name":"무기"},{"tagId":12,"name":"화학"},{"tagId":13,"name":"조류"},{"tagId":14,"name":"탈것"},{"tagId":15,"name":"야채"},{"tagId":16,"name":"스마트폰"}],
	//워드&태그 연결 템플릿(id와 id를 받으므로 둘 다 정수)
	// wordTagLinkTemplate:{
	// 	wordId:0,
	// 	tagId:0
	// },
	//워드&태그 연결
	wordTagLinks:JSON.parse(localStorage.getItem(`${wordTagLinksPrefix}`))
		||[{"wordId":1,"tagId":2},{"wordId":1,"tagId":7},{"wordId":2,"tagId":2},{"wordId":2,"tagId":1},{"wordId":2,"tagId":8},{"wordId":4,"tagId":9},{"wordId":7,"tagId":9},{"wordId":7,"tagId":11},{"wordId":8,"tagId":9},{"wordId":8,"tagId":11},{"wordId":8,"tagId":12},{"wordId":6,"tagId":9},{"wordId":6,"tagId":13},{"wordId":5,"tagId":9},{"wordId":5,"tagId":14},{"wordId":9,"tagId":15},{"wordId":10,"tagId":16},{"wordId":10,"tagId":11},{"wordId":11,"tagId":16},{"wordId":11,"tagId":11},{"wordId":12,"tagId":13},{"wordId":3,"tagId":3},{"wordId":3,"tagId":2},{"wordId":15,"tagId":3},{"wordId":15,"tagId":2},{"wordId":0,"tagId":0},{"wordId":0,"tagId":2},{"wordId":0,"tagId":5},{"wordId":0,"tagId":6},{"wordId":0,"tagId":3}],
	//결과값id
	resultPrefix:'',
	resultId:-1

}

const dictionaryReducer = (state,action)=>{
	let newWordId = 0;
	let newWordName = ''
	let newWords = [];
	let newTagId = 0;
	let newTags = [];
	let newWordTagLinks = [];
	switch (action.type) {
	case 'addWord' :
		//중복이면 단어 새로 안만들고 태그, 태그연결 변경사항 반영
		newWordName = action.newWord.name.trim().replaceAll(' ','');
		if (action.newWord.wordId>-1) {
			//수정요청
			newWordId = action.newWord.wordId
			//허위로 보낸 id면 그냥 생성으로
			if (!state.words[newWordId]) {
				newWordId = -1;
			}
		} else {
			//생성요청
			//네임으로 id뽑아내기
			newWordId =	state.words.map((word)=>{
				return word.name.toLowerCase()
			}).indexOf(newWordName.toLowerCase())
		}

		if (newWordId>-1) {
			//이미 있는 단어의 id
			newWordId = state.words.filter((word)=>{
				return parseInt(word.wordId) === parseInt(newWordId)
			})[0].wordId
			//이미 있는 단어면 설명 수정
			newWords = state.words.map((word)=>{
				if(parseInt(word.wordId)===parseInt(newWordId)){
					return {
						...word,
						name: newWordName,
						description: action.newWord.description,
						visible:true
					};
				} else {
					return word;
				}
			})
		} else {
			//없는 단어면 id 새로 할당해서 추가
			newWordId = state.words.length;
			newWords = [
				...state.words,
				{
					wordId:newWordId,
					name:newWordName,
					description:action.newWord.description,
					date:parseInt(new Date().getTime()),
					visible:true
				}
			]
		}
		//태그추가
		newTagId = state.tags.length;
		let tagNames = state.tags.map((tag)=>{
			return tag.name;
		});
		//단어태그연결 미리 비워두기(나중에 채우기)
		newWordTagLinks = state.wordTagLinks.filter((wordTagLink)=>{
			return parseInt(wordTagLink.wordId) !== parseInt(newWordId)
		});
		//태그입력(,)을 배열로 변환->10개제한
		let tagsSplit = action.newWord.tags.split(',').map((tagName)=>{
			return tagName.trim();
		}).slice(0,10);
		let tagsArr = tagsSplit.filter((tagName,index)=>{
			//중복자르기
			return tagsSplit.indexOf(tagName) === index
		}).filter((tagName)=>{
			if (tagName.length>0 &&
				!tagNames.includes(tagName)) 
				{
				//기존에 없던 태그면 다음 map 함수로 넘겨주기
				return true
			} else if (tagName.length<=0) {
				//빈문자열이면 조작x
				return false
			} else {
				//있던 태그면 단어태그연결 미리 생성(id가 할당돼있으므로)
				newWordTagLinks.push({
					wordId:newWordId,
					tagId:tagNames.indexOf(tagName)
				});
				return false;
			};
		}).map((tagName)=>{
			//단어태그연결 생성(id새로 할당)
			newWordTagLinks.push({
				wordId:newWordId,
				tagId:newTagId
			});
			//없던 태그들 받아서 태그목록에 추가해주기
			return {
				tagId:newTagId++,
				name:tagName
			}
		})
		newTags = state.tags.concat(tagsArr);
		//로컬에 동기화
		localStorage.setItem(`${wordsPrefix}`,JSON.stringify(newWords));
		localStorage.setItem(`${tagsPrefix}`,JSON.stringify(newTags));
		localStorage.setItem(`${wordTagLinksPrefix}`,JSON.stringify(newWordTagLinks));
		//리턴 스테이트
		return {
			...state,
			words: newWords,
			tags: newTags,
			wordTagLinks: newWordTagLinks,
			resultPrefix:action.newWord.redirect?'detail':'',
			resultId:newWordId
		}
	case 'removeWord':
		//선택 항목 비활성화
		newWords = state.words.map((word)=>{
			if(parseInt(word.wordId)===parseInt(action.wordId)){
				return {
					...word,
					visible:false,
					description:'삭제된 항목'
				}
			} else {
				return {
					...word
				}
			}
		})
		//단어태그연결 비워두기
		newWordTagLinks = state.wordTagLinks.filter((wordTagLink)=>{
			return parseInt(wordTagLink.wordId) !== parseInt(newWordId)
		});
		//로컬에 동기화
		localStorage.setItem(`${wordsPrefix}`,JSON.stringify(newWords));
		localStorage.setItem(`${wordTagLinksPrefix}`,JSON.stringify(newWordTagLinks));
		return {
			...state,
			words: newWords,
			wordTagLinks: newWordTagLinks,
			resultPrefix:'',
			resultId:newWordId
		}
	case 'addTag' :
		//태그 추가
		newTags = [
			...state.tags,
			{
				...action.newTag,
				tagId:state.tags.length
			}
		]
		localStorage.setItem(`${tagsPrefix}`,JSON.stringify(newWords))
		return {
			...state,
			tags: newTags,
			resultPrefix:'',
			resultId:-1
		}
	case 'wordTagLink':
		//워드,태그 연결하기
		newWordTagLinks = [
			...state.wordTagLinks,
			{
				wordId:action.wordId,
				tagId:action.tagId
			}
		]
		localStorage.setItem(`${wordTagLinksPrefix}`,JSON.stringify(newWordTagLinks))
		return {
			...state,
			wordTagLinks: newWordTagLinks,
			resultPrefix:'',
			resultId:-1
		}
	case 'wordTagUnlink':
		//워드,태그 연결끊기
		newWordTagLinks = [...state.wordTagLinks]
			.filter((wordTagLink)=>{
				return parseInt(wordTagLink.wordId)!==parseInt(action.wordId)
					|| parseInt(wordTagLink.tagId)!==parseInt(action.tagId)
			})
		localStorage.setItem(`${wordTagLinksPrefix}`,JSON.stringify(newWordTagLinks))
		return {
			...state,
			wordTagLinks: newWordTagLinks,
			resultPrefix:'',
			resultId:-1
		}
	case 'truncate':
		//싹비우기
		localStorage.clear();
		return {
			...dictionaryDefault,
			words:[],
			tags:[],
			wordTagLinks:[],
			resultPrefix:'',
			resultId:-1
		}
	default :
	}
	return;
}

//EXPORT
export { dictionaryDefault, dictionaryReducer }