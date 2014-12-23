$("#clearButton").on("click", function() {
	$("#form")[0].reset();
});

$("#addButton").on("click", function() {

	form = $("#form")[0];
	table = $("#table")[0];

	if (!form.checkValidity()) {return }

	var row = table.insertRow(-1);

	var item = row.insertCell(-1);
	var quantity = row.insertCell(-1);
	var buttons = row.insertCell(-1);

	item.innerHTML = form.item.value;
	quantity.innerHTML = form.quantity.value;
	buttons.innerHTML = 
		"<input class='completed' type='checkbox'>" +
		"<input class='deleteButton' type='button' value='X'>";

	form.reset();

});

$(document).on("click", ".completed", function() {
	var checkbox = $(this);
	if (checkbox.is(":checked")) {
		checkbox.parents("tr").addClass("green")
	} else {
		checkbox.parent().parent().removeClass("green")
	}
});

$(document).on("click", ".deleteButton", function() {
	var deleteButton = $(this);
	deleteButton.parent().parent().remove();
});