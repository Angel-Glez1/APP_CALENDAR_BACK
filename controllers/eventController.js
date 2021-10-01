const { response, request } = require("express")
const Evento = require('../models/Evento');


/**
 * Obtener todos los eventos
 */
const getEventos = async (req, res = response) => {

	const eventos = await Evento.find().populate('user', 'name');

	res.json({ ok: true, eventos });

}


/**
 * Create a new Event 
 */
const crearEvento = async (req, res = response) => {



	try {

		// La letra e significa evento
		const e = new Evento(req.body);
		e.user = req.uid;

		const evento = await e.save();
		return res.status(201).json({ ok: true, evento });


	} catch (error) {
		console.log(error);
		return res.status(500).json({ ok: false, msg: 'Speak whit Admin' })
	}


}

/**
 * Actualizar un evento por el ID
 */
const actulizarEvento = async (req = request, res = response) => {

	const { id } = req.params;
	try {

		// Crear en nuevo evento con los datos actulizados y setear el id del usuario
		const newEvent = { ...req.body, user: req.uid 	}

		// Actulizarlo
		const eventoActiluzado = await Evento.findByIdAndUpdate(id, newEvent, { new: true });
		return res.status(201).json({ ok: true, evento: eventoActiluzado });


	} catch (error) {

		console.log(error);
		return res.status(500).json({ ok: false, msg: 'Speak whit Admin' });

	}


}


const eliminarEvento = async (req, res = response) => {

	const { id } = req.params;

	try {
		// Eliminarlo
		await Evento.findByIdAndDelete(id);
		return res.json({ ok: true });


	} catch (error) {

		console.log(error);
		return res.status(500).json({ ok: false, msg: 'Speak whit Admin' });

	}

}




module.exports = {
	actulizarEvento,
	eliminarEvento,
	crearEvento,
	getEventos,
}



