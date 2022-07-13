import * as React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Head from 'next/head';
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { ThemeProvider } from "@mui/styles";
import PageChange from '../components/loader/PageChange';
import Router from "next/router";

import theme from '../src/theme';

import { Provider } from 'react-redux';
import store from '../redux/store';

Router.events.on("routeChangeStart", (url) => {
    document.body.classList.add("body-page-transition");
    ReactDOM.render(
        <PageChange path={url} />,
        document.getElementById("page-transition")
    );
});

Router.events.on("routeChangeComplete", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});

Router.events.on("routeChangeError", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});

export default function MyApp(props) {
    const { Component, pageProps } = props
    const Layout = Component.layout || (({ children }) => <>{children}</>)
    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* <CssBaseline /> */}
                <Provider store={store}>
                    <Layout>
                        <ToastContainer />
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </ThemeProvider>
        </React.Fragment>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}