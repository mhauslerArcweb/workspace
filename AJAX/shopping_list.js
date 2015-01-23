next_id = 0; 

document.onready = function() {
	$.get( "/", function( data ) {
		var i, entry;
		for (i=0; i < data.items.length; i++) {
			entry = data.items[i];
			createItem(entry.id, entry.name, entry.quantity, entry.complete);
			if (next_id <= entry.id) {
				next_id = entry.id + 1;
			}
		}
	});
};

function createItem(id, name, quantity, complete) {
	table = $("#table")[0];

	var row = table.insertRow(-1);
	
	if (complete) {
		row.className += "green";
	}

	var nameCell = row.insertCell(-1);
	var quantityCell = row.insertCell(-1);
	var buttonsCell = row.insertCell(-1);

	nameCell.innerHTML = name;
	quantityCell.innerHTML = quantity;
	buttonsCell.innerHTML = 
		"<input data-id=" + id + " class='completeBox green' type='checkbox' " + (complete ? "checked":"") + ">" +
		"<input data-id=" + id + " class='deleteButton' type='button' value='X'>";
} 



$("#clearButton").on("click", function() {
	$("#form")[0].reset();
});

$("#addButton").on("click", function() {

	form = $("#form")[0];
	
	if (!form.checkValidity()) {return }

	var itemName = form.itemName.value;
	var quantity = parseInt(form.quantity.value);


	var data = {'id': next_id, 'name': itemName, 'quantity': quantity, 'complete': false};
	console.log(data);

	$.ajax({
		url: '/',
		dataType: 'json',
		type: 'post',
		contentType: 'application/json',
		data: JSON.stringify( data ),
		processData: false,
		success: function() {
			createItem(next_id, itemName, quantity, false);
			next_id++;
		}
	});
	form.reset();

});

$(document).on("click", ".completeBox", function() {
	var checkbox = $(this);
	if (checkbox.is(":checked")) {
		checkbox.parents("tr").addClass("green")
	} else {
		checkbox.parent().parent().removeClass("green")
	}
});

$(document).on("click", ".deleteButton", function() {
	var deleteButton = $(this);

	var id = deleteButton.attr("data-id");
	$.ajax({
		url: '/{id}',
		dataType: 'json',
		type: 'post',
		contentType: 'application/json',
		data: JSON.stringify( data ),
		processData: false,
		success: function() {
			createItem(next_id, itemName, quantity, false);
			next_id++;
		}
	});


	deleteButton.parent().parent().remove();
});
