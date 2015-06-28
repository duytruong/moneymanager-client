var HOST_NAME = '//localhost:8080/moneymanager';

var WS_URL = {
		LOGIN_URL: HOST_NAME + '/rest/auth/login',
		LOGOUT_URL: HOST_NAME + '/rest/auth/logout',
		REGISTER_URL: HOST_NAME + '/rest/user/register'
};

var JSON_CONTENT_TYPE = "application/json";

var JSON_DATA_TYPE = "json";

var REQUEST = {
		POST: "POST",
		GET: "GET"
};