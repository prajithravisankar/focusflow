const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const { sessionValidation, validate } = require('../utils/validation');
const authMiddleware = require('../middleware/auth');

// session routes
router.post('/start', authMiddleware, sessionValidation, validate, sessionController.startSession);
router.put('/:id', authMiddleware, sessionController.updateSession);
router.post('/:id/complete', authMiddleware, sessionController.completeSession);
router.get('/', authMiddleware, sessionController.getSessionHistory);
router.get('/analytics/task/:taskId', authMiddleware, sessionController.getTaskAnalytics);
router.get('/analytics/user', authMiddleware, sessionController.getUserProductivity);


module.exports = router;