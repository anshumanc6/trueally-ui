import "./insurance.css";
import {Button, Col, Form, Input, InputNumber, message, Row, Spin, Tabs, Typography} from "antd";
import {useState} from "react";
import axios from 'axios';

const {Text, Title} = Typography;
const {TabPane} = Tabs;

export const Insurance = () => {
    const [insurance, setInsurance] = useState({});
    const [insuranceFetched, setInsuranceFetched] = useState(false);
    const [insuranceFetching, setInsuranceFetching] = useState(false);

    const fetchInsuranceByPolicyId = formData => {
        setInsuranceFetching(true)
        axios.get(`http://localhost:5000/api/insurance/policy/${formData.policyId}`)
            .then((resp) => {
                setInsuranceFetched(true)
                setInsurance(resp.data)
                setInsuranceFetching(false)
                message.success('Insurance Fetched');
            })
            .catch(error => {
                setInsuranceFetching(false);
                message.error(error.response.data.error);
            })
    }

    const fetchInsuranceByCustomerId = formData => {
        setInsuranceFetching(true)
        axios.get(`http://localhost:5000/api/insurance/customer/${formData.customerId}`)
            .then((resp) => {
                setInsuranceFetched(true)
                setInsurance(resp.data)
                setInsuranceFetching(false)
                message.success('Insurance Fetched');
            })
            .catch(error => {
                setInsuranceFetching(false);
                message.error(error.message.error);
            })
    }

    const updateInsurance = formData => {
        console.log(formData)
        setInsuranceFetching(true)
        axios.put(`http://localhost:5000/api/insurance/policy/${formData.id}`, formData)
            .then((resp) => {
                setInsuranceFetched(true)
                setInsurance(resp.data)
                setInsuranceFetching(false)
                message.success('Insurance Updated');
            })
            .catch(error => {
                setInsuranceFetching(false);
                message.error("Insurance Update Failed");
            })
    }

    return (
        <div className={"InsuranceContainer"}>
            <Row className={"Header"}>
                <Col offset={3}>
                    <Title> Welcome to TrueAlly</Title>
                </Col>
            </Row>
            <Row>
                <Col span={18} offset={3}>
                    <Text>
                        Stay safe and healthy, renew your policies online from the comfort of your home! Log into
                        www.trueally.com or use our mobile app for renewing your Motor/PA/Health policy online.

                        For help regarding renewal of your policy, please get in touch with your Agent/ Development
                        Officer/ Policy issuing office. You can also call on toll free helpline number xxxx xxx xxx
                        or write to customercare@trueally.com for policy/claim support. Please bear with us
                        in case of a delay in attending to your call. Please write to online.policy@trueally.com
                        for any issues faced in online renewal.At your service always.
                    </Text>

                </Col>
            </Row>
            <Row className={"SearchBox"}>
                <Col offset={3}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Search by Policy ID" key="1">
                            <Form
                                name="basic"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                                initialValues={{remember: true}}
                                autoComplete="off"
                                onFinish={fetchInsuranceByPolicyId}
                            >
                                <Form.Item
                                    label="Policy ID"
                                    name="policyId"
                                    rules={[{required: true, message: 'Please enter policy id!'}]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                    <Button type="primary" htmlType="submit">
                                        Search
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Search by Customer ID" key="2">
                            <Form
                                name="basic"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                                initialValues={{remember: true}}
                                onFinish={fetchInsuranceByCustomerId}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Customer ID"
                                    name="customerId"
                                    rules={[{required: true, message: 'Please enter your customer id!'}]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                    <Button type="primary" htmlType="submit">
                                        Search
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>

            {
                insuranceFetching ?
                    <Row justify={"center"}>
                        <Spin size="large"/>
                    </Row>
                    :
                    insuranceFetched ?
                        <Row>
                            <Col span={18} offset={3}>
                                <div className={"InsuranceDisplayContainer"}>
                                    <Col className={"IFormData"}>
                                        <Form
                                            name="basic"
                                            labelCol={{span: 8}}
                                            wrapperCol={{span: 12}}
                                            initialValues={insurance}
                                            autoComplete="off"
                                            onFinish={updateInsurance}
                                        >
                                            <Form.Item
                                                label="Policy ID"
                                                name="id"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Date of Purchase"
                                                name="date_of_purchase"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Customer ID"
                                                name="customer_id"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Fuel"
                                                name="fuel"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Vehicle Segment"
                                                name="vehicle_segment"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Premium"
                                                name="premium"
                                                rules={[{required: true, message: 'Please input your username!'},
                                                    {type: "number", max:1000000}]}
                                            >
                                                <InputNumber style={{width:"100%"}}/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Bodily Injury Liability"
                                                name="bodily_injury_liability"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Personal Injury"
                                                name="personal_injury"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Property Damage"
                                                name="property_damage"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Collision"
                                                name="collision"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Comprehensive"
                                                name="comprehensive"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Customer Gender"
                                                name="customer_gender"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Customer Income Group"
                                                name="customer_income_group"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Customer Region"
                                                name="customer_region"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Customer Marital Status"
                                                name="customer_marital_status"
                                                rules={[{required: true, message: 'Please input your username!'}]}
                                            >
                                                <Input/>
                                            </Form.Item>

                                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                                <Button type="primary" htmlType="submit">
                                                    Update
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                        : null
            }
        </div>
    )
}