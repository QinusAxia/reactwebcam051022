import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Test Portal</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </React.Fragment>

  )
}

export default MyApp
