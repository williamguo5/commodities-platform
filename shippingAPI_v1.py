#!/usr/bin/python

from datetime import datetime
import csv
import sys

dataDict = {}
ports = []

def isFloat(s):
    try: 
        float(s)
        return True
    except ValueError:
        return False

def sorting(D):
		splitup = D.split('-')
		return splitup[0], splitup[1]
	

def readData(filename):
	with open(filename) as input_file:
		for line in list(csv.DictReader(input_file)):

			RIC = line['#RIC']
			RICfields = RIC.split('-');

			port = RICfields[0]
			grain = RICfields[1]
			year = RICfields[2]

			date = line['Date[G]']
			price = line['Prim Act.']

			if not grain in dataDict:
				dataDict[grain] = {}
			
			if not date in dataDict[grain]:
				dataDict[grain][date] = {}

			if not year in dataDict[grain][date]:
				dataDict[grain][date][year] = {}

			# Make sure price string isn't empty
			if not isFloat(price):
				price = '0'

			# Create entry in dictionary
			dataDict[grain][date][year][port] = price

			# Add the port to the list of all unique ports
			if not port in ports:
				ports.append(port)

	# Ports should be in alphabetical order
	ports.sort()

def findPrices(grain, startDate, endDate):
	# Get dates that this grain is shipped on
	dates = dataDict[grain]

	# Sort dates in dict using lambda
	dates = sorted(dates, key=lambda date: datetime.strptime(date, "%d-%b-%Y"))

	for date in dates:

		priceSumCY1 = 0
		priceSumCY2 = 0
		numPortsCY1 = 0
		numPortsCY2 = 0
		if isInRange(startDate, endDate, date):
			# sys.stdout.write(date + ',' + grain + ',')
			sys.stdout.write('{')
			sys.stdout.write('"date":"' + date + '","' + 'grain":"' + grain + '","')

			# Find all ports that ship this grain on this date
			for port in ports:
				sys.stdout.write(port + '_Y1":"')
				
				if 'CY1' in dataDict[grain][date]:
					if port in dataDict[grain][date]['CY1']:
						priceCY1 = dataDict[grain][date]['CY1'][port]
						if priceCY1 != '0':
							priceSumCY1 += float(priceCY1)
							numPortsCY1 += 1
							sys.stdout.write(priceCY1)
							
				sys.stdout.write('","')
				
				sys.stdout.write(port + '_Y2":"')

				if 'CY2' in dataDict[grain][date]:
					if port in dataDict[grain][date]['CY2']:
						priceCY2 = dataDict[grain][date]['CY2'][port]
						if priceCY2 != '0':
							priceSumCY2 += float(priceCY2)
							numPortsCY2 += 1
							sys.stdout.write(priceCY2)


				sys.stdout.write('","')

			# Print averages
			
			sys.stdout.write('average_Y1":"')
			if numPortsCY1 != 0 and priceSumCY1 != 0:
				sys.stdout.write(str(float("{0:.2f}".format(priceSumCY1 / numPortsCY1))))

			sys.stdout.write('","')
			sys.stdout.write('average_Y2":"')
			if numPortsCY2 != 0 and priceSumCY2 != 0:
				sys.stdout.write(str(float("{0:.2f}".format(priceSumCY2 / numPortsCY2))))
							
			sys.stdout.write('"}')
			print # Print new line


def isInRange(startDate, endDate, dateToCompare):
	start = datetime.strptime(startDate, "%d-%b-%Y")
	end = datetime.strptime(endDate, "%d-%b-%Y")
	date = datetime.strptime(dateToCompare, "%d-%b-%Y")

	if date < start or date > end: return False
	return True

fileName = sys.argv[1]
grain = sys.argv[2]
startDate = sys.argv[3]
endDate = sys.argv[4]


readData(fileName)

# sys.stdout.write("Date,GrainType,")
# for port in ports:
	# sys.stdout.write(port+"_Y1," + port+"_Y2,")

# sys.stdout.write("average_Y1, average_Y2")
# print
if grain not in dataDict:
	print "Invalid grain!"
else:
	findPrices(grain, startDate, endDate)

#query = raw_input("Enter a query of the form 'GRAIN START_DATE END_DATE' or press q to quit: ")

# while query != 'q':
# 	query = query.split(' ');
# 	grain = query[0]
# 	startDate = query[1]
# 	endDate = query[2]
# 	findPrices(grain, startDate, endDate)
# 	query = raw_input("Enter a query or press q to quit: ")
