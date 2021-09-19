import React, {memo} from 'react';

const ThemeContext = React.createContext(null); // 主题颜色Context
const LanContext = React.createContext(null); // 主题语言Context

function ConsumerDemo() {
	return <ThemeContext.Consumer>
		{(themeContextValue) => (
			<LanContext.Consumer>
				{(lanContextValue) => {
					const {color, background} = themeContextValue as any;
					return <div style={{color, background}}> {lanContextValue === 'CH' ? '大家好，让我们一起学习React!' : 'Hello, let us learn React!'}  </div>;
				}}
			</LanContext.Consumer>
		)}
	</ThemeContext.Consumer>;
}

const Son = memo(() => <ConsumerDemo />);
function ProviderDemo() {
	const [themeContextValue] = React.useState({color: '#FFF', background: 'blue'}) as any;
	const [lanContextValue] = React.useState('EN') as any; // CH -> 中文 ， EN -> 英文
	return <ThemeContext.Provider value={themeContextValue}>
		<LanContext.Provider value={lanContextValue}>
			<Son />
		</LanContext.Provider>
	</ThemeContext.Provider>;
}
export default ProviderDemo;
