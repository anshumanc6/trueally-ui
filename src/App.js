import './App.css';
import {Layout, Menu} from "antd";
import {Insurance} from "./insurance";
import {useState} from "react";
import {Dashboard} from "./dashboard";

const {Header, Footer, Sider, Content} = Layout;

function App() {
    const [currentPage, setCurrentPage] = useState("1");

    const onMenuChange = menuChange => {
        setCurrentPage(menuChange.key)
    }

    return (
        <div>
            <Header className={"AppHeader"}>TrueAlly</Header>
            <Layout style={{minHeight: "calc(100vh - 64px)"}}>
                <Sider>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={currentPage}
                        style={{ height: '100%', borderRight: 0 }}
                        onSelect={onMenuChange}
                    >
                        <Menu.Item key="1">Home</Menu.Item>
                        <Menu.Item key="2">Dashboard</Menu.Item>
                    </Menu>
                </Sider>
                { currentPage === "1" ? <Insurance></Insurance> : null}
                { currentPage === "2" ? <Dashboard></Dashboard> : null}
            </Layout>
        </div>
    );
}

export default App;
