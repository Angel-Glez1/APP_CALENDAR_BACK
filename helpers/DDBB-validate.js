
const Evento = require('../models/Evento');


const issetEventID = async ( id,  { req : {uid} }) => {

	const evento = await Evento.findById(id);
	if(!evento){
		throw new Error('No exite evento con es ID');
	}


}






module.exports = {
	issetEventID
}