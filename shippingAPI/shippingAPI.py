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
		if isInRange(startDate, endDate, date):
			sys.stdout.write(date + ',' + grain + ',')

			# Find all ports that ship this grain on this date
			for port in ports:
				if 'CY1' in dataDict[grain][date]:
					if port in dataDict[grain][date]['CY1']:
						sys.stdout.write(dataDict[grain][date]['CY1'][port])
					
				sys.stdout.write(',')

				if 'CY2' in dataDict[grain][date]:
					if port in dataDict[grain][date]['CY2']:
						sys.stdout.write(dataDict[grain][date]['CY2'][port])

				sys.stdout.write(',')

			# TODO: Insert code to print price averages

			print # Print new line


def isInRange(startDate, endDate, dateToCompare):
	start = datetime.strptime(startDate, "%d/%b/%y")
	end = datetime.strptime(endDate, "%d/%b/%y")
	date = datetime.strptime(dateToCompare, "%d/%b/%y")

	if date < start or date > end: return False
	return True
