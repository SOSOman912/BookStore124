import React from 'react';

class ChatBot extends React.Component {
	componentDidMount() {
	    (function(d, m){
	        var kommunicateSettings = 
	            {"appId":"11a82a46d7e88f112e02b31480750923d","popupWidget":true,"automaticChatOpenOnNavigation":true};
	        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
	        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
	        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
	        window.kommunicate = m; m._globals = kommunicateSettings;
	    })(document, window.kommunicate || {});     
	}

	render(){
		return(
		<div></div>
		);
	};
};

export default ChatBot;