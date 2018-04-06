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
		
		// insert the CMS
		$('#edit').html('<link href="https://api.dashpilot.com/v1/css/" rel="stylesheet"><script src="https://api.dashpilot.com/v1/js/?access_token='+token+'"></script>');
		
	}
	
	// changed this to only display when logged in
	if(sessionStorage.getItem('token') !== null){
	get_data(1);
	}
	
});
		
		window.addEventListener("hashchange", get_data, false);
		
		function get_data(fadein){
			
			if(fadein=='1'){
			$('main').hide();
			}
			
			
			var page = get_page();
			
			window.page = page;
			
			
			// check if the page is stored locally
			if(sessionStorage.getItem('token') !== null && sessionStorage.getItem(page) !== null){
				var data = sessionStorage.getItem(page);
				data = JSON.parse(data);
				generate_page(data, fadein);
				
				console.log('local');
				
			}else{
			
				$.getJSON( "data/"+page+".json", function( data ) {

				  json = data; // set globally

					generate_page(data, fadein);

				});
			}
				
			
		}
				  
		function generate_page(data, fadein){
				
			  var items = [];
				
			  
				
				
		$.each(columns, (function( index, column_name ) {	
			
			
				
			  $.each( data[column_name], (function( index ) {
				  
				  var item = data[index];
				  if(data[column_name][index]['template']!==undefined){
					 var templ_id = data[column_name][index]['template'];
				  }
				  else{
					 var templ_id = 'default';
				  }
				  
				  items.push( '<section id="'+data[column_name][index]['id']+'" data-template="'+templ_id+'" class="repeat">' );
				  
				  
				//  var source   = document.getElementById(templ_id).innerHTML;  
				 // var template = Handlebars.compile(source);
				  
				  
				  
				  var html = document.getElementById(templ_id).innerHTML;
				  
					items.push(html);
				  
				 
				  items.push( '</section>' );
			  }));
			
		}));	

			  var posts = $( "<div/>", {
				"class": "my-new-list",
				html: items.join( "" )
			  });
				
			
			// insert the data
			$('main').html(posts);
				
		$.each(columns, (function( index, column_name ) {		
			$.each( data[column_name], (function( index ) {
				
				var id = data[column_name][index]['id'];
				
				$.each( data[column_name][index], (function( key, val ) {
					
					
					
					$('#'+id).find('.'+key).html(val);
					
				}));
				
				
			}));
		}));	
			
			
			if(fadein=='1'){
				
				$('main').fadeIn();	
				
				
			}
			
			
			
			// check if function exists
			if(typeof init === "function"){

				init();
			}
				
			
		}		

		function get_page(){
			
			var page = window.location.hash.substr(1).replace('/', ''); // set globally
			
			if(page==''){
			   page = 'index';
			}
			
			return page;
			
		}

	
