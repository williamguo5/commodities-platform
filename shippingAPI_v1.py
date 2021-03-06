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
	
# Converts csv file into a 4 dimensional dictionary
def readData(filename):
	with open(filename) as input_file:
		for line in list(csv.DictReader(input_file)):

			RIC = line['#RIC']
			RICfields = RIC.split('-');
			# gets port, grain and year from ric code
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
			if not port in dataDict[grain][date][year]:
				dataDict[grain][date][year][port] = []

			dataDict[grain][date][year][port].append(price)

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
			sys.stdout.write('{')
			sys.stdout.write('"date":"' + date + '","' + 'grain":"' + grain + '","')

			# Find all ports that ship this grain on this date
			for port in ports:
				sys.stdout.write(port + '_Y1":"')
				
				#Check if there's a Year 1 price for this particular grain and date
				if 'CY1' in dataDict[grain][date]:
					if port in dataDict[grain][date]['CY1']:
						portSumCY1 = 0
						numPricesCY1 = len(dataDict[grain][date]['CY1'][port])
						# Sum the prices for duplicate entries of the same grain, date, port
						for price in dataDict[grain][date]['CY1'][port]:
							portSumCY1 += float(price)

						# average this result
						priceCY1 = portSumCY1 / numPricesCY1

						# only add to the average if there price is not 0
						if priceCY1 != 0:
							priceSumCY1 += priceCY1
							numPortsCY1 += 1
							sys.stdout.write(str(float("{0:.2f}".format(priceCY1))))
							
				sys.stdout.write('","')
				
				sys.stdout.write(port + '_Y2":"')
				
				#Check if there's a Year 2 price for this particular grain and date
				if 'CY2' in dataDict[grain][date]:
					if port in dataDict[grain][date]['CY2']:
						portSumCY2 = 0
						numPricesCY2 = len(dataDict[grain][date]['CY2'][port])
						
						# Sum the prices for duplicate entries of the same grain, date, port
						for price in dataDict[grain][date]['CY2'][port]:
							portSumCY2 += float(price)

						# average this result
						priceCY2 = portSumCY2 / numPricesCY2

						# only add to the average if there price is not 0
						if priceCY2 != 0:
							priceSumCY2 += priceCY2
							numPortsCY2 += 1
							sys.stdout.write(str(float("{0:.2f}".format(priceCY2))))


				sys.stdout.write('","')

			# Print averages
			
			sys.stdout.write('average_Y1":"')
			# Only print the average if it's not 0 and the number of the ports if not 0
			if numPortsCY1 != 0 and priceSumCY1 != 0:
				sys.stdout.write(str(float("{0:.2f}".format(priceSumCY1 / numPortsCY1))))

			sys.stdout.write('","')
			sys.stdout.write('average_Y2":"')
			# Only print the average if it's not 0 and the number of the ports if not 0
			if numPortsCY2 != 0 and priceSumCY2 != 0:
				sys.stdout.write(str(float("{0:.2f}".format(priceSumCY2 / numPortsCY2))))
							
			sys.stdout.write('"}')
			print # Print new line

# Check if the date is in range of the start and end date
def isInRange(startDate, endDate, dateToCompare):
	start = datetime.strptime(startDate, "%d-%b-%Y")
	end = datetime.strptime(endDate, "%d-%b-%Y")
	date = datetime.strptime(dateToCompare, "%d-%b-%Y")

	if date < start or date > end: return False
	return True

# get input arguments
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

