import React, { useEffect } from 'react';
import { Select } from 'antd';
import { loadTags } from '../../store/actions';
import { getTagsOnState } from '../../store/selectors';
import { connect } from 'react-redux';

// import { getTags } from '../../api/adverts';

const { Option } = Select;

const TagsSelect = ({ tags, loadTags, ...props }) => {
  useEffect(() => {
    loadTags();
  }, [loadTags]);

  return (
    <Select
      allowClear
      disabled={!tags}
      mode="multiple"
      placeholder="Select tags"
      style={{ width: '100%' }}
      {...props}
    >
      {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );

}

const mapStateToProps = (state) => {
  return {
    tags: getTagsOnState(state),
  }
}

export default connect(mapStateToProps, dispatch => ({
  loadTags: () => dispatch(loadTags())
}))(TagsSelect);

