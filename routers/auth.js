const { Router } = require('express');
const { check } = require('express-validator');
const { validateCamps } = require('../middlewares/validate-camps');
const { validateJWT } = require('../middlewares/validate-token');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController');


// Rutas para el endpoint <host>/api/auth
const router = Router();

router.post(
	'/new', 
	[
		check('name', 'name is required' ).trim().not().isEmpty(),
		check('email', 'email is invalid' ).isEmail(),
		check('password', 'password min 5 caracters ').trim().isLength({min:5}),
		validateCamps
	], 
	crearUsuario
);


router.post(
	'/', 
	[
		check('email', 'email is invalid').isEmail(),
		check('password', 'password min 5 caracters ').trim().isLength({ min: 5 }),
		validateCamps
	],
	loginUsuario
);


router.get( '/renew',  validateJWT, revalidarToken);





module.exports = router;











