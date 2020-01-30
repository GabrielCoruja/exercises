import React from 'react';
import { connect } from 'react-redux';

import * as CounterActions from '../store/actions/counter';

const Counter = ({ counter, inc, dec }) => (
  <p>
    Counter: {counter}
    <button type="button" onClick={() => inc()}>+</button>
    <button type="button" onClick={() => dec()}>-</button>
  </p>
)

const mapStateToProps = ({ counter }) => ({ counter });

const mapDispatchToProps = (dispatch) => ({
  inc: () => dispatch(CounterActions.increment()),
  dec: () => dispatch(CounterActions.decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
