import {redA400, white, greenA700} from 'material-ui/styles/colors';

let config = {
	application: 'Postme',
	environment: global.NODE_ENV,
	//apiBaseUrl: 'http://'+window.location.href.split('/')[2],
	API_URL: 'http://localhost:3000/api',
	CLIENT_ROOT_URL:'http://localhost:8080',
	facebookID: 2011657995780201,
	linkedinID: '81bn7h2uukkg14',
	linkedinSecret: 'FpM5XPpiR7y9Yi4N',
	textColor: '#333',
	buttonColor: '#ff2603',
	buttonTextColor: '#fff',
	backgroundColor: '#fff',
	fontFamily: 'Open Sans,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif',
	fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    tabBackgroundColor: '#ff2603',
    dividerColor: '#333',
    greyColor: '#3333'
}

switch (global.NODE_ENV) {
	case 'production': {
		const {protocol, hostname, port} = window.location
		config.apiBaseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`
		
		break;
	}
	case 'staging': {
		
		break;
	}
	case 'testing':
		break;
	default: {
		config.URL_PREFIX = 'http://localhost:3000/api'
		
		break;
	}
}

export default config
