$(document).ready(function(){
	
	
	 
	
	
	// check for access token and store it
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
	
	

if (sessionStorage.getItem('token') !== null) {
	
// disable cache while editing	
$.ajaxSetup({ cache: false });
	
$('body').append('<div id="editscreen" spellcheck="false"><h3 id="editscreen-header">Edit</h3><div><a onclick="closeIt();" class="close"><a class="loading hide"></div><div id="editscreen-body"></div><div id="editscreen-footer"><a class="btn btn-primary text-white" onclick="presave();">Save</a></div></div>');
	
$('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">');
	
$('body').append('<ul id="dp-menu" class="mfb-component--tl mfb-slidein" data-mfb-toggle="hover">\
  <li class="mfb-component__wrap">\
    <a href="#" class="mfb-component__button--main" id="dp-status">\
      <i class="mfb-component__main-icon--resting fa fa-cog"></i>\
      <i class="mfb-component__main-icon--active fa fa-cog"></i>\
	<i class="mfb-component__main-icon--resting fa fa-check" style="display: none;"></i>\
	  <i class="mfb-component__main-icon--active fa fa-check" style="display: none;"></i>\
    </a>\
    <ul class="mfb-component__list">\
      <li>\
        <a onclick="add_post();" data-mfb-label="Add Content" class="mfb-component__button--child" id="dp-publish">\
          <i class="mfb-component__child-icon fa fa-plus"></i>\
        </a>\
      </li>\
      <li>\
        <a onclick="log_out();" data-mfb-label="Log Out" class="mfb-component__button--child" style="padding-top: 5px;">\
          <i class="mfb-component__child-icon fa fa-user"></i>\
        </a>\
      </li>\
		<li style="display: none;">\
        <a href="#" onclick="save();" data-mfb-label="Save Changes" class="mfb-component__button--child" id="dp-save">\
          <i class="mfb-component__child-icon fa fa-save"></i>\
        </a>\
      </li>\
    </ul>\
  </li>\
</ul>');	

}
	
	
	

});

    
		$( document ).ajaxComplete(function() {


            if (sessionStorage.getItem('token') !== null) {

			$(repeatable)
			  .mouseover(function() {
				$(this).css('background-color', '#fffacd');
				$(this).css('cursor', 'pointer');
			  })
			  .mouseout(function() {
				$(this).css('background-color', 'transparent');
			  });
			
			
			$(repeatable).on('click', function(){


				var article_data = {};
				
				var id = $(this).attr('id');

				article_data['id'] = $(this).attr('id');
				
				var postdata = [];
				$(this).find(editable).each(function (index2) {
			
					var key = $(this).prop('class').match(/\b\w*_\w*\b/).toString(); // checks for underscore
					
					article_data[key] = $(this).html();
			
				});
				
					$('#editscreen-header').html('Edit');
					$('#editscreen-body').html('');
					$('#editscreen-footer').show();
					
			
				
				$.each(article_data, function( index, value ) {
					
					if(index=='id'){
				   		$('#editscreen-body').append('<input type="hidden" name="'+index+'" value="'+value+'" id="id">');
					}
					else if(index=='_body'){
				   		$('#editscreen-body').append('<textarea name="'+index+'" placeholder="'+index.replace('_', '')+'" class="form-control rte">'+value+'</textarea>');
					}
					else{
				   		$('#editscreen-body').append('<input type="text" name="'+index+'" placeholder="'+index.replace('_', '')+'" value="'+value+'" class="form-control">');
					}
					
				});
				
				
				$('#editscreen-body').append('<a class="btn btn-default" onclick="delete_post(\''+id+'\');" style="float: right; padding-top: 8px;"><i class="fa fa-trash" style="font-size: 18px !important;"></i></a>');
				
				
				$('.rte').trumbowyg({
					btns: ['strong', 'em', 'unorderedList', 'orderedList', 'link', '|', 'insertImage'],
					autogrow: true,
					spellcheck: false,
					svgPath: 'admin/css/icons.svg'
				});
				
				
				$('#editscreen').fadeIn();
				
				
				
			
			});

			}
			
		});
		

