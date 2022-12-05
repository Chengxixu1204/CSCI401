
select_policy = '';

async function policy_title_add()
{
    // // Get Input from form
    // var input = document.getElementById("policy-title").value;

    // // Send input to python script
    // var output = await eel.add_policy_title(input)();

    // console.log(output);

    // // reset input field
    // document.getElementById("policy-title").value = "";
    
    // // clear policy viewing field
    // document.getElementById("Current_Viewing_Policy_Title").innerText = " ";
    // document.getElementById("Current_Viewing_Overall_Score").innerHTML = " ";

    // // clear the other viewing field
    // clear_field(document.getElementById("Testing_Ground"))

    // // update policy viewing field
    // document.getElementById("Current_Viewing_Policy_Title").innerText = output[0];
    // document.getElementById("Current_Viewing_Overall_Score").innerHTML = output[1];
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "edit.html");
    ifrm.style.height = "500px";
    ifrm.setAttribute("id", "secondframe");
    ifrm.setAttribute("class", "col-lg-12 col-md-12 col-sm-12");
    document.body.appendChild(ifrm);
}

async function policy_title_submit()
{
    // Get Input from form
    var input = document.getElementById("policy-title").value;

    // Send input to python script
    var output = await eel.get_policy_title(input)();

    console.log(output);

    // reset input field
    document.getElementById("policy-title").value = "";

    // clear policy viewing field
    parent.document.getElementById("Current_Viewing_Policy_Title").innerText = " ";
    parent.document.getElementById("Current_Viewing_Overall_Score").innerHTML = " ";
    parent.document.getElementById("Current_Viewing_Overall_Comment").innerHTML = " ";

    const myNode = parent.document.getElementById("ntest");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }

    // clear the other viewing field
    clear_field(document.getElementById("Testing_Ground"))
    
    // update policy viewing field
    // document.getElementById("Current_Viewing_Policy_Title").innerText = output[0];
    // document.getElementById("Current_Viewing_Overall_Score").innerHTML = output[1];
    var test = document.getElementById("Testing_Ground")
    var out_test = parent.document.getElementById("ntest")
    var list = document.createElement('ul')
    for (var i = 0; i < output.length; i++){
        var item = document.createElement('li')
        item.classList.add('result');
        var con = document.createElement('button')
        const myArray = output[i].split('&')
        var t = document.createTextNode("Policy Title: " + " " + myArray[0]);
        con.appendChild(t)
        con.classList.add('btn')
        con.classList.add('btn-primary')
        con.classList.add('butt')
        con.style.marginTop = "10px"
        // con.setAttribute('content', output[i]);
        item.appendChild(con)
        item.addEventListener("click", function(e){
          document.getElementById("selected_value").innerHTML = myArray[0];
          parent.document.getElementById("Current_Viewing_Policy_Title").innerHTML = myArray[0]
          parent.document.getElementById("Current_Viewing_Overall_Score").innerHTML = myArray[1]
          parent.document.getElementById("Current_Viewing_Overall_Comment").innerHTML = myArray[2]
        });
        
        list.appendChild(item)
    }

    test.appendChild(list)
    out_test.appendChild(list)
    
}

async function policy_title_delete()
{
    // Get Input from form
    var input = document.getElementById("selected_value").innerHTML;
    console.log(input);

    if(input.length == 0){
        alert("No selected policy to delete");
        return;
    }

    // Send input to python script
    var output = await eel.delete_policy_title(input)();

    console.log(output);

    // reset input field
    document.getElementById("selected_value").innerHTML = "";

    // clear policy viewing field
    parent.document.getElementById("Current_Viewing_Policy_Title").innerText = " ";
    parent.document.getElementById("Current_Viewing_Overall_Score").innerHTML = " ";
    parent.document.getElementById("Current_Viewing_Overall_Comment").innerHTML = " ";
    // clear the other viewing field
    // clear_field(document.getElementById("Testing_Ground"))
    const collection = document.getElementsByClassName("result");
    for (let i = 0; i < collection.length; i++) {
        console.log(collection[i].innerHTML);
        if(collection[i].innerHTML == input){
            collection[i].parentNode.removeChild(collection[i]);
        }
    }
}

