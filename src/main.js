$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	render : function(){
		return (
			<div>Inject your component here....</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));