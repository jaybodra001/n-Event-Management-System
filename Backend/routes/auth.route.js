import express from 'express'
import { authCheck, createEvent, deleteEvent, getUserEvents, signup, updateEvent } from '../controllers/auth.controller.js'
import { login } from '../controllers/auth.controller.js'
import { logout } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)    
router.post("/logout", logout)

router.get('/events', protectRoute, getUserEvents);
router.post("/events", protectRoute, createEvent)
router.put("/events/:id", protectRoute, updateEvent)
router.delete("/events/:id", protectRoute, deleteEvent)

router.get("/authCheck", protectRoute, authCheck)

export default router;