// yet to implement populate whole list
async function policy_title_viewall()
{
    // Get Input from form
    var input = document.getElementById("policy-title").value;

    // Send input to python script
    var output = await eel.get_policy_all()();

    console.log(output);

    // reset input field
    // document.getElementById("policy-title").value = "";

    // clear policy viewing field
    // document.getElementById("Current_Viewing_Policy_Title").innerText = " ";
    // document.getElementById("Current_Viewing_Overall_Score").innerHTML = " ";

    // clear the other viewing field
    clear_field(document.getElementById("Testing_Ground"))

    // update policies by populating a list in html
    var test = document.getElementById("Testing_Ground")
    var list = document.createElement('table')
    list.style.border = "1px solid black"
    var row = list.insertRow(0);
    var rowhtml = "<th>Title</th><th>Overall_Score</th><th>Overall_Comment</th><th>Governance_Score</th>"
    rowhtml += "<th>Governance_Comment</th><th>Communication_Score</th><th>Communication_Comment</th><th>Standards_Score</th>"
    rowhtml += "<th>Standards_Comment</th><th>Regulatory_Score</th><th>Regulatory_Comment</th>"
    rowhtml += "<th>Fiscal_Score</th><th>Fiscal_Comment</th><th>Lifecycle_Score</th>"
    rowhtml += "<th>Lifecycle_Comment</th><th>Validation_Score</th><th>Validation_Comment</th>"
    rowhtml += "<th>Support_Score</th><th>Support_Comment</th><th>Procurement_Score</th>"
    rowhtml += "<th>Procurement_Comment</th><th>Training_Score</th><th>Training_Comment</th>"
    rowhtml += "<th>Unnamed</th>"
    row.style.border = "1px solid black"
    // rowhtml.style.border = "1px solid black"
    row.insertCell(0).outerHTML = rowhtml;
    
    for (var i = 0; i < output.length; i++){

        // var item = document.createElement('li')
        // var content = document.createTextNode(output[i])
        // item.appendChild(content)
        // list.appendChild(item)
        var ou = output[i]
        var row1 = list.insertRow(i+1);
        if(ou[0] === undefined){
            continue;
        }
        var rowhtml1 = "<td>" + ou[0] + "</td>"
        rowhtml1 += "<td>" + ou[1] + "</td>"
        rowhtml1 += "<td>" + ou[2] + "</td>"
        rowhtml1 += "<td>" + ou[3] + "</td>"
        rowhtml1 += "<td>" + ou[4] + "</td>"
        rowhtml1 += "<td>" + ou[5] + "</td>"
        rowhtml1 += "<td>" + ou[6] + "</td>"
        rowhtml1 += "<td>" + ou[7] + "</td>"
        rowhtml1 += "<td>" + ou[8] + "</td>"
        rowhtml1 += "<td>" + ou[9] + "</td>"
        rowhtml1 += "<td>" + ou[10] + "</td>"
        rowhtml1 += "<td>" + ou[11] + "</td>"
        rowhtml1 += "<td>" + ou[12] + "</td>"
        rowhtml1 += "<td>" + ou[13] + "</td>"
        rowhtml1 += "<td>" + ou[14] + "</td>"
        rowhtml1 += "<td>" + ou[15] + "</td>"
        rowhtml1 += "<td>" + ou[16] + "</td>"
        rowhtml1 += "<td>" + ou[17] + "</td>"
        rowhtml1 += "<td>" + ou[18] + "</td>"
        rowhtml1 += "<td>" + ou[19] + "</td>"
        rowhtml1 += "<td>" + ou[20] + "</td>"
        rowhtml1 += "<td>" + ou[21] + "</td>"
        rowhtml1 += "<td>" + ou[22] + "</td>"
        rowhtml1 += "<td>" + ou[23] + "</td>"
        row1.insertCell(0).outerHTML = rowhtml1;
        row1.style.border = "1px solid black"
        // rowhtml1.style.border = "1px solid black"

    }

    test.appendChild(list)

}
async function policy_title_export(){
    var input = document.getElementById("selected_value").innerHTML;
    var re = await eel.export_policy_title(input)();
    // var ans = "";
    // for(let i = 0; i < re.length; i++){
    //     console.log(re[i])
    //     ans += re[i];
    // }
    var opened = window.open("");
    var cssHead = '<head><link rel="stylesheet" type="text/css" href="../css/extra.css"></head>'
    var html = "<html>" + cssHead + "<body>";
    html += "<table><tr>"
    html += "<th>Title</th><th>Overall_Score</th><th>Overall_Comment</th><th>Governance_Score</th>"
    html += "<th>Governance_Comment</th><th>Communication_Score</th><th>Communication_Comment</th><th>Standards_Score</th>"
    html += "<th>Standards_Comment</th><th>Regulatory_Score</th><th>Regulatory_Comment</th>"
    html += "<th>Fiscal_Score</th><th>Fiscal_Comment</th><th>Lifecycle_Score</th>"
    html += "<th>Lifecycle_Comment</th><th>Validation_Score</th><th>Validation_Comment</th>"
    html += "<th>Support_Score</th><th>Support_Comment</th><th>Procurement_Score</th>"
    html += "<th>Procurement_Comment</th><th>Training_Score</th><th>Training_Comment</th>"
    html += "<th>Unnamed</th></tr>"
    html += "<tr>"
    html += "<td>" + re[0] + "</td>"
    html += "<td>" + re[1] + "</td>"
    html += "<td>" + re[2] + "</td>"
    html += "<td>" + re[3] + "</td>"
    html += "<td>" + re[4] + "</td>"
    html += "<td>" + re[5] + "</td>"
    html += "<td>" + re[6] + "</td>"
    html += "<td>" + re[7] + "</td>"
    html += "<td>" + re[8] + "</td>"
    html += "<td>" + re[9] + "</td>"
    html += "<td>" + re[10] + "</td>"
    html += "<td>" + re[11] + "</td>"
    html += "<td>" + re[12] + "</td>"
    html += "<td>" + re[13] + "</td>"
    html += "<td>" + re[14] + "</td>"
    html += "<td>" + re[15] + "</td>"
    html += "<td>" + re[16] + "</td>"
    html += "<td>" + re[17] + "</td>"
    html += "<td>" + re[18] + "</td>"
    html += "<td>" + re[19] + "</td>"
    html += "<td>" + re[20] + "</td>"
    html += "<td>" + re[21] + "</td>"
    html += "<td>" + re[22] + "</td>"
    html += "<td>" + re[23] + "</td>"
    html += "</tr></table>"
    html += "</body></html>"
    html += '<a onclick="this.href=&quot;data:text/html;charset=UTF-8,&quot;+encodeURIComponent(document.documentElement.outerHTML)" href="#" download="page.html">Download</a>'
    opened.document.write(html);

}

