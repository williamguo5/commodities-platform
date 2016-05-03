#!/bin/python

import sys, random, csv
from random import randint
from datetime import datetime

ports = ['ALBN', 'BRSB', 'ESPR', 'GEEL',
     'GLAD', 'KWIN', 'MACK', 'MELB',
     'NEWC', 'POAD', 'POGI', 'POKE',
     'POLI', 'PRTL', 'THEV', 'WALL']

grains = ['APH2', 'H1', 'H2', 'APW1',
      'ASW1', 'AGP1', 'FED1']

years = ['CY1', 'CY2']

months = [(1,'JAN'), (2,'FEB'), (3,'MAR'), (4,'APR'), 
      (5,'MAY'), (6,'JUN'), (7,'JUL'), (8,'AUG'), 
      (9,'SEP'), (10,'OCT'), (11,'NOV'), (12,'DEC')]

if (len(sys.argv) != 4):
  print ("[Entries] [Start] [End]")

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

# RCI = []
# dates = []  
# prices = []

startDate = datetime.strptime(start, "%d/%b/%y")
endDate = datetime.strptime(end, "%d/%b/%y")
file = open('%sEntries.csv' % entries, 'w+')


begin = 0
end = 0

monthRange = []
for i in range(startDate.month - 1, endDate.month):
  monthRange.append(months[i][1])

# print (monthRange)


# file.write('#RIC,Date[G],Price')
file.write('#RIC,Date[G],Time[G],GMT Offset,Type,Ex/Cntrb.ID,Price,Volume,Market VWAP,Bid Price,Bid Size,Ask Price,Ask Size,Qualifiers,Exch Time,Prim Act.,Sec. Act.,Gen Val1,Gen Val2,Gen Val3,Gen Val4,Gen Val5,Crack,Top,Freight Pr.')
file.write('\n')
for i in range(0, int(entries)):
  string = random.choice(ports) + '-' + random.choice(grains) + '-' + random.choice(years)
  
  month = random.choice(monthRange)
  day = getRandomDay(month)
  year = startDate.year

  if day < 10:
    day = '0' + str(day)
  else:
    day = str(day)
  date = day + '-' + month + '-' + str(year)

  price = random.randint(1000, 10000)

  file.write(string +',' + date + ',,,,,,,,,,,,,,' +str(price)+ ',,,,,,,,')
  file.write('\n')
  print (string +',' + date + ',,,,,,,,,,,,,,' +str(price)+ ',,,,,,,,')
  


