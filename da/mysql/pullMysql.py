#! /usr/bin/env python

import MySQLdb

db=MySQLdb.connect("localhost","root","pi","heat")
curs=db.cursor()
try: 
	curs.execute("SELECT * FROM temperature")
	print "\nTemperature"
	print"============"
	for reading in curs.fetchall():
		print str (reading[0])
except:
	print "Error: the databse is being rolled back"
	db.rollback()


