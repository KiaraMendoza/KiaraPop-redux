import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Empty, Button, Spin, List, Divider } from 'antd';

import storage from '../../../utils/storage';
import Layout from '../../layout';
import FiltersForm, { defaultFilters } from './FiltersForm';
import AdvertCard from './AdvertCard';
import { getUi, getAdvertsOnState } from '../../../store/selectors';
import { loadAdverts } from '../../../store/actions';

const AdvertsPage = ({loadAdverts, loading, error, adverts}) => {
  const [filters, setFilters] = useState(storage.get('filters') || defaultFilters)

  const handleLoadAdverts = () => {
    loadAdverts();
  }

  const formatFilters = () => {
    const {
      filters: { name, sale, price, tags },
    } = this.state;

    const filters = {};
    if (name) {
      filters.name = name;
    }
    if (['sell', 'buy'].includes(sale)) {
      filters.sale = sale === 'sell';
    }
    if (price.length) {
      filters.price = price.join('-');
    }
    if (tags.length) {
      filters.tags = tags.join(',');
    }

    return filters;
  };

  const handleSubmit = filters => {
    storage.set('filters', filters);
    setFilters(filters);
  };

  const renderLoading = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  );

  const renderError = () => {
    return (
      <Empty
        description={<span style={{ color: '#ff4d4f' }}>{`${error}`}</span>}
      >
        <Button type="primary" danger onClick={handleLoadAdverts}>
          Reload
        </Button>
      </Empty>
    );
  };

  const renderEmpty = () => {
    const isFiltered =
      JSON.stringify(filters) !== JSON.stringify(defaultFilters);
    return (
      <Empty description={<span>No adverts here!</span>}>
        {isFiltered ? (
          <span>Refine your search</span>
        ) : (
          <Link to="/adverts/new">
            <Button type="primary">Create the first one</Button>
          </Link>
        )}
      </Empty>
    );
  };

  const renderAdvert = advert => {
    return (
      <List.Item>
        <Link to={`/adverts/${advert._id}`}>
          <AdvertCard {...advert} />
        </Link>
      </List.Item>
    );
  };

  const renderAdverts = () => {
    if (loading) {
      return renderLoading();
    }

    if (error) {
      return renderError();
    }

    if (!adverts) {
      return null;
    }

    if (!adverts.length) {
      return renderEmpty();
    }

    return (
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={adverts}
        renderItem={renderAdvert}
      />
    );
  };

  useEffect(() => {
    console.log('useEffect')
    handleLoadAdverts();
  }, [filters]);

  return (
    <Layout title="Adverts list">
      <Divider>Filter your adverts</Divider>
      <FiltersForm initialFilters={filters} onSubmit={handleSubmit} />
      <Divider>Adverts</Divider>
      {renderAdverts()}
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    adverts: getAdvertsOnState(state),
    ui: getUi(state),
  }
}

export default connect(mapStateToProps, dispatch => ({
  loadAdverts: () => dispatch(loadAdverts())
}))(AdvertsPage);
