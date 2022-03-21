const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) =>
  parts.map((part, i) => <Part part={part} key={i} />);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0);
  return <h4>total of {total} exercises</h4>;
};

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

export default Course;
