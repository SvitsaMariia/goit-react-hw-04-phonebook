import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filterValue, onFilterChange }) => {
  return (
    <label className={css.filterLabel}>
      <span className={css.filterLabelText}>Find contact by name</span>
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        value={filterValue}
        onChange={onFilterChange}
      />
    </label>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};