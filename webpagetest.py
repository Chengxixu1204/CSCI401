import eel
import csv
import mysql.connector
import json
import csv
import pandas as pd

# Initial HTML Designs by Lindsey

hostname = "default-hostname"
username = "default-servername"
passcode = "default-password"

json_path = "./policies.json"
csv_path = "./policies.csv"

eel.init('web')

@eel.expose
def add_policy_title(inputdata):
    # logging input policy title to see if it works
    print(inputdata)

    policy = inputdata

    entry = {
        "Title":[policy],
        "Overall_Score":[3]
        }

    # write to the csv file
    all_current_entry = read_csv(csv_path)
    print(all_current_entry)
    write_csv(csv_path,entry)

    # renew read, and return targetted array
    all_current_entry = read_csv(csv_path)
    target_title = (inputdata)
    target = ["Not Existing"]
    for entry in all_current_entry:
        if entry[0] == target_title:
            target = entry
            break

    return target

@eel.expose
def get_policy_title(inputdata):
    # logging input policy title to see if it works
    print(inputdata)

    policy = inputdata

    # renew read, and return targetted array
    all_current_entry = read_csv(csv_path)
    target_title = (inputdata)
    target = ["Not Existing"]
    for entry in all_current_entry:
        if entry[0] == target_title:
            target = entry
            break

    return target

# Json reading
def read_json():
    with open(json_path, "rw") as file:
        data = json.load(file)
        print(data)

# Json appending
def write_json(entry):
    with open(json_path, "r") as file:
        data = json.load(file)
    
    data.append(entry)

    with open(json_path, "w") as file:
        json.dump(data,file)

# CSV Reading
def read_csv(file_path):
    file = pd.read_csv(file_path)
    list = file.values.tolist()
    return list

# CSV Appending
def write_csv(file_path,input):
    print(input)
    df = pd.DataFrame(input)
    # Force it to get a new line
    with open(file_path,'a') as file:
        file.write('\n')
    df.to_csv(file_path,mode='a',index=False,header=False)

# CSV Deleting
def delete_csv(file_path,title):
    file = pd.read_csv(file_path)
    df = pd.DataFrame(file)
    df.drop(df.index[(df["Title"]==title)],axis=0,inplace=True)
    print(df)




# Reading policy from a csv file to db, Chengxi (Vincent)
def read_csv_db(file_name):
    values = []
    with open(file_name, newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        line_count = 0
        for row in reader:
            if line_count == 0:
                # header line
                line_count += 1
            else:
                for element in row:
                    values.append(element)
                write_to_db(values)


# MySql DB access, work of Chengxi (Vincent)
def write_to_db(values):
    mydb = mysql.connector.connect(
        host=hostname,
        user=username,
        password=passcode
    )

    cursor = mydb.cursor()
    sql = "insert into table Values(%s,%s)"
    val = (values[0], values[1])
    cursor.execute(sql, val)
    mydb.commit()


    

eel.start("/pages/index.html", size = (1200,800))