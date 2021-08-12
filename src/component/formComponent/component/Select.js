import React from 'react';

const Select = ({children,...props}) => {
	console.log(props, 'props');
	return <select {...props}
		className="form-input"
	>
		<option>
			{props.placeholder}
		</option>
		{children}
	</select>;
};

Select.Option = function(props) {
	console.log(props, 'props');
	return <option {...props}
		className="s"
		label={props.children}
	></option>;
};
export default Select;