async function policy_title_edit(){
    var input = document.getElementById("selected_value").innerHTML;
    console.log(input);

    

    if(input.length == 0){
        alert("No selected policy to edit");
        return;
    }
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "edit.html");
    ifrm.style.height = "500px";
    ifrm.setAttribute("id", "secondframe");
    ifrm.setAttribute("class", "col-lg-12 col-md-12 col-sm-12");
    document.body.appendChild(ifrm);
    var output = await eel.export_policy_title(input)();
    ifrm.onload = function(){
        console.log(output[0]);
        ifrm.contentWindow.document.getElementById('policytitle').value = output[0];
        ifrm.contentWindow.document.getElementById('policyscore').value = output[1];
        ifrm.contentWindow.document.getElementById('policycomment').value = output[2];
        ifrm.contentWindow.document.getElementById('exampleFormControlTextarea1').value = output[4];
        ifrm.contentWindow.document.getElementById('se1').value = output[3];
        ifrm.contentWindow.document.getElementById('exampleFormControlTextarea2').value = output[6];
        ifrm.contentWindow.document.getElementById('se2').value = output[5];
        ifrm.contentWindow.document.getElementById('exampleFormControlTextarea3').value = output[8];
        ifrm.contentWindow.document.getElementById('se3').value = output[7];
        ifrm.contentWindow.document.getElementById('exampleFormControlTextarea4').value = output[10];
        ifrm.contentWindow.document.getElementById('se4').value = output[9];
        ifrm.contentWindow.document.getElementById('exampleFormControlTextarea5').value = output[12];
        ifrm.contentWindow.document.getElementById('se5').value = output[11];
        ifrm.contentWindow.document.getElementById('exampleFormControlTextarea6').value = output[14];
        ifrm.contentWindow.document.getElementById('se6').value = output[13];
        ifrm.contentWindow.document.getElementById('exampleFormControlTextarea7').value = output[16];
        ifrm.contentWindow.document.getElementById('se7').value = output[15];
        ifrm.contentWindow.document.getElementById('exampleFormControlTextarea8').value = output[18];
        ifrm.contentWindow.document.getElementById('se8').value = output[17];
        ifrm.contentWindow.document.getElementById('exampleFormControlTextarea9').value = output[20];
        ifrm.contentWindow.document.getElementById('se9').value = output[19];
        ifrm.contentWindow.document.getElementById('exampleFormControlTextarea10').value = output[22];
        ifrm.contentWindow.document.getElementById('se10').value = output[21];
    }

    

}
async function Form_Submit(){

    // somehow things get deleted
    
    var input = parent.document.getElementById("selected_value").innerHTML;
    console.log(input + "hello")

    var policyt = document.getElementById('policytitle').value
    var policys = document.getElementById('policyscore').value
    var policyc = document.getElementById('policycomment').value
    var govt = document.getElementById('exampleFormControlTextarea1').value
    var govs = document.getElementById('se1').value
    var commt = document.getElementById('exampleFormControlTextarea2').value
    var comms = document.getElementById('se2').value
    var stdt = document.getElementById('exampleFormControlTextarea3').value
    var stds = document.getElementById('se3').value
    var regt = document.getElementById('exampleFormControlTextarea4').value
    var regs = document.getElementById('se4').value
    var fiscalt = document.getElementById('exampleFormControlTextarea5').value
    var fiscals = document.getElementById('se5').value
    var lifet = document.getElementById('exampleFormControlTextarea6').value
    var lifes = document.getElementById('se6').value
    var testt = document.getElementById('exampleFormControlTextarea7').value
    var tests = document.getElementById('se7').value
    var suppt = document.getElementById('exampleFormControlTextarea8').value
    var supps = document.getElementById('se8').value
    var procuret = document.getElementById('exampleFormControlTextarea9').value
    var procures = document.getElementById('se9').value
    var trainingt = document.getElementById('exampleFormControlTextarea10').value
    var trainings = document.getElementById('se10').value

    console.log("onsubmit_js")
    var output;
    var nput;
    if(input == ""){
        nput = await eel.Form_Add(policyt,policys,policyc,govt,govs,commt,comms,stdt,stds,regt,regs,fiscalt,fiscals,lifet,lifes,testt,tests,suppt,supps,procuret,procures,trainingt,trainings)()
    }else{
        output = await eel.Form_Submit(policyt,policys,policyc,govt,govs,commt,comms,stdt,stds,regt,regs,fiscalt,fiscals,lifet,lifes,testt,tests,suppt,supps,procuret,procures,trainingt,trainings)()
    }

    console.log(output)
    // var button = document.createElement('button');
    // button.innerHTML = 'Refreash Info';
    // button.classList.add('btn')
    // button.classList.add('btn-primary')
    // button.classList.add('butt')
    // button.onclick = function(){
        
    // };
    // var pre = document.getElementById('submitb');
    // pre.appendChild(button);
    // document.getElementById('policytitle').value = output[0];
    // document.getElementById('policyscore').value = output[1];
    // document.getElementById('policycomment').value = output[2];
    // document.getElementById('exampleFormControlTextarea1').value = output[4];
    // document.getElementById('se1').value = output[3];
    // document.getElementById('exampleFormControlTextarea2').value = output[6];
    // document.getElementById('se2').value = output[5];
    // document.getElementById('exampleFormControlTextarea3').value = output[8];
    // document.getElementById('se3').value = output[7];
    // document.getElementById('exampleFormControlTextarea4').value = output[10];
    // document.getElementById('se4').value = output[9];
    // document.getElementById('exampleFormControlTextarea5').value = output[12];
    // document.getElementById('se5').value = output[11];
    // document.getElementById('exampleFormControlTextarea6').value = output[14];
    // document.getElementById('se6').value = output[13];
    // document.getElementById('exampleFormControlTextarea7').value = output[16];
    // document.getElementById('se7').value = output[15];
    // document.getElementById('exampleFormControlTextarea8').value = output[18];
    // document.getElementById('se8').value = output[17];
    // document.getElementById('exampleFormControlTextarea9').value = output[20];
    // document.getElementById('se9').value = output[19];
    // document.getElementById('exampleFormControlTextarea10').value = output[22];
    // document.getElementById('se10').value = output[21];
    
    
}


function clear_field(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}