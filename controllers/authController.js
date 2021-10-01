const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

/**
 * Register a new user 
 */
const crearUsuario = async (req, res = response) => {

	const { email, password } = req.body;

	try {

		// Buscar si exite un usuario con el mismo email
		let user = await Usuario.findOne({ email });
		if (user) {
			return res.status(400).json({ ok: false, msg: 'There is already a user with this email' })
		}

		user = new Usuario(req.body); // Crear un nuevo registro..

		// Encriptar el password y grabar el nuevo Usuario en DDBB
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);
		await user.save();

		// Generar el token de autentificacion
		const token = await generarJWT(user._id, user.name);

		// Add new User with success
		return res.status(201).json({
			ok: true,
			uid: user._id,
			name: user.name,
			token
		});


	} catch (e) {
		console.log(e)
		return res.status(500).json({ ok: false, msg: 'Speak with the Admin' });
	}



}

/**
 * Login de mi aplicion
 */
const loginUsuario = async (req, res = response) => {

	const { email, password } = req.body;

	try {

		// TODO :: Buscar si exite un registro con el 
		let user = await Usuario.findOne({ email });
		if (!user) {
			return res.status(400).json({ ok: false, msg: 'There is already a user with this email' })
		}


		// Confirmar los passwords
		const validatePassword = bcrypt.compareSync(password, user.password);
		if (!validatePassword) {
			return res.status(400).json({ ok: false, msg: 'Password or email is not correct' })
		}

		// Generar Json Web Token
		const token = await generarJWT(user._id, user.name);

		// Add new User with success
		return res.status(201).json({
			ok: true,
			uid: user._id,
			name: user.name,
			token
		});

	} catch (e) {

		console.log(e);
		return res.status(500).json({ ok: false, msg: 'Speak with the Admin' })

	}


}


const revalidarToken = async (req, res = response) => {
	
	const { uid, name } = req;

	// Renovar el nuevo Token
	const token = await generarJWT( uid , name );

	res.json({ ok: true, token, uid, name });

}

module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken
}