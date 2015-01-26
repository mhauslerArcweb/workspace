#!/usr/bin/python
import sys
from tabulate import tabulate

def get_opt(prompt, options, headers=None):
	options_count = len(options)
	options_indexed = [ [index] + item for (index, item) in enumerate(options, 1)]
	print "\n" + prompt + "\n"
	if headers:
		print tabulate(options_indexed, headers=headers, floatfmt=".2f")
	else:
		print tabulate(options_indexed, floatfmt=".2f")
	print ""
	while True:
		opt_str = raw_input("Choice: ")
		opt_index = safe_int(opt_str) - 1
		if opt_index < options_count and opt_index >= 0:
			print ""
			return opt_index
		else:
			print "Option not a valid index"

def safe_int(s):
	try:
		return int(s)
	except Exception:
		return -1

def item_string(item):
	return item

sales = 0.0

inventory = [["Apple", 3, 1.00, "Red Fruit"],
["Banana", 2, 0.50, "Yellow Fruit"]]
inventory_headers = ["ID", "Name", "Quantity", "Price", "Description"]

while True:
	opt = get_opt("What is your action?:", [["Check Inventory"], ["New Item"], ["Add Inventory"], ["Sell Item"], ["Exit"]])
	
	if opt == 0:
		print tabulate(inventory, headers=inventory_headers, floatfmt=".2f")
	
	if opt == 3:
		index = get_opt("Pick One:", inventory, inventory_headers)
		item = inventory[index]
		if item[1] > 0:
			item[1] += -1
			sales += item[2]
		else:
			print item[0] + " is out of stock"

	if opt == 4:
		break

