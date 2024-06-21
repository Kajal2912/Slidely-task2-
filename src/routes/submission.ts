import express from 'express';
import {
  getAllSubmissions,
  getSubmissionById,
  createSubmission,
  updateSubmission,
  deleteSubmission
} from '../controllers/submissionController.js';

const router = express.Router();

router.get('/submissions', getAllSubmissions);
router.get('/submissions/:id', getSubmissionById);
router.post('/submissions', createSubmission);
router.put('/submissions/:id', updateSubmission);
router.delete('/submissions/:id', deleteSubmission);

export default router;
