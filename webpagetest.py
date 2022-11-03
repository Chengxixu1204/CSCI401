import eel
import csv
import mysql.connector
import sys
import os
import pandas as pd

# Initial HTML Designs by Lindsey

hostname = "default-hostname"
username = "default-servername"
passcode = "default-password"

csv_relative_path = "data/policies.csv"

eel.init('web')

# Coping with PyInstaller file path things
def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

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
    csv_path = resource_path(csv_relative_path)
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
    csv_path = resource_path(csv_relative_path)
    all_current_entry = read_csv(csv_path)
    target_title = (inputdata)
    target = ["Not Existing"]
    for entry in all_current_entry:
        if entry[0] == target_title:
            target = entry
            break

    return target

@eel.expose
def get_policy_all():
    # logging input policy title to see if it works

    # renew read, and return targetted array
    csv_path = resource_path(csv_relative_path)
    print(csv_path)
    all_current_entry = read_csv(csv_path)
    result = []
    for entry in all_current_entry:
        result.append(entry)

    return result

@eel.expose
def delete_policy_title(inputdata):
    # logging input policy title to see if it works
    print(inputdata)

    # renew read, check for existence
    csv_path = resource_path(csv_relative_path)
    all_current_entry = read_csv(csv_path)
    target_title = (inputdata)
    target = ["Not Existing"]
    for entry in all_current_entry:
        if entry[0] == target_title:
            target = entry
            break

    # If existing, delete and change message
    if (target[0] != "Not Existing"):
        delete_csv(csv_path,target_title)
        target = ["Deleted"]
   
    # If not, remain unchanged
    else:
        target = ["Not Existing"]

    return target

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

# CSV Deleting by row
def delete_csv(file_path,title):
    file = pd.read_csv(file_path)
    df = pd.DataFrame(file)
    df.drop(df.index[(df["Title"]==title)],axis=0,inplace=True)
    print(df)
    df.to_csv(file_path,index=False)
        




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