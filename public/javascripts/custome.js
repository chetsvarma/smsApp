function required() {
    if (document.forms["add_list"]["list"].value.length == 0) {
        alert("Please Enter Phone Number List");
        return false;
    }
    return true;
}