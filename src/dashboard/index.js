import {Bar} from "@ant-design/charts";
import {Col, message, Row, Typography} from "antd";
import "./dashboard.css"
import {useEffect, useState} from "react";
import axios from "axios";

const {Title} = Typography;

export const Dashboard = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/insurance/graph_data")
            .then(resp => setData(resp.data))
            .catch(error => message.error("Failed to load dashboard data from server."))
    }, [])

    const config = {
        data: data,
        xField: 'sales',
        yField: 'type',
        legend: {position: 'top-left'},
        barBackground: {style: {fill: 'rgba(0,0,0,0.1)'}},
        interactions: [
            {
                type: 'active-region',
                enable: false,
            },
        ],
    };

    return (
        <Col span={16} offset={3} className={"Chart"}>
            <Title>Insurance Sales Month Wise</Title>
            <Bar {...config} />
        </Col>
    )
}