import React from 'react';
import { Alert, Divider } from 'antd';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { connect } from 'react-redux';
// import { createAdvert } from '../../../api/adverts';
import { resetError, createAdvert } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

const NewAdvertPage = ({ createAdvert, resetError, error, ...props}) => {

  const handleSubmit = async (advert) => {
    resetError();
    await createAdvert(advert);
  };

  return (
    <Layout title="New advert">
      <Divider>Create an advert</Divider>
      <NewAdvertForm onSubmit={handleSubmit} />
      {error && (
        <Alert
          afterClose={resetError}
          closable
          message={error}
          showIcon
          type="error"
        />
      )}
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    ui: getUi(state),
  }
}

export default connect(mapStateToProps, dispatch => ({
  createAdvert: (advertData ) => dispatch(createAdvert(advertData)),
  resetError: () => dispatch(resetError())
}))(NewAdvertPage);