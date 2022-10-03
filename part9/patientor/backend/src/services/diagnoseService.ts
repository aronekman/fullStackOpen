import diagnoses from '../../data/diagnoses';

import { diagnoseEntry } from '../types';

const getEntries = (): diagnoseEntry[] => {
  return diagnoses;
};

export default { getEntries };
