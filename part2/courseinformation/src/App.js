const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.map((part) => part.exercises)} />
  </>
);

const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) =>
  parts.map((part, i) => <Part part={part} key={i} />);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ sum }) => (
  <h4>total of {sum.reduce((a, b) => a + b)} exercises</h4>
);

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
