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
        	sessionStorage.clear();
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

function logout() {
	$.ajax( {
        crossDomain: true,
        headers: {
        	"auth_token": sessionStorage.auth_token
        },
        url: WS_URL.LOGOUT_URL,
        type: REQUEST.POST,
        success: function( jsonObj, textStatus, xhr ) {
        	sessionStorage.clear();
            window.location.replace("http://localhost:8080/moneymanager-client");
        },
        error: function( xhr, textStatus, errorThrown ) {
            console.log( "HTTP Status: " + xhr.status );
            console.log( "Error textStatus: " + textStatus );
            console.log( "Error thrown: " + errorThrown );
        }
    } );
}

function getUserId() {
	$.ajax({
	    url: WS_URL.GET_USER_ID,
	    type: REQUEST.POST,
	    data: {
	    	"auth_token": sessionStorage.auth_token
	    },
	    dataType: JSON_DATA_TYPE,
	    crossDomain: true,
	    success: function(data) {
	    	console.log(data.userid);
	    	loadPayment(data.userid);
	    },
	    error:function(msg){
	    	console.log(msg);
	    }
	});
}

function loadPayment(userId) {
	$.ajax({
	    url: WS_URL.GET_PAYMENT,
	    type: REQUEST.POST,
	    data: {
	    	"userid": userId
	    },
	    dataType: JSON_DATA_TYPE,
	    crossDomain: true,
	    success: function(data) {
	    	var paymentTable = $("#payment-table");
	    	paymentTable.find("tbody tr").remove().end();
	    	for (var i = 0; i < data.length; i++) {
	    		var rowStr = '<tr>' + 
	    			'<td>' + data[i].getName() + '</td>' +
	    			'<td>' + data[i].getDate() + '</td>' +
	    			'<td>' + data[i].getPrice() + '</td>' + '</tr>';
	    		
	    		paymentTable.append(rowStr);
	    	}
	    },
	    error:function(msg){
	    	console.log(msg);
	    }
	});
}

function addPayment() {
	
}