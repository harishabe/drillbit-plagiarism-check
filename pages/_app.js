import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { ThemeProvider } from "@mui/styles";
import theme from '../src/theme'

import { Provider } from 'react-redux';
import store from '../redux/store';

export default function MyApp(props) {
    const { Component, pageProps } = props
    const Layout = Component.layout || (({ children }) => <>{children}</>)
    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
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