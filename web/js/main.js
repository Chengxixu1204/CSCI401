
select_policy = '';

async function policy_title_add()
{
    // Get Input from form
    var input = document.getElementById("policy-title").value;

    // Send input to python script
    var output = await eel.add_policy_title(input)();

    console.log(output);

    // reset input field
    document.getElementById("policy-title").value = "";
    
    // clear policy viewing field
    document.getElementById("Current_Viewing_Policy_Title").innerText = " ";
    document.getElementById("Current_Viewing_Overall_Score").innerHTML = " ";

    // clear the other viewing field
    clear_field(document.getElementById("Testing_Ground"))

    // update policy viewing field
    document.getElementById("Current_Viewing_Policy_Title").innerText = output[0];
    document.getElementById("Current_Viewing_Overall_Score").innerHTML = output[1];
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
    document.getElementById("Current_Viewing_Policy_Title").innerText = " ";
    document.getElementById("Current_Viewing_Overall_Score").innerHTML = " ";

    // clear the other viewing field
    clear_field(document.getElementById("Testing_Ground"))
    
    // update policy viewing field
    // document.getElementById("Current_Viewing_Policy_Title").innerText = output[0];
    // document.getElementById("Current_Viewing_Overall_Score").innerHTML = output[1];
    var test = document.getElementById("Testing_Ground")
    var list = document.createElement('ul')
    for (var i = 0; i < output.length; i++){
        var item = document.createElement('li')
        item.class = 'result'
        var content = document.createTextNode(output[i])
        item.appendChild(content)
        item.addEventListener("click", function(e){
            document.getElementById("selected_value").innerHTML = e.target.innerHTML;
        });
        
        list.appendChild(item)
    }

    test.appendChild(list)
}

async function policy_title_delete()
{
    // Get Input from form
    var input = document.getElementById("policy-title").value;

    // Send input to python script
    var output = await eel.delete_policy_title(input)();

    console.log(output);

    // reset input field
    document.getElementById("policy-title").value = "";

    // clear policy viewing field
    document.getElementById("Current_Viewing_Policy_Title").innerText = " ";
    document.getElementById("Current_Viewing_Overall_Score").innerHTML = " ";

    // clear the other viewing field
    clear_field(document.getElementById("Testing_Ground"))
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
    document.getElementById("policy-title").value = "";

    // clear policy viewing field
    document.getElementById("Current_Viewing_Policy_Title").innerText = " ";
    document.getElementById("Current_Viewing_Overall_Score").innerHTML = " ";

    // clear the other viewing field
    clear_field(document.getElementById("Testing_Ground"))

    // update policies by populating a list in html
    var test = document.getElementById("Testing_Ground")
    var list = document.createElement('ul')
    for (var i = 0; i < output.length; i++){
        var item = document.createElement('li')
        var content = document.createTextNode(output[i])
        item.appendChild(content)
        list.appendChild(item)
    }

    test.appendChild(list)

}

function clear_field(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}