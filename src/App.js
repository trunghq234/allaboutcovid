import "./App.css";
import "antd/dist/antd.css";
import React from "react";
import { Layout } from "antd";
import AppHome from "./pages/home";
import AppHeader from "./components/layout/header";
import AppFooter from "./components/layout/footer";

const { Header, Footer, Content } = Layout;

function App() {
	return (
		<Layout className="mainLayout">
			<Header>
				<AppHeader />
			</Header>
			<Content>
				<AppHome />
			</Content>
			<Footer>
				<AppFooter />
			</Footer>
		</Layout>
	);
}

export default App;
