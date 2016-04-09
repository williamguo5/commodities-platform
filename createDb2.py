#!/bin/python

import urllib
import urllib2
import json
import sys, random, csv
from random import randint
from datetime import datetime

ports = ['ALBN', 'BRSB', 'ESPR', 'GEEL',
		 'GLAD', 'KWIN', 'MACK', 'MELB',
		 'NEWC', 'POAD', 'POGI', 'POKE',
		 'POLI', 'PRTL', 'THEV', 'WALL']

grains = ['APH2', 'H1', 'H2', 'APW1',
			'ASW1', 'AGP1', 'FED1']

years = ['Y1', 'Y2']

months = [(1,'JAN'), (2,'FEB'), (3,'MAR'), (4,'APR'), 
			(5,'MAY'), (6,'JUN'), (7,'JUL'), (8,'AUG'), 
			(9,'SEP'), (10,'OCT'), (11,'NOV'), (12,'DEC')]

if (len(sys.argv) != 5):
	print ("[Entries] [Start] [End] [userID]")

def getRandomDay(month):
	if (month == 'FEB'):
		return random.randint(1,28)
	
	elif (month == 'APR' or
			 month == 'JUN' or
			 month == 'SEP' or
			 month == 'NOV'):
		return random.randint(1,30)

	else:
		return random.randint(1,31)


entries = sys.argv[1]
start = sys.argv[2]
end = sys.argv[3]
userID = sys.argv[4]

# RCI = []
# dates = []
# prices = []

startDate = datetime.strptime(start, "%d/%b/%y")
endDate = datetime.strptime(end, "%d/%b/%y")
# file = open('test.csv', 'w+')

monthRange = []
for i in range(startDate.month - 1, endDate.month):
	monthRange.append(months[i][1])

# print (monthRange)


# file.write('#RIC,Date[G],Price')
# file.write('\n')
for i in range(0, int(entries)):
	# string = random.choice(ports) + '-' + random.choice(grains) + '-' + random.choice(years)
	
	grain = random.choice(grains)
	port = random.choice(ports)
	yearC = random.choice(years)


	month = random.choice(monthRange)
	day = getRandomDay(month)
	year = startDate.year

	date = str(day) + '/' + month + '/' + str(year)

	price = random.randint(1000, 10000)

	values = {"userID":userID, "grain":grain, "date":date}
	data =urllib.urlencode(values)
	req = urllib2.Request('http://localhost:1337/shipping', data)
	res = urllib2.urlopen(req)
	jsonRes =json.load(res)
	id = jsonRes["id"]

	values={"name":port,"price":price}
	data =urllib.urlencode(values)
	url = 'http://localhost:1337/shipping/' + str(id) + '/port' + str(yearC) 
	print url
	req = urllib2.Request(url, data)
	res = urllib2.urlopen(req)
	
	print res.read()
	

	# print jsonRes

	# file.write(string + ',' + date + ',' + str(price))
	# file.write('\n')
	# print (string + ',' + date + ',' + str(price))
	


