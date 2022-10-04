import React from 'react';

interface TotalProps {
  total: number;
}

const Total = ({ total }: TotalProps) => {
  return (
    <>
      <p>Number of exercises</p> <p>{total}</p>
    </>
  );
};

export default Total;
