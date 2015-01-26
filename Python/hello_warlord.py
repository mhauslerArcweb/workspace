#!/usr/bin/python
import sys

name = "Warlord"
if len(sys.argv) > 1:
	name = "Lord " + sys.argv[1]
print "Hello " + name
