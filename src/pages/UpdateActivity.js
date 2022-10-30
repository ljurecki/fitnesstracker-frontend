import { React } from 'react';
import { EditActivity } from '../components';

const UpdateActivity = ({ navigate, jwt }) => {
  return (
    <EditActivity navigate={navigate} jwt={jwt} />
  );
};

export default UpdateActivity;