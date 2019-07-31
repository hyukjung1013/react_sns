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
import withReduxSaga from 'next-redux-saga'
import { LOAD_USER_REQUEST } from '../reducers/user';
import axios from 'axios';
import Helmet from 'react-helmet';

const NodeBird = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Helmet
          title="NodeBird"
          htmlAttributes={{ lang: 'ko' }}
          meta={[{
            charset: 'UTF-8',
          }, {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
          }, {
            'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
          }, {
            name: 'description', content: '제로초의 NodeBird SNS',
          }, {
            name: 'og:title', content: 'NodeBird',
          }, {
            name: 'og:description', content: '제로초의 NodeBird SNS',
          }, {
            property: 'og:type', content: 'website',
          }]}
          link={[{
            rel: 'shortcut icon', href: '/favicon.ico',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
          }]}
        />
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
  const state = ctx.store.getState();

  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie
  }

  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }

  if (Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(ctx);   
  }
  return { pageProps };
}

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production' 
  ? compose(applyMiddleware(...middlewares))
  : compose(
    applyMiddleware(...middlewares),
    !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  )
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

export default withRedux(configureStore)(withReduxSaga(NodeBird));