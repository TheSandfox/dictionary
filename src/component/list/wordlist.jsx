import WordWidget from "component/widget/wordwidget"

export default function WordList({words,handleDictionary}) {
	return <>
		{(words&&words.length>0)?words.map((word)=>{
			return <WordWidget key={word.id} word={word} handleDictionary={handleDictionary}/>
		}):<></>}
	</>
}