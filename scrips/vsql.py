import pyodbc
import vertica_python





cnxn = pyodbc.connect(r'Driver={SQL Server};Server=.\SQLEXPRESS;Database=Movies;Trusted_Connection=yes;')
cursor = cnxn.cursor()
cursor.execute("SELECT * from film")
while 1:
    row = cursor.fetchone()
    if not row:
        break
    print(row[0],row[1],row[2])
    print(row)
cnxn.close()



"""
conn_info = {'host': '192.168.127.129',
             'port': 5433,
             'user': 'ram',
             'password': 'xxx',
             'database': 'BI',
             }

connection = vertica_python.connect(**conn_info)
cur = connection.cursor()
"""


#cur.execute("INSERT INTO hellloworld VALUES (a= :propA)",{'propA':54123})


#cur.copy("COPY county (country,year,population) from stdin DELIMITER ',' ",open('countries.csv','r'))
#cur.execute("commit;")

#for i in range(10000):    
    #cur.execute("INSERT INTO number  VALUES (:propA,:propB)",{'propA':i*2,'propB':i+3})
#cur.execute("commit;")

#c="India"
#cur.execute("SELECT * FROM county where country='"+c+"'")
#x=cur.fetchall()
"""    
for row in cur.iterate():
    print(row)
"""
#connection.close()
