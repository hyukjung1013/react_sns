import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types'
import AppLayout from '../components/AppLayout';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux';
import withRedux from 'next-redux-wrapper'
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas';

const NodeBird = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType,
  store: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}

NodeBird.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(ctx);   
    // Component는 <Component />를 의미한다.
    // Hashtag.getInitialProps = async (ctx) => { .. } 가 호출된다.
  }
  return { pageProps };
}

export default withRedux((initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production' 
  ? compose(applyMiddleware(...middlewares))
  : compose(
    applyMiddleware(...middlewares),
    !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  )
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
})(NodeBird);