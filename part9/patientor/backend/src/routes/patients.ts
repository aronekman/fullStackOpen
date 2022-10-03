import express from 'express';

import patientService from '../services/patientService';
import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: NewPatientEntry = req.body;
  const newPatientEntry = patientService.addPatient(data);
  res.json(newPatientEntry);
});

export default router;
