import { connect } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const Filter = ({ changeFilter }) => {
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={event => changeFilter(event.target.value)} />
    </div>
  );
};

export default connect(null, { changeFilter })(Filter);
