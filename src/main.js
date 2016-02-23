var React = require('react');

var App = React.createClass({
	render : function(){
		return (
			<div>
				<h1>react-boiler-plate</h1>
				<p>
					This boiler plate provides you with minimal code required to get you started quickly.
					It includes followings : 
					<ul>
						<li>Gulp tasks</li>
						<li>Basic project structure</li>
						<li>Sample entry point - main.js</li>
						<li>Sample view - index.html</li>
					</ul>
				</p>
			</div>
		);
	}
});

React.render(<App/>, document.getElementById('app'));