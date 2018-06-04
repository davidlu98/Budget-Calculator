$(document).ready(function(){
	var upd_total = 0;
	var upd_income = 0;
	var upd_expenses = 0;

	var date = new Date();

	var months = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];

	var year = date.getFullYear();
	var month = months[date.getMonth()]; 

	$('#sub_top_month').text(`Available Budget in ${month} ${year}:`);

	$('#form').submit(function(){
		var type_of_budget = $('#type_of_budget').val();
		var description = $('#description').val();
		var amount = $('#amount').val();

		if(type_of_budget === 'income'){
			upd_total += Number(amount);
			upd_income += Number(amount);

			upd_total = Number(upd_total).toFixed(2);
			upd_income = Number(upd_income).toFixed(2);		

			if(upd_total < 0){
				$('#sub_mid_final').text(`Budget -$${upd_total}`);
			} else {
				$('#sub_mid_final').text(`Budget +$${upd_total}`);
			}

			$('#sub_mid_income').text(`Income +$${upd_income}`);

			$('#sub_entries_income').append(`<h4 class="income entry">${description} $${amount} <i class="remove fa fa-times-circle"></i> </h4>`);
		} 

		if(type_of_budget === 'expenses'){
			upd_total -= Number(amount);
			upd_expenses += Number(amount);

			upd_total = Number(upd_total).toFixed(2);
			upd_expenses = Number(upd_expenses).toFixed(2);

			if(upd_total < 0){
				$('#sub_mid_final').text(`Budget -$${upd_total}`);
			} else {
				$('#sub_mid_final').text(`Budget +$${upd_total}`);
			}

			$('#sub_mid_expenses').text(`Expenses -$${upd_expenses}`);

			$('#sub_entries_expenses').append(`<h4 class="expense entry">${description} $${amount} <i class="remove fa fa-times-circle"></i> </h4>`);

		}

		return false;
	});

	$(document).on('click', '.remove', function(){
		var text = $(this).parent()[0].innerText;
		var text_length = text.length;
		var index_of_dollar_sign = text.indexOf("$");
		var amount = "";

		for(var i = index_of_dollar_sign+1; i < text_length-1; i++){
			amount += text[i];
		}

		if($(this).parent().hasClass('income')){
			upd_total -= Number(amount);
			upd_income -= Number(amount);

			upd_total = Number(upd_total).toFixed(2);
			upd_income = Number(upd_income).toFixed(2);		

			if(upd_total < 0){
				$('#sub_mid_final').text(`Budget -$${upd_total}`);
			} else {
				$('#sub_mid_final').text(`Budget +$${upd_total}`);
			}

			$('#sub_mid_income').text(`Income +$${upd_income}`);
		}	

		if($(this).parent().hasClass('expense')){
			upd_total += Number(amount);
			upd_expenses -= Number(amount);

			upd_total = Number(upd_total).toFixed(2);
			upd_expenses = Number(upd_expenses).toFixed(2);

			if(upd_total < 0){
				$('#sub_mid_final').text(`Budget -$${upd_total}`);
			} else {
				$('#sub_mid_final').text(`Budget +$${upd_total}`);
			}

			$('#sub_mid_expenses').text(`Expenses -$${upd_expenses}`);
		}			

		$(this).parent().remove();
	})

});

// Things to do: slice the negative sign when updating income or budget
// And also there is a NaN problem
// Maybe make a function to modularize it and repeat code repitition?
// Change UI a bit?