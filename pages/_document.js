import * as React from "react";
import { I18nextProvider } from 'react-i18next';
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../src/theme";
import { ServerStyleSheets } from "@mui/styles";
import { ServerStyleSheet as StyledServerStyleSheet } from "styled-components";
import i18n from './i18n';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/favicon.ico" />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const styledSheet = new StyledServerStyleSheet();
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        styledSheet.collectStyles(sheets.collect(
          <I18nextProvider i18n={ i18n }>
            <App { ...props } />
          </I18nextProvider>,
        )),
    });
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};
