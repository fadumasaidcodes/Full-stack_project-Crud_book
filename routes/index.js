const Router = require('koa-router');
const router = new Router();
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');

// Auth Routes
router.get('/login', authController.showLogin);
router.post('/login', authController.login); // Added this line!
router.get('/register', authController.showRegister);

// Book Routes
router.get('/', bookController.index);

module.exports = router;
