import React from 'react';
import T from 'prop-types';
import { Alert, Col, Row, Typography } from 'antd';

import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { resetError, authLogin } from '../../../store/actions';
import { getUi } from '../../../store/selectors';
import useForm from '../../../hooks/useForm';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = ({ onLogin, loading, error }) => {
  const location = useLocation();
  
  const [form, handleChange] = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = event => {
    console.log('click submit')
    event.preventDefault();
    const crendentials = form;
    onLogin(crendentials, location);
  };

  return (
    <Row>
      <Col span={8} offset={8} style={{ marginTop: 64 }}>
        <Title style={{ textAlign: 'center' }}>Log In</Title>
        <LoginForm form={form} handleChange={handleChange} onSubmit={handleSubmit} />
        {error && (
          <Alert
            afterClose={resetError}
            closable
            message={error}
            showIcon
            type="error"
            style={{ marginTop: 24 }}
          />
        )}
      </Col>
    </Row>
  );
}

export default connect(getUi, dispatch => ({
  onLogin: (crendentials, location, history) => dispatch(authLogin(crendentials, location, history)),
  resetError: () => dispatch(resetError())
}))(LoginPage);
