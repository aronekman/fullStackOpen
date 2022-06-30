import { connect } from 'react-redux';

const Notification = ({ notifications }) => {
  const notification = notifications[notifications.length - 1];
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  if (!notification) return null;
  return <div style={style}>{notification}</div>;
};

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
  };
};

export default connect(mapStateToProps)(Notification);
