import eel
import csv
import mysql.connector
import sys
import os
import pandas as pd
import numpy as np

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

    policy = inputdata

    # renew read, and return targetted array
    csv_path = resource_path(csv_relative_path)
    all_current_entry = read_csv(csv_path)
    target_title = inputdata.split(' ')
    target = []
    for entry in all_current_entry:
        allwords = entry[0].split(' ')
        if all(word in allwords for word in target_title):
            ans = entry[0]
            ans += '&'
            ans += str(entry[1])
            ans += '&'
            ans += entry[2]
            target.append(ans)

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
        entry = checknan(entry)
        result.append(entry)

    return result

def checknan(entry):
    ans = []
    for e in entry:
        if e != e:
            ans.append('')
        else:
            ans.append(e)
    print(ans)
    return ans



@eel.expose
def delete_policy_title(inputdata):
    # logging input policy title to see if it works
    print(inputdata)

    # renew read, check for existence
    csv_path = resource_path(csv_relative_path)
    # all_current_entry = read_csv(csv_path)
    target_title = (inputdata)
    delete_csv(csv_path,target_title)
    # target = ["Not Existing"]
    # for entry in all_current_entry:
    #     if entry[0] == target_title:
    #         target = entry
    #         break

    # If existing, delete and change message
    # if (target[0] != "Not Existing"):
        
    target = ["Deleted"]
   
    # If not, remain unchanged
    # else:
    #     target = ["Not Existing"]

    return target

@eel.expose
def export_policy_title(inputdata):
    csv_path = resource_path(csv_relative_path)
    print(csv_path)
    all_current_entry = read_csv(csv_path)
    result = []
    for entry in all_current_entry:
        if entry[0] == inputdata:
            result = checknan(entry)
            break
    return result

@eel.expose
def import_policy_title(inputdata):
    print(inputdata)
    ndata = inputdata.split('\n')
    csv_path = resource_path(csv_relative_path)
    result = "n"
    for data in ndata:
        alldata = data.split(',')
        if len(alldata) == 23 and alldata[0] != "Title":
            entry = {
                "Title":[alldata[0]],
                "Overall_Score":[alldata[1]],
                "Overall_Comment":[alldata[2]],
                "Governance_Score":[alldata[3]],
                "Governance_Comment":[alldata[4]],
                "Communication_Score":[alldata[5]],
                "Communication_Comment":[alldata[6]],
                "Standards_Score":[alldata[7]],
                "Standards_Comment":[alldata[8]],
                "Regulatory_Score":[alldata[9]],
                "Regulatory_Comment":[alldata[10]],
                "Fiscal_Score":[alldata[11]],
                "Fiscal_Comment":[alldata[12]],
                "Lifecycle_Score":[alldata[13]],
                "Lifecycle_Comment":[alldata[14]],
                "Validation_Score":[alldata[15]],
                "Validation_Comment":[alldata[16]],
                "Support_Score":[alldata[17]],
                "Support_Comment":[alldata[18]],
                "Procurement_Score":[alldata[19]],
                "Procurement_Comment":[alldata[20]],
                "Training_Score":[alldata[21]],
                "Training_Comment":[alldata[22]],
                "Unnamed":[alldata[23]]
            }
            write_csv(csv_path,entry)
    return result

@eel.expose
def Form_Submit(policyt,policys,policyc,govt,govs,commt,comms,stdt,stds,regt,regs,fiscalt,fiscals,lifet,lifes,testt,tests,suppt,supps,procuret,procures,trainingt,trainings):
    csv_path = resource_path(csv_relative_path)
    file = pd.read_csv(csv_path)
    df = pd.DataFrame(file)

    print("Submitting")

    out = []
    df.loc[df.Title==policyt,"Title"] = policyt
    df.loc[df.Title==policyt,"Overall_Score"] = policys
    df.loc[df.Title==policyt,"Overall_Comment"] = policyc
    df.loc[df.Title==policyt,"Governance_Score"] = govs
    df.loc[df.Title==policyt,"Governance_Comment"] = govt
    df.loc[df.Title==policyt,"Communication_Score"] = comms
    df.loc[df.Title==policyt,"Communication_Comment"] = commt
    df.loc[df.Title==policyt,"Standards_Score"] = stds
    df.loc[df.Title==policyt,"Standards_Comment"] = stdt
    df.loc[df.Title==policyt,"Regulatory_Score"] = regs
    df.loc[df.Title==policyt,"Regulatory_Comment"] = regt
    df.loc[df.Title==policyt,"Fiscal_Score"] = fiscals
    df.loc[df.Title==policyt,"Fiscal_Comment"] = fiscalt
    df.loc[df.Title==policyt,"Lifecycle_Score"] = lifes
    df.loc[df.Title==policyt,"Lifecycle_Comment"] = lifet
    df.loc[df.Title==policyt,"Validation_Score"] = tests
    df.loc[df.Title==policyt,"Validation_Comment"] = testt
    df.loc[df.Title==policyt,"Support_Score"] = supps
    df.loc[df.Title==policyt,"Support_Comment"] = suppt
    df.loc[df.Title==policyt,"Procurement_Score"] = procures
    df.loc[df.Title==policyt,"Procurement_Comment"] = procuret
    df.loc[df.Title==policyt,"Training_Score"] = trainings
    df.loc[df.Title==policyt,"Training_Comment"] = trainingt

    out.append(policyt)
    out.append(policys)
    out.append(policyc)
    out.append(govs)
    out.append(govt)
    out.append(comms)
    out.append(commt)
    out.append(fiscals)
    out.append(fiscalt)
    out.append(stds)
    out.append(stdt)
    out.append(regs)
    out.append(regt)
    out.append(lifes)
    out.append(lifet)
    out.append(tests)
    out.append(testt)
    out.append(supps)
    out.append(suppt)
    out.append(procures)
    out.append(procuret)
    out.append(trainings)
    out.append(trainingt)

    df.to_csv(csv_path,index=False)

    return out

@eel.expose
def Form_Add(policyt,policys,policyc, govt,govs,commt,comms,stdt,stds,regt,regs,fiscalt,fiscals,lifet,lifes,testt,tests,suppt,supps,procuret,procures,trainingt,trainings):
    csv_path = resource_path(csv_relative_path)
    
    entry = {
        "Title":policyt,
        "Overall_Score":[policys],
        "Overall_Comment":[policyc],
        "Governance_Score":[govs],
        "Governance_Comment":[govt],
        "Communication_Score":[comms],
        "Communication_Comment":[commt],
        "Standards_Score":[stds],
        "Standards_Comment":[stdt],
        "Regulatory_Score":[regs],
        "Regulatory_Comment":[regt],
        "Fiscal_Score":[fiscals],
        "Fiscal_Comment":[fiscalt],
        "Lifecycle_Score":[lifes],
        "Lifecycle_Comment":[lifet],
        "Validation_Score":[tests],
        "Validation_Comment":[testt],
        "Support_Score":[supps],
        "Support_Comment":[suppt],
        "Procurement_Score":[procures],
        "Procurement_Comment":[procuret],
        "Training_Score":[trainings],
        "Training_Comment":[trainingt],
        "Unnamed":""
    }
    print(entry)
    write_csv(csv_path,entry)



# CSV Reading
def read_csv(file_path):
    file = pd.read_csv(file_path)
    list = file.values.tolist()
    return list

# CSV Appending
def write_csv(file_path,input):
    print(input)
    df = pd.DataFrame(input)
    df = df.replace(np.nan, '', regex=True)
    # Force it to get a new line
    with open(file_path,'a') as file:
        df.to_csv(file_path, mode='a', index=False, header=False)

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