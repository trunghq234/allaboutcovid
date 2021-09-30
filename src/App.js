import './App.css';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import AppWorld from './pages/home';
import VietNam from './pages/vietnam';
import Vaccine from './pages/vaccine';
import AppNews from './pages/news';
import AppHeader from './components/layout/header';
import AppFooter from './components/layout/footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import MetaTags from 'react-meta-tags';

const { Header, Footer, Content } = Layout;

function App() {
  const trackingId = 'G-6MLS770X5M';

  useEffect(() => {
    ReactGA.initialize(trackingId, {
      debug: true,
      gaOptions: { cookieDomain: 'none' },
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <MetaTags>
        <title>All about COVID</title>
        <meta
          name="description"
          content="A website dedicated to providing global information about the COVID-19 pandemic."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="All about COVID" />
        <meta
          property="og:image"
          content={
            'https://drive.google.com/uc?export=view&id=1nlAiun06kUwjq6YYGpU2jJ5Wk9UtMSCZ'
          }
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${trackingId}', { page_path: window.location.pathname });
            `,
          }}
        />
      </MetaTags>
      <Router>
        <Layout className="mainLayout">
          <Header>
            <AppHeader />
          </Header>
          <Switch>
            <Route exact path="/">
              <Content>
                <AppWorld />
              </Content>
            </Route>
            <Route exact path="/vietnam">
              <Content>
                <VietNam />
              </Content>
            </Route>
            <Route exact path="/vaccine">
              <Content>
                <Vaccine />
              </Content>
            </Route>
            <Route exact path="/news">
              <Content>
                <AppNews />
              </Content>
            </Route>
          </Switch>
          <Footer>
            <AppFooter />
          </Footer>
        </Layout>
      </Router>
    </>
  );
}

export default App;
