const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-token');
const { validateCamps } = require('../middlewares/validate-camps');
const { isDate } = require('../helpers/isDate');
const { issetEventID } = require('../helpers/DDBB-validate');
const { isTheOwnerEvent } = require('../helpers/validate-owner');
const { getEventos, crearEvento, actulizarEvento, eliminarEvento } = require('../controllers/eventController');

/**
 * Events Routes
 * <host>/api/events
 */
const router = Router();

// Todas tienen que pasar por las validaciones del token
router.use(validateJWT)

// Obtener eventos
router.get('/',  getEventos);

// Crear eventos
router.post(
	'/',
	[
		check( 'title', 'The title is require' ).trim().not().isEmpty(),
		check( 'start', 'The date start is required' ).custom( isDate ),
		check( 'end', 'The date end is required' ).custom( isDate ),
		validateCamps	
	],
	crearEvento
);

// Actulizar Eventos
router.put('/:id',  
	[
		check('id', 'El ID no es valido').isMongoId(),
		check('id').custom( issetEventID ),
		check('id').custom(isTheOwnerEvent),
		validateCamps
	],
	actulizarEvento
);

// Eliminar eventos()
router.delete('/:id',  
	[
		check('id', 'ID invalido').isMongoId(),
		check('id').custom(issetEventID),
		check('id').custom(isTheOwnerEvent),
		validateCamps
	],
	eliminarEvento
);
 

module.exports = router;

