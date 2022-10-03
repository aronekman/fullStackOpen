import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry
} from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = { id: uuid(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSensitiveEntries, addPatient };
