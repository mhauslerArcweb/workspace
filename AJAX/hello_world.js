$.get( "shopping_list.json", function( data ) {
	
	var i, entry;
	for (i=0; i < data.items.length; i++) {
		entry = data.items[i];
		$("#myDiv").append(entry.name + ", " + entry.quantity + ", " + entry.complete + "<br>");
	}
});

