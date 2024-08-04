import { Router } from 'express';
import { healthcheck } from "../controllers/healthcheck.controller.js";

const router = Router();

// Route to check health of the service
router.route('/').get(healthcheck);

export default router;