var HOST_NAME = '//localhost:8080/moneymanager';

var CLIENT_HOST_NAME = 'http://localhost:8080/moneymanager-client';

var PAGE = {
	PAYMENT: '/payment.html'	
};

var WS_URL = {
		LOGIN_URL: HOST_NAME + '/rest/auth/login',
		LOGOUT_URL: HOST_NAME + '/rest/auth/logout',
		GET_USER_ID: HOST_NAME + '/rest/auth/getUserId',
		REGISTER_URL: HOST_NAME + '/rest/user/register',
		GET_PAYMENT: HOST_NAME + '/rest/payment/getPayments',
		ADD_PAYMENT: HOST_NAME + '/rest/payment/add'
};

var JSON_CONTENT_TYPE = "application/json";

var JSON_DATA_TYPE = "json";

var REQUEST = {
		POST: "POST",
		GET: "GET"
};