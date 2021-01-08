import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Divider, Image, Typography, Statistic, Row, Col } from 'antd';

import Layout from '../../layout';
import { ConfirmationButton } from '../../shared';
import { DeleteOutlined } from '@ant-design/icons';
import placeholder from '../../../assets/photo-placeholder.png';
import Tags from '../Tags';
import { formatter } from '../../../utils/numbers';
import { loadAdvert, deleteAdvert } from '../../../store/actions';
import { getAdvertOnState, getUi } from '../../../store/selectors';
import { connect } from 'react-redux';

const { Title } = Typography;

const AdvertPage = ({ deleteAdvert, loadAdvert, advert, error, history, ...props }) => {

  const getAdvertId = () => props.match.params.id;

  const handleDeleteClick = async () => {
    deleteAdvert(getAdvertId());
    await history.push('/');
  };

  const handleGetAdvert = async () => {
    loadAdvert(getAdvertId());
  };

  const renderAdvert = () => {

    if (error) {
      return <Redirect to="/404" />;
    }

    if (!advert) {
      console.log(advert)
      return null;
    }

    const { name, price, tags, sale, photoUrl } = advert;

    return (
      <Row>
        <Col span={24}>
          <Title level={2}>
            {name} - {sale ? 'Sell' : 'Buy'}
          </Title>
        </Col>
        <Col span={12}>
          <Statistic title="Price" value={price} formatter={formatter} />
          <div style={{ marginTop: 20 }}>
            <span style={{ marginRight: 5 }}>Tags</span>
            <Tags tags={tags} />
          </div>
        </Col>
        <Col span={12}>
          <Image
            src={photoUrl}
            alt={name}
            width={300}
            height={300}
            fallback={placeholder}
          />
        </Col>
        <ConfirmationButton
          danger
          icon={<DeleteOutlined />}
          confirmationProps={{
            title: 'Delete advert?',
            content: 'Are you sure you want to delete this advert?',
            okText: 'Yes',
            cancelText: 'No',
            okButtonProps: {
              danger: true,
            },
          }}
          onConfirm={handleDeleteClick}
          style={{ marginTop: 20 }}
          block
        >
          Delete
        </ConfirmationButton>
      </Row>
    );
  };

  useEffect(() => {
    handleGetAdvert();
  }, [props.match.params.id]);

  return (
    <Layout title="Advert detail">
      <Divider>Detail of your advert</Divider>
      {renderAdvert()}
    </Layout>
  );
}

AdvertPage.propTypes = {
  match: T.shape({ params: T.shape({ id: T.string.isRequired }).isRequired })
    .isRequired,
}; 

const mapStateToProps = (state) => {
  return {
    advert: getAdvertOnState(state),
    ui: getUi(state),
  }
}

export default connect(mapStateToProps, dispatch => ({
  loadAdvert: (advertId) => dispatch(loadAdvert(advertId)),
  deleteAdvert: (advertId) => dispatch(deleteAdvert(advertId))
}))(AdvertPage);