function closeIt(){
	$('#editscreen').fadeOut(function(){
		$('#editscreen-body').html('');
		
	});
	
}

function presave(){
	
	var id = $('#editscreen-body #id').val();
	
	$('#editscreen-body .form-control').each(function(){
		var cl = $(this).attr('name');
		$('#' + id + ' .' + cl).html($(this).val());
		
	});
	
	save();
	
	
}

function save(){

	
	if (sessionStorage.getItem('token') !== null) {
		
		
	//$('.loading').removeClass('hide');	
		
	$('#dp-status .fa-cog').addClass('fa-spin');
		
		
	console.log(get_json());	
		
	
	
	var mydata = JSON.stringify(get_json());
	
		var token = sessionStorage.getItem('token');
		
		closeIt();
		

		$.ajax({
		  method: "POST",
		  url: "https://wt-aec31adf5e76dd7f2bd2d8131ff73de4-0.run.webtask.io/save-to-s3?access_token="+token,
		  data: {page: get_page(), posts: mydata}
			
	 
		})
	  .done(function( msg ) {
		//alert( "Data Saved: " + msg );
			console.log(msg);
			
			
			$('#dp-status .fa-cog').removeClass('fa-spin');
			//$('.loading').addClass('hide');	
			

	  }).fail(function(xhr, status, error) {
        
			alert('Your session has expired. Please log in again.');
			
      });
	 
	 
 
	}
	else{
		
		alert('Please log in first');
		
	}
	
	
	
	
	
}

function get_json(){
	
	var data = {
		'main': []
	};

	// var posts = [];
	// $('body').append('<div id="filter" style="display: none;"></div>');
	
	$(columns).each(function(index, column_name){
		
		data[column_name] = []; // create array for each column
		
		$(column_name + ' ' + repeatable).each(function(index, value){ // $('column .repeat');
			
			
			var classes = $(this).prop('class').split(' ');
			
			var arrayLength = classes.length;
			for (var i = 0; i < arrayLength; i++) {
			
				if(classes[i].charAt(0)=='_'){
				   var type = classes[i];
				}
			}
			
			var article_data = {};
			
			article_data['id'] = $(this).attr('id');
			article_data['template'] = $(this).data('template');
			
			$(this).find(editable).each(function (index2) {
			
					var key = $(this).prop('class').match(/\b\w*_\w*\b/).toString(); // checks for underscore
					
					//var key = $(this).attr('class').replace('edit ', '');
					article_data[key] = $(this).html();
			
			});
			
			data[column_name][index] = article_data;
			
			//posts.push(article_data);
			
			
			
		});
		
	});	
	
	
	
	return data;
}

function delete_post(id){
	
	
	var result = confirm("Want to delete?");
	if (result) {
		
		$('#'+id).fadeOut(function(){
		
		$('#'+id).remove();
		
		save();
		
		});
	}
	
	
}


function add_post(){
	
	$('#editscreen-header').html('Add content block');
	
	$('#editscreen-footer').hide();

	$('#editscreen-body').append('<ul class="list-group">');
	$('template').each(function(){
		
		var id = $(this).attr('id');
		
		
		$('#editscreen-body').append('<li class="list-group-item"><a onclick="insert_post(\''+id+'\');">'+id+'</a></li>');
		
	});
	$('#editscreen-body').append('</ul>');
	
	$('#editscreen').fadeIn();
	
	
}

function insert_post(id){

	
	var rand = "item-"+createId();
	var templ = $('#'+id).html();
	
	var templ2 = '<section id="'+rand+'" data-template="'+id+'" class="repeat"><div class="container">';
	templ2 += templ;
	templ2 += '</div></section>';
	
	alert(templ2);
	
	$('main').prepend(templ2);
	
	save();
	

}

function createId() {
  var rand = Math.random() * (999999 - 999) + 999;
	
	return Math.round(rand);
}

function log_out(){
	
	sessionStorage.removeItem('token');
	
	var curUrl = location.protocol + '//' + location.host + location.pathname;
	
	window.location.href = curUrl;
	
}


