import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, version, DatePicker, Row, Col, Card, Form, Radio, InputNumber } from 'antd';
import moment from 'moment';

const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class DateCalculator extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            apartDay: 0,
            reckonType: "0",
            reckonDay: 0,
            reckonDate: moment(),
            reckonResult: moment().format(dateFormat),
        };
    }

    changeApart(date, dateString) {
        console.log(date, dateString);
        let apart;
        apart = date[1].diff(date[0], 'days');
        this.setState({ apartDay: apart });
    }
    changeReckonType(ev) {
        let type = ev.target.value;
        let { reckonDay, reckonDate } = this.props.form.getFieldsValue();
        let reckonDateStr = reckonDate.format(dateFormat);
        let reckonResult;
        if (type === '0') {
            reckonResult = moment(reckonDateStr).subtract(reckonDay, 'd');
        } else {
            reckonResult = moment(reckonDateStr).add(reckonDay, 'd');
        }
        this.setState({ reckonResult: reckonResult.format(dateFormat), reckonType: type });
    }
    changeReckonDay(value) {
        let reckonDay = value;
        let { reckonType, reckonDate } = this.state;
        let reckonDateStr = reckonDate.format(dateFormat);
        let reckonResult;
        if (reckonType === '0') {
            reckonResult = moment(reckonDateStr).subtract(reckonDay, 'd');
        } else {
            reckonResult = moment(reckonDateStr).add(reckonDay, 'd');
        }
        this.setState({ reckonResult: reckonResult.format(dateFormat), reckonDay: reckonDay });
    }
    changeReckonDate(dateString) {
        let { reckonType, reckonDay } = this.state;
        let dateObj = moment(dateString);
        let reckonResult;
        if (reckonType === '0') {
            reckonResult = dateObj.subtract(reckonDay, 'd');
        } else {
            reckonResult = dateObj.add(reckonDay, 'd');
        }
        this.setState({ reckonResult: reckonResult.format(dateFormat), reckonDate: moment(dateString) });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { reckonDate, reckonResult } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <div>
                <Layout>
                    <Header>
                        <Col span={12}>
                            <h1 style={{ color: '#fff' }}>日期计算器</h1>
                        </Col>
                        <Col span={12}>
                            <div style={{ color: '#fff' }}>今日日期：<span>{moment().format(dateFormat)}</span> </div>
                        </Col>
                    </Header>
                    <Content style={{ padding: '0 10px', minHeight: '500px' }}>
                        <div style={{ background: '#ECECEC', padding: '10px' }}>
                            <Row gutter={16}>
                                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <Card title="计算相隔天数" bordered={false}>
                                        <Form layout="inline" style={{ textAlign: 'center', marginTop: 10 }}>
                                            <FormItem>
                                                <RangePicker onChange={this.changeApart.bind(this)} />
                                            </FormItem>
                                        </Form>
                                        <div style={{ textAlign: 'center', marginTop: 10 }} > 相隔天数<span style={{ backgroundColor: '#87d068', display: 'inline-block', minWidth: 30, textAlign: 'center', padding: 6, margin: '0 10px', borderRadius: 15, color: 'white' }} >{this.state.apartDay}</span></div>
                                    </Card>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <Card title="日期推算" bordered={false}>
                                        <Form>
                                            <FormItem
                                                {...formItemLayout}
                                                label="推算方式"
                                                hasFeedback
                                            >
                                                <RadioGroup onChange={this.changeReckonType.bind(this)} defaultValue="0">
                                                    <RadioButton value="0">过去</RadioButton>
                                                    <RadioButton value="1">将来</RadioButton>
                                                </RadioGroup>
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="推算天数"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('reckonDay', {
                                                    initialValue: 0,
                                                    rules: [{
                                                        required: true, message: '请输入推算天数!',
                                                    }],
                                                })(
                                                    <InputNumber min={1} onChange={this.changeReckonDay.bind(this)} />
                                                    )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="推算日期"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('reckonDate', {
                                                    initialValue: reckonDate,
                                                    rules: [{
                                                        required: true, message: '请选择推算日期!',
                                                    }],
                                                })(
                                                    <DatePicker onChange={this.changeReckonDate.bind(this)} />
                                                    )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="推算结果"
                                                hasFeedback
                                            >
                                                {reckonResult}
                                            </FormItem>
                                        </Form>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Created by lincmin</Footer>
                </Layout>
            </div>
        );
    }
}
const DateCalculatorForm = Form.create()(DateCalculator);
ReactDOM.render(<DateCalculatorForm />, document.getElementById('root'));
