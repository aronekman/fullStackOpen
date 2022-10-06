import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
  const renderSwitch = () => {
    switch (part.type) {
      case 'normal':
        return <div>{part.description}</div>;
      case 'groupProject':
        return <div>project exercises {part.groupProjectCount}</div>;
      case 'submission':
        return (
          <>
            <div>{part.description}</div>
            <div>submit to {part.exerciseSubmissionLink}</div>
          </>
        );
      case 'special':
        return (
          <>
            <div>{part.description}</div>
            <div>{`required skils: ${part.requirements.join(' ')}`}</div>
          </>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      {renderSwitch()}
    </div>
  );
};

export default Part;
