import "./App.css";
import "antd/dist/antd.css";
import React from "react";
import { Layout } from "antd";
import AppWorld from "./pages/home";
import VietNam from "./pages/vietnam";
import Vaccine from "./pages/vaccine";
import AppNews from "./pages/news";
import AppHeader from "./components/layout/header";
import AppFooter from "./components/layout/footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const { Header, Footer, Content } = Layout;

function App() {
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
