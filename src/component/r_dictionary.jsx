const wordsPrefix = 'words'
const tagsPrefix = 'tags'
const wordTagLinksPrefix = 'wordTagLinks'

//WORDS
const dictionaryDefault = {

	//워드 템플릿
	wordTemplate:{
		id:0,
		name:'wordName',
		description:'wordDescription'
	},
	//워드 목록(로컬에서 가져오기)
	words:JSON.parse(localStorage.getItem(`${wordsPrefix}`))
		||[],

	//태그 템플릿
	tagTemplate:{
		id:0,
		name:'tagName'
	},
	//태그 목록(로컬에서 가져오기)
	tags:JSON.parse(localStorage.getItem(`${tagsPrefix}`))
		||[],

	//워드&태그 연결 템플릿(id와 id를 받으므로 둘 다 정수)
	wordTagLinkTemplate:{
		wordId:0,
		tagId:0
	},
	//워드&태그 연결
	wordTagLinks:JSON.parse(localStorage.getItem(`${wordTagLinksPrefix}`))
		||[]

}

const dictionaryReducer = (state,action)=>{
	let newWordTagLinks = [];
	let newTags = [];
	switch (action.type) {
	case 'addWord' :
		//단어 추가
		let newWords = [
			...state.words,
			{
				id:state.words.length,
				name:action.newWord.name,
				description:action.newWord.description
			}
		]
		//태그입력(,)을 배열로 변환
		let tagsArr = action.newWord.tags.split(',').map((tag)=>{
			return tag.trim();
		}).filter((tag)=>{
			return (tag.length>0 &&
				!state.tags.includes(tag)
			);
		})
		newTags = state.tags.concat(tagsArr);
		//로컬에 동기화
		localStorage.setItem(`${wordsPrefix}`,JSON.stringify(newWords));
		localStorage.setItem(`${tagsPrefix}`,JSON.stringify(newTags));
		return {
			...state,
			words: newWords,
			tags: newTags
		}
	case 'addTag' :
		//태그 추가
		newTags = [
			...state.tags,
			{
				...action.newTag,
				id:state.tags.length
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
	default :
	}
	return;
}

//EXPORT
export { dictionaryDefault, dictionaryReducer }