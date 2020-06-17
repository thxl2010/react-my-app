import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { setFilter } from '@/redux/actions';
import { VISIBILITY_FILTERS } from '@/constants';

const VisibilityFilters = ({ activeFilter, setFilter }) => {
  return (
    <div className="visibility-filters">
      {Object.keys(VISIBILITY_FILTERS).map((filterKey, i) => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            role="button"
            tabIndex={i}
            key={`visibility-filter-${currentFilter}`}
            className={cx(
              'filter',
              currentFilter === activeFilter && 'filter--active'
            )}
            onClick={() => {
              setFilter(currentFilter);
            }}
            onKeyDown={event => {
              if (event.keyCode === 13) {
                setFilter(currentFilter);
              }
            }}
          >
            {currentFilter}
          </span>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { activeFilter: state.visibilityFilter };
};
// export default VisibilityFilters;
export default connect(mapStateToProps, { setFilter })(VisibilityFilters);
