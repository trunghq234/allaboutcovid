import './App.css';
import 'antd/dist/antd.css';
import React from 'react';
import { Layout } from 'antd';
import AppWorld from './pages/home';
import VietNam from './pages/vietnam';
import Vaccine from './pages/vaccine';
import AppNews from './pages/news';
import AppHeader from './components/layout/header';
import AppFooter from './components/layout/footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GA4React from 'ga-4-react';
const { Header, Footer, Content } = Layout;

const trackingId = 'G-6MLS770X5M';
try {
  setTimeout((_) => {
    const ga4react = new GA4React(trackingId);
    ga4react.initialize();
  }, 1000);
} catch (err) {
  console.log(err);
}

function App() {
  return (
    <Router>
      <Layout className="mainLayout">
        <Header>
          <AppHeader />
        </Header>
        <Content>
          <Switch>
            <Route exact to="/">
              <AppWorld />
            </Route>
            <Route exact to="/vietnam">
              <VietNam />
            </Route>
            <Route exact to="/vaccine">
              <Vaccine />
            </Route>
            <Route exact to="/news">
              <AppNews />
            </Route>
          </Switch>
        </Content>
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
