import React from 'react';
import './App.css';

function App(props: {children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;}) {
	return (
		<div className="App">
			{console.log(props.children)}
			{props.children}
		</div>
	);
}

export default App;
