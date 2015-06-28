function register() {
	
	var userData = new Object();
	userData.name = $("#txt-name").val();
	userData.email = $("#txt-email").val();
	userData.password = $("#txt-password").val();
	
    $.ajax({
        url: WS_URL.REGISTER_URL,
        contentType: JSON_CONTENT_TYPE,
        type: REQUEST.POST,
        data: JSON.stringify(userData),
        success: function(data) {
        	showDialog("Money Manager", "Your account has been created.")
        },
        error: function(error) {
        	console.log(error);
        }
    });
}

function showDialog(dialogTitle, dialogContent) {
	$("#dialog").dialog({
		title: dialogTitle,
		modal: true,
		open: function(event, ui) {
			$("#dialog-content").text(dialogContent);
		}
	});
}
