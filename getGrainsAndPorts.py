#!/usr/bin/python

from datetime import datetime
import csv
import sys

grains = []
ports = []

def readData(filename):
	with open(filename) as input_file:
		for line in list(csv.DictReader(input_file)):

			RIC = line['#RIC']
			RICfields = RIC.split('-');

			port = RICfields[0]
			grain = RICfields[1]
			
			if not grain in grains:
				grains.append(grain)
			
			# Add the port to the list of all unique ports
			if not port in ports:
				ports.append(port)

	# Ports should be in alphabetical order
	grains.sort()
	ports.sort()



fileName = sys.argv[1]

readData(fileName)

sys.stdout.write('{')
sys.stdout.write('"grains":[')
for grain in grains:
	sys.stdout.write('"' + grain + '"')
	if grains.index(grain) != len(grains) - 1:
		sys.stdout.write(',')

sys.stdout.write('],')
sys.stdout.write('"ports":[')
for port in ports:
	sys.stdout.write('"' + port + '"')
	if ports.index(port) != len(ports) - 1:
		sys.stdout.write(',')

sys.stdout.write(']')
sys.stdout.write('}')
print



