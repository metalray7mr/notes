import vertica_python
from config import conn_info


connection = vertica_python.connect(**conn_info)
cur = connection.cursor()

#cur.execute("INSERT INTO hellloworld VALUES (a= :propA)",{'propA':54123})


#cur.copy("COPY county (country,year,population) from stdin DELIMITER ',' ",open('countries.csv','r'))
#cur.execute("commit;")
"""
for i in range(10000):    
    cur.execute("INSERT INTO number  VALUES (:propA,:propB)",{'propA':i*2,'propB':i+3})
cur.execute("commit;")
"""
c="India"
cur.execute("SELECT * FROM county where country='"+c+"'")
x=cur.fetchall()
"""    
for row in cur.iterate():
    print(row)
"""
connection.close()
