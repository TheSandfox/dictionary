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
	//	date:100000000
	// },
	//워드 목록(로컬에서 가져오기)
	words:JSON.parse(localStorage.getItem(`${wordsPrefix}`))
		||[],

	//태그 템플릿
	// tagTemplate:{
	// 	tagId:0,
	// 	name:'tagName'
	// },
	//태그 목록(로컬에서 가져오기)
	tags:JSON.parse(localStorage.getItem(`${tagsPrefix}`))
		||[],

	//워드&태그 연결 템플릿(id와 id를 받으므로 둘 다 정수)
	// wordTagLinkTemplate:{
	// 	wordId:0,
	// 	tagId:0
	// },
	//워드&태그 연결
	wordTagLinks:JSON.parse(localStorage.getItem(`${wordTagLinksPrefix}`))
		||[]

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
						description: action.newWord.description
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
					date:parseInt(new Date().getTime())
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
		//태그입력(,)을 배열로 변환
		let tagsArr = action.newWord.tags.split(',').map((tagName)=>{
			return tagName.trim();
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
			wordTagLinks: newWordTagLinks
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
			tags: newTags
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
			wordTagLinks: newWordTagLinks
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
			wordTagLinks: newWordTagLinks
		}
	case 'truncate':
		localStorage.clear();
		return {
			...dictionaryDefault,
			words:[],
			tags:[],
			wordTagLinks:[]
		}
	default :
	}
	return;
}

//EXPORT
export { dictionaryDefault, dictionaryReducer }