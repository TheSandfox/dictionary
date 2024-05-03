import { useMemo } from "react"

export default function WordWidget({word,handleDictionary}) {
	const tags = useMemo(()=>{
		return handleDictionary.getLinkedTags(word.id);
	},[word])
	return <div>
		{word.name}, {word.description}, {tags}
	</div>
}