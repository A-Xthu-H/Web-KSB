import express from 'express';
import authRoutes from './auth.routes.js';
import doctorRoutes from './doctor.routes.js';
import scheduleRoutes from './schedule.routes.js';
import serviceRoutes from './service.routes.js';
import facilityRoutes from './facility.routes.js';
import articleRoutes from './article.routes.js';
import partnerRoutes from './partner.routes.js';
import jobRoutes from './jobVacancy.routes.js';
import settingRoutes from './setting.routes.js';
import messageRoutes from './message.routes.js';
import uploadRoutes from './upload.routes.js';
import contentRoutes from './content.routes.js';

const router = express.Router();

// Hubungkan rute dengan menyertakan ekstensi .js
router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/services', serviceRoutes);
router.use('/facilities', facilityRoutes);
router.use('/articles', articleRoutes);
router.use('/partners', partnerRoutes);
router.use('/jobs', jobRoutes);
router.use('/settings', settingRoutes);
router.use('/messages', messageRoutes);
router.use('/uploads', uploadRoutes);
router.use('/contents', contentRoutes);

export default router;