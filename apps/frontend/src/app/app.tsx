import { useDispatch } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { actions } from '../store/actions';

export function App() {
  const dispatch = useDispatch();
  return (
    <>
      <div />
      <button onClick={() => dispatch(actions.getAllOrderStart())}>
        Get all orders
      </button>
      <button
        onClick={() => dispatch(actions.createOrderStart({ name: 'test' }))}
      >
        create order
      </button>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
      {/* END: routes */}
    </>
  );
}

export default App;
