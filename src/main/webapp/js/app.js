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
        	//showDialog("Money Manager", "Your account has been created.")
        	login();
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

function login() {
	
	var email = $("#txt-email").val();
	var password = $("#txt-password").val();
	
	console.log(email);
	console.log(password);
	
	$.ajax( {
        cache: false,
        crossDomain: true,
        dataType: JSON_DATA_TYPE,
        url: WS_URL.LOGIN_URL,
        type: REQUEST.POST,
        data: {
            "username": email,
            "password": password
        },
        success: function( jsonObj, textStatus, xhr ) {
            sessionStorage.auth_token = jsonObj.auth_token;
            window.location.replace("http://localhost:8080/moneymanager-client/payment.html");
        },
        error: function( xhr, textStatus, errorThrown ) {
            console.log( "HTTP Status: " + xhr.status );
            console.log( "Error textStatus: " + textStatus );
            console.log( "Error thrown: " + errorThrown );
        }
    } );
}