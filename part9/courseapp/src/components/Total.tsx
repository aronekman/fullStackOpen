import React from 'react';

interface TotalProps {
  total: number;
}

const Total = ({ total }: TotalProps) => {
  return <div> Number of exercises {total} </div>;
};

export default Total;
