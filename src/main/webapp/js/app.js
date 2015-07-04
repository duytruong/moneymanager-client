var userID = undefined;

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
        	sessionStorage.clear();
        	login();
        },
        error: function(error) {
        	showDialog("Money Manager", "Someone already has that email. Try another?");
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

function showConfirmDialog(dialogTitle, dialogContent) {
	$("#confirm-dialog-content").html(dialogContent);
	
	$("#confirm-dialog").dialog({
		title: dialogTitle,
		resizable : false,
		modal : true,
		buttons : {
			OK : function() {
				doAddPayment();
				$(this).dialog("close");
			},
			Cancel : function() {
				$("#txt-payment-price").val("");
				$(this).dialog("close");
			}
		}
	});
}

function login() {
	
	var email = $("#txt-email").val();
	var password = $("#txt-password").val();
	
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
        	showDialog("Money Manager", "Login failed! Please check your email and password!");
        	resetLoginForm();
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
	    headers: {
	    	"auth_token": sessionStorage.auth_token
	    },
	    dataType: JSON_DATA_TYPE,
	    crossDomain: true,
	    success: function(data) {
	    	$("#name-area").text("Hello " + data.name);
	    	userID = data.userid;
	    	loadPayment(data.userid);
	    },
	    error:function(msg){
	    	window.location.replace("http://localhost:8080/moneymanager-client");
	    }
	});
}

function loadPayment(userId) {
	$.ajax({
	    url: WS_URL.GET_PAYMENT,
	    type: REQUEST.POST,
	    data: {
	    	"userid": userId,
	    },
	    headers: {
	    	"auth_token": sessionStorage.auth_token
	    },
	    dataType: JSON_DATA_TYPE,
	    crossDomain: true,
	    success: function(data) {
	    	var sumOfPayments = 0;
	    	var paymentTable = $("#payment-table");
	    	paymentTable.find("tbody tr").remove().end();
	    	for (var i = 0; i < data.length; i++) {
	    		var rowStr = '<tr>' + 
	    			'<td>' + data[i].name + '</td>' +
	    			'<td>' + data[i].date + '</td>' +
	    			'<td>' + data[i].price + '</td>' + '</tr>';
	    		
	    		paymentTable.append(rowStr);
	    		sumOfPayments += data[i].price;
	    	}
	    	$("#sum-of-payment").text("Sum: " + sumOfPayments);
	    },
	    error:function(msg){
	    	console.log(msg);
	    }
	});
}

function doAddPayment() {
	var paymentData = new Object();
	paymentData.name = $("#txt-payment-name").val();
	paymentData.date = $("#txt-payment-date").val();
	paymentData.price = $("#txt-payment-price").val();
	if (userID != undefined) {
		var owner = new Object();
		owner.id = userID;
		paymentData.user = owner;
	}
	
	$.ajax({
        url: WS_URL.ADD_PAYMENT,
        contentType: JSON_CONTENT_TYPE,
        dataType: JSON_DATA_TYPE,
        type: REQUEST.POST,
        headers: {
	    	"auth_token": sessionStorage.auth_token
	    },
        data: JSON.stringify(paymentData),
        success: function(data) {
        	showDialog("Money Manager", "Your payment is added.");
        	resetAddPaymentForm();
        	loadPayment(userID); //reload
        },
        error: function(error) {
        	showDialog("Money Manager", "Sorry! Cannot add payment.");
        	console.log(error);
        }
    });
}

function addPayment() {
	var price = $("#txt-payment-price").val();
	
	if (isPriceGreaterThanTenMil(price)) {
		showConfirmDialog("Add Payment", "Price is greater than 10 000 000. Do you want to add?");
	} else {
		doAddPayment();
	}
}

function isPriceGreaterThanTenMil(price) {
//	if (price > MAX_PRICE) {
//		return true;
//	} else {
//		return false;
//	}
	return (price > MAX_PRICE ? true : false);
}

function resetAddPaymentForm() {
	$("#txt-payment-name").val("");
	$("#txt-payment-date").val("");
	$("#txt-payment-price").val("");
}

function resetLoginForm() {
	$("#txt-email").val("");
	$("#txt-password").val("");
}