const { request, response } = require("express");
const Evento = require("../models/Evento");

// Validar si el usuario es dueño del evento que se quiere editar
const isTheOwnerEvent = async (id, { req }) => {


	const evento = await Evento.findById(id);

	if ( evento?.user.toString() !== req.uid) { //* Uso el operador nulo por que puede que no exitan evento en la DDBB.
		throw new Error(`No tiene los permisos necesarios`);
	}

}


module.exports = {
	isTheOwnerEvent
}