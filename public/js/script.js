/* script.js
 * The main JavaScript file for the budget calculator
 * Created by David Lu 
 * Date last modified: 6/5/2018 (MM/DD/YYYY)
*/

$(document).ready(function(){
	/* return_current_month_and_year()
	 * Returns the current month and year in an array
	*/
	function return_current_month_and_year(){
		var date = new Date();

		const list_of_all_months = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];

		var year = date.getFullYear();
		var month = list_of_all_months[date.getMonth()]; 

		return [month, year];
	}

	/* add_month_and_year_text()
	 * Updates the view based on the current month and year
	*/
	function add_month_and_year_text(){
		var month_and_year_array = return_current_month_and_year();
		$('#sub_top_month').text(`Available Budget in ${month_and_year_array[0]} ${month_and_year_array[1]}:`);
	}

	/* convert_to_number()
	 * Convert the three main variables to numbers from string
	*/
	function convert_to_number(){
		displayed_total = Number(displayed_total);
		displayed_income = Number(displayed_income);
		displayed_expenses = Number(displayed_expenses);
	}

	/* update_values(type, amount)
	 * Updates the total, income, and expenses
	*/
	function update_values(type, amount){
		convert_to_number();
		if(type === 'income'){
			displayed_total += amount;
			displayed_income += amount;
		} else {
			displayed_total -= amount;
			displayed_expenses += amount;			
		}

		convert_to_number();
		displayed_total = displayed_total.toFixed(2);
		displayed_income = displayed_income.toFixed(2);
		displayed_expenses = displayed_expenses.toFixed(2);
	}

	/* update_views(type, description, amount, addition_or_removal)
	 * Updates the views
	*/
	function update_views(type, description, amount, addition_or_removal){
		amount = amont.toFixed(2);

		if(displayed_total < 0){
			var displayed_total_to_string = displayed_total.toString();
			displayed_total_to_string = displayed_total_to_string.slice(1, displayed_total_to_string.length);

			$('#sub_mid_final').text(`Budget -$${displayed_total_to_string}`);
		} else {
			$('#sub_mid_final').text(`Budget +$${displayed_total}`);
		}

		if(type === 'income'){
			if(addition_or_removal === 'addition'){
				$('#sub_entries_income').append(`<h4 class="income entry">${description} $${amount} <i class="remove fa fa-times-circle"></i> </h4>`);			
			}

			$('#sub_mid_income').text(`Income +$${displayed_income}`);

		} else {
			if(addition_or_removal === 'addition'){
				$('#sub_entries_expenses').append(`<h4 class="expense entry">${description} $${amount} <i class="remove fa fa-times-circle"></i> </h4>`);
			}	

			$('#sub_mid_expenses').text(`Expenses -$${displayed_expenses}`);
		}
	}

	add_month_and_year_text();

	/* 
	 * The three main variables that are displayed on the main page
	*/
	var displayed_total = 0;
	var displayed_income = 0;
	var displayed_expenses = 0;

	$('#submit_button').on('click', function(){
		var type_of_budget = $('#type_of_budget').val();
		var description = $('#description').val();
		var amount = Number($('#amount').val());

		update_values(type_of_budget, amount);
		update_views(type_of_budget, description, amount, 'addition');	
	});

	$(document).on('click', '.remove', function(){
		var text = $(this).parent()[0].innerText;
		var text_length = text.length;
		var index_of_dollar_sign = text.indexOf("$");
		var amount = "";

		for(var i = index_of_dollar_sign+1; i < text_length-1; i++){
			amount += text[i];
		}

		amount = -Number(amount);

		if($(this).parent().hasClass('income')){
			update_values('income', amount);
			update_views('income', '', amount, 'removal');
		}	

		if($(this).parent().hasClass('expense')){
			update_values('expenses', amount);
			update_views('expenses', '', amount, 'removal');
		}			

		$(this).parent().remove();
	})
});