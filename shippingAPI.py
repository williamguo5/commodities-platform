#!/usr/bin/python

from datetime import datetime
import csv
import sys

dataDict = {}
ports = []

def readData(filename):
	with open(filename) as input_file:
		for line in list(csv.DictReader(input_file)):

			RIC = line['#RIC']
			RICfields = RIC.split('-');

			port = RICfields[0]
			grain = RICfields[1]
			year = RICfields[2]

			date = line['Date[G]']
			price = line['Price']

			if not grain in dataDict:
				dataDict[grain] = {}
			
			if not date in dataDict[grain]:
				dataDict[grain][date] = {}

			if not year in dataDict[grain][date]:
				dataDict[grain][date][year] = {}

			# Create entry in dictionary
			dataDict[grain][date][year][port] = price

			# Add the port to the list of all unique ports
			if not port in ports:
				ports.append(port)

	# Ports should be in alphabetical order
	ports.sort()

def findPrices(grain, startDate, endDate):
	# Iterate through dates that this grain is shipped on
	for date in dataDict[grain]:

		priceSumCY1 = 0
		priceSumCY2 = 0
		numPortsCY1 = 0
		numPortsCY2 = 0

		if isInRange(startDate, endDate, date):
			sys.stdout.write(date + ',' + grain + ',')

			# Find all ports that ship this grain on this date
			for port in ports:
				if 'CY1' in dataDict[grain][date]:
					if port in dataDict[grain][date]['CY1']:
						priceCY1 = dataDict[grain][date]['CY1'][port]
						priceSumCY1 += int(priceCY1)
						numPortsCY1 += 1
						sys.stdout.write(priceCY1)
					
				sys.stdout.write(',')

				if 'CY2' in dataDict[grain][date]:
					if port in dataDict[grain][date]['CY2']:
						priceCY2 = dataDict[grain][date]['CY2'][port]
						priceSumCY2 += int(priceCY2)
						numPortsCY2 += 1
						sys.stdout.write(priceCY2)

				sys.stdout.write(',')

			# Print averages
			if numPortsCY1 != 0:
				sys.stdout.write(str(priceSumCY1 / numPortsCY1))

			sys.stdout.write(',')

			if numPortsCY2 != 0:
				sys.stdout.write(str(priceSumCY2 / numPortsCY2))

			print # Print new line


def isInRange(startDate, endDate, dateToCompare):
	start = datetime.strptime(startDate, "%d-%b-%Y")
	end = datetime.strptime(endDate, "%d-%b-%Y")
	date = datetime.strptime(dateToCompare, "%d-%b-%Y")

	if date < start or date > end: return False
	return True

fileName = sys.argv[-1] # Last argument given
readData(fileName)

query = raw_input("Enter a query of the form 'GRAIN START_DATE END_DATE' or press q to quit: ")

while query != 'q':
	query = query.split(' ');
	grain = query[0]
	startDate = query[1]
	endDate = query[2]
	findPrices(grain, startDate, endDate)
	query = raw_input("Enter a query or press q to quit: ")
