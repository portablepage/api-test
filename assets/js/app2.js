$(document).ready(function(){
	
	// this is needed for logging in
	var $_GET = {};
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
		function decode(s) {
			return decodeURIComponent(s.split("+").join(" "));
		}

		$_GET[decode(arguments[1])] = decode(arguments[2]);
	});

	var token = $_GET['access_token'];
	if (typeof token !== 'undefined') {
		//alert(token);
		
		sessionStorage.setItem('token', token);
		
		
		
	}
	
	console.log(get_page());
	
	if (sessionStorage.getItem('token') !== null) {
	// insert the CMS
		
	var token = sessionStorage.getItem('token');
	$('#app').html('<link href="https://api.dashpilot.com/v1/css/" rel="stylesheet"><script src="https://api.dashpilot.com/v1/js/?access_token='+token+'"></script>');
	}
	
	
	
});	
