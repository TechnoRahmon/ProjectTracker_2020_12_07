import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment >
    <img
      src={spinner}
      style={{ width: '80px', margin: '0', display: 'inline-block' }}
      alt='Loading...'
    />
  </Fragment>
);
