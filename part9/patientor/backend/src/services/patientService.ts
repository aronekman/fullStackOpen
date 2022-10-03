import patients from '../../data/patients';

import { NonSensitivePatientEntry, patientEntry } from '../types';

const getEntries = (): patientEntry[] => {
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

export default { getEntries, getNonSensitiveEntries };
