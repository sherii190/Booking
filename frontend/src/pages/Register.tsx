import { Form, Input, Button, Typography, Space, Select } from 'antd';
import { useMutation } from 'react-query';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const RegisterPage = () => {

    const navigate = useNavigate();

    const { mutate: submitLogin, isLoading, isError, error } = useMutation(async (formData) => {
        return api({
            method: 'post',
            uri: '/users',
            data: formData
        }).then((res: any) => {
            console.log(res);
            Swal.fire({
                title: `Your account is registered!`,
                text: `Please login to continue`,
                icon: 'success'
            }).then(() => {
                navigate("/Login")
            })
        })
    });

    const onFinish = (values: any) => {
        console.log('Received values:', values);
        submitLogin(values)
    };

    return (
        <>
            <Typography.Title level={1}>Register an account</Typography.Title>
            <Form name="login" onFinish={onFinish}>



                <Form.Item
                    name="type"
                    rules={[{ required: true, message: 'Please select this option!' }]}
                >
                    <Select
                        defaultValue=""
                        options={[
                            { value: '', label: '-- Register as --' },
                            { value: 'Cleaner', label: 'Cleaner' },
                            { value: 'Customer', label: 'Customer' },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input placeholder="First Name" />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input placeholder="Last Name" />
                </Form.Item>

                <Form.Item
                    name="userName"
                    rules={[{ required: true, message: 'Please input your user name!' }]}
                >
                    <Input placeholder="User Name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input placeholder="Password" type='password' />
                </Form.Item>



                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            Register
                        </Button>
                        <a onClick={e => navigate("/Login")}>Already have an account?</a>
                    </Space>
                </Form.Item>

            </Form>
        </>
    );
}