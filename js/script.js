$(document).ready(function(){
	var date = new Date();

	var months = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];

	var year = date.getFullYear();

	var month = months[date.getMonth()]; 

	$('#sub_top_month').text(`Available Budget in ${month} ${year}:`);
	
  	$.ajax({
    	method: 'get',
    	url: '/users-api',
    	data: '',
    	success: printEntry
  	});
});


function printEntry(data){
	$('#sub_top_month').text(`hello`);
}

function addEntry(){
	$.ajax({
		method: 'POST',
    	url: '/users-api',
    	data: 'type_of_budget='+$('#type_of_budget').val()+'description&='+$('#description').val()+'amount&='+$('#amount').val(),
    	success: printEntry
    });
}