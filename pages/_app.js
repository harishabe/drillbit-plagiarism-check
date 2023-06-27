import '../styles/globals.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { ThemeProvider } from "@mui/styles";
import PageChange from '../components/loader/PageChange';
import Router, { useRouter } from 'next/router';

import theme from '../src/theme';

import { Provider } from 'react-redux';
import store from '../redux/store';
import { getItemSessionStorage } from '../utils/RegExp'

Router.events.on('routeChangeStart', (url) => {
    document.body.classList.add('body-page-transition');
    ReactDOM.render(
        <PageChange path={url} />,
        document.getElementById('page-transition')
    );
});

Router.events.on('routeChangeComplete', () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
    document.body.classList.remove('body-page-transition');
});

Router.events.on('routeChangeError', () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
    document.body.classList.remove('body-page-transition');
});

export default function MyApp(props) {
    const [toastWidth, setToastWidth] = React.useState('');
    const router = useRouter();
    const { Component, pageProps } = props;
    const [authorized, setAuthorized] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('message', handleWindowMessage);
        return () => {
            window.removeEventListener('message', handleWindowMessage);
        };
    }, []);

    const handleWindowMessage = (event) => {
        if (event.data.type === 'MESSAGE_LENGTH') {
            const messageLength = event.data.payload;
            let newWidth = "";
            if (messageLength < 50) {
                newWidth = 'auto';
            } else if (messageLength > 50 && messageLength <= 160) {
                newWidth = `${messageLength * 3.5}px`;
            } else if (messageLength > 160) {
                newWidth = 'auto';
            }
            setToastWidth(newWidth !== "" ? newWidth : "");
        }
    };

    React.useEffect(() => {
        authCheck(router.asPath);
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        };
    }, [router.events]);

    const Layout = Component.layout || (({ children }) => <>{ children }</>);

    function authCheck(url) {
        const publicPaths = ['/auth/login', '/auth/forgot-password', '/auth/reset-password', '/auth/single-sign-on'];
        const path = url.split('?')[0];
        if (!getItemSessionStorage('token') && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/auth/login'
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ThemeProvider theme={ theme }>
                {/* <CssBaseline /> */ }
                <Provider store={ store }>
                        <ToastContainer style={ toastWidth ? { width: toastWidth, padding: '0px' } : null } />
                    <Layout>
                        { authorized && <Component { ...pageProps } /> }
                    </Layout>
                </Provider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};