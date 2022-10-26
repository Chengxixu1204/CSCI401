function policy_title_submit()
{
    // Get Input from form
    var input = document.getElementById("policy-title").value

    // Send input to python script
    eel.get_policy_title(input)

    // reset input field
    document.getElementById("policy-title").value = ""
}