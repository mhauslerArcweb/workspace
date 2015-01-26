#!/usr/bin/python
import sys
import locale
locale.setlocale( locale.LC_ALL, '' )

from tabulate import tabulate

def get_opt(prompt, options, headers=None):
	options_count = len(options)
	options_indexed = index_array(options)
	print "\n" + prompt + "\n"
	if headers:
		print tabulate(options_indexed, headers=headers, floatfmt=".2f")
	else:
		print tabulate(options_indexed, floatfmt=".2f")
	print ""

	return get_pos_int("Choice: ", options_count, "Option not a valid index") - 1

def get_pos_int(prompt, max_int=0, warning_str="Sorry, not a valid number"):
	while True:
		input_str = raw_input(prompt)
		input_int = safe_int(input_str)
		if input_int > 0:
			if max_int > 0:
				if input_int <= max_int:
					return input_int
			else:
				return input_int
		print warning_str

def index_array(array, start=1):
	return [ [index] + item for (index, item) in enumerate(array, start)]

def safe_int(s):
	try:
		return int(s)
	except Exception:
		return 0

def safe_float(s):
	try:
		return float(s)
	except Exception:
		return 0.00

def item_string(item):
	return item

sales = 0.0

inventory = [["Apple", 3, 1.00, "Red Fruit"],
["Banana", 2, 0.50, "Yellow Fruit"]]
inventory_headers = ["ID", "Name", "Quantity", "Price", "Description"]

while True:
	opt = get_opt("What is your action?:", [["Check Status"], ["New Item"], ["Add Inventory"], ["Sell Item"], ["Exit"]])
	
	if opt == 0: # Display Inventory & Sales
		print ""
		print "Total Sales: " + locale.currency(sales)
		print ""

		print "Current Inventory:" 
		print tabulate(index_array(inventory), headers=inventory_headers, floatfmt=".2f")

	if opt == 1: # New Item
		name = raw_input("Name?: ")
		quantity = get_pos_int("Starting Inventory?: ")
		price = safe_float(raw_input("Price?: "))
		description = raw_input("Description?: ")

		inventory.append([name, quantity, price, description])

	if opt == 2: # Add Inventory
		index = get_opt("Pick One:", inventory, inventory_headers)
		item = inventory[index]
		add_count = get_pos_int("Add how many?: ")
		item[1] += add_count


	if opt == 3: # Sell
		index = get_opt("Pick One:", inventory, inventory_headers)
		item = inventory[index]
		if item[1] > 0:
			sell_count = get_pos_int("Sell how many?: ", item[1], "Sorry, can't sell that quantity")
			item[1] -= sell_count
			sales += item[2]*sell_count
		else:
			print item[0] + " is out of stock"

	if opt == 4: # Exit
		break
