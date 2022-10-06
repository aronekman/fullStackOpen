import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getEntryById = (id: string): Patient | null => {
  return patients.find(p => p.id === id) ?? null;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
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

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = { id: uuid(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getEntryById, getNonSensitiveEntries, addPatient };
