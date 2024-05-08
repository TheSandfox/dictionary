import html from './assets/html.png';
import css from './assets/css.png';
import js from './assets/js.png';
import node from './assets/node.png';
import react from './assets/react.png';

const getLogo = (tagName)=>{
	switch (tagName.toLowerCase().trim().replaceAll(' ','')) {
	case 'html':
		return {
			imgPath:html
		};
	case 'css':
		return {
			imgPath:css
		};
	case 'js':
		return {
			imgPath:js
		};
	case 'node':
		return {
			imgPath:node
		};
	case 'react':
		return {
			imgPath:react
		};
	default :
		return undefined;
	}
}

export { getLogo }