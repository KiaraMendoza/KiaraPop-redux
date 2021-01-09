import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout as DesignLayout, Space } from 'antd';

import styles from './Header.module.css';
// import { LogoutButton } from '../auth';
import { logout } from '../../api/auth';
import { Button } from 'antd';
import { getLoggedUserToken } from '../../store/selectors';
import { authLogout } from '../../store/actions';

const { Header: DesignHeader } = DesignLayout;

const Header = () => {
  const loggedUserToken = useSelector(getLoggedUserToken);
  const dispatch = useDispatch();
  const onLogout = () => dispatch(authLogout());

  return (
    <DesignHeader className={styles.header}>
      <Space size="large" className={styles.nav}>
        <Link to="/">Adverts</Link>
        <Link to="/adverts/new">New advert</Link>
      </Space>
      {/* <LogoutButton className={styles.button}>Logout</LogoutButton> */}
      {loggedUserToken ? (
      <Button
        className={styles.button}
        onClick={() => logout().then(onLogout)}
      >
        Log out
      </Button>
    ) : (
        <Button as={Link} to="/login" className="header-button">
          Login
        </Button>
      )}
    </DesignHeader>
)};

export default Header;
