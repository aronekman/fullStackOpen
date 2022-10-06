import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part: CoursePart) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

export default Content;
