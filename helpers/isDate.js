const moment = require('moment');


/**
 * Verifica que sea una fecha valida
 */


const isDate = ( date ) => {

	if(!date){
		return false;
	}

	const fecha = moment(date);
	if( fecha.isValid() ){

		return true;

	}else{

		return false;

	}
	
}


module.exports ={
	isDate
}

