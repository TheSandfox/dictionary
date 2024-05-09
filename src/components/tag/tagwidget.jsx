import './tagwidget.css';
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getLogo } from '/src/badges';

export default function TagWidget({tag}){
	const logoProps = useMemo(()=>{
		return getLogo(tag.name)
	},[tag]);
	return <div className={"tagWidget fontRadialMo"+(logoProps?' '+tag.name.toLowerCase():'')}>
		<Link 
			className={`${logoProps?' badge':''}`}
			title={tag.name}
			to={`/list/query/tag/${encodeURI(tag.name)}`}>
			{
				logoProps
				?<>
					<img className='badgeIcon genericShadow2px' src={logoProps.imgPath} alt={tag.name}/>
					<div className='hiddenText'>#{tag.name}</div>
				</>
				:'#'+tag.name
			}
		</Link>
	</div>;
}

function TagWidgets({tags,className,expandInitial}){
	const [expand,setExpand] = useState(expandInitial!==undefined&&expandInitial);
	const size = useMemo(()=>{
		return (expand?Infinity:5)
	},[expand]);
	return <div className={`tagWidgets${className?` ${className}`:''}`}>
		{
			tags.slice(0,size).map((tag)=>{
				return <TagWidget tag={tag} key={tag.tagId}/>
			})
		}
		{
			(tags.length>size&&(!expand))
			?<IoEllipsisHorizontal className="tagWidgetsEllipsis" onClick={()=>{setExpand(true);}}/>
			:<></>
		}
	</div>
}

export {TagWidget,TagWidgets}