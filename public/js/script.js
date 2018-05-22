var date = new Date();

var months = ['January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'];

var year = date.getFullYear();
var month = months[date.getMonth()]; 

$(document).ready(function(){


	$('#sub_top_month').text(`Available Budget in ${month} ${year}:`);

	$.ajax({
		method: 'get',
		url: '/budget-api',
		data: '',
		success: printEntries
	});

});

			// <h2 id="sub_mid_final">+ 0.00</h2>
			// <h4 id="sub_mid_income">Income +0.00</h4>
			// <h4 id="sub_mid_expenses">Expenses -0.00</h4>

function printEntries(data){
	var inc = 0;
	var exp = 0;
	var total = 0.00;

	$.each(data, function(){
		if(this.type_of_budget === 'income'){
			$('<h4>').html(`${this.description} $${this.amount}`).appendTo('#sub_entries_income');
			inc = inc + Number(this.amount);
		
		} else {
			$('<h4>').html(`${this.description} $${this.amount}`).appendTo('#sub_entries_expenses');
			exp = exp + Number(this.amount);
		}
	});

	total = Number(inc) - Number(exp);

	if(total < 0){
		$('#sub_mid_final').text(`- $${total}`);
	} else {
		$('#sub_mid_final').text(`+ $${total}`);
	}

	$('#sub_mid_income').text(`Income + $${inc}`);
	$('#sub_mid_expenses').text(`Expenses - $${exp}`);
}