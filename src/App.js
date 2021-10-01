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
  );
}

export default App;
