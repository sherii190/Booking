import { Form, Input, Button, Typography, Space } from 'antd';
import { useMutation } from 'react-query';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

    const navigate = useNavigate();

    const { mutate: submitLogin, isLoading, isError, error } = useMutation(async (loginForm) => {
        return api({
            method: 'post',
            uri: '/auth',
            data: loginForm
        }).then((res: any) => {
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem("token", res.token);
            window.location.href = ("/");
        })
    });

    const onFinish = (values: any) => {
        console.log('Received values:', values);
        submitLogin(values)
    };

    return (
        <>
            <Typography.Title level={1}>Login</Typography.Title>
            <Form name="login" onFinish={onFinish}>
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
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            Log in
                        </Button>
                        <a onClick={e => navigate("/Register")}>Don't have an account?</a>
                    </Space>
                </Form.Item>

            </Form>
        </>
    );
}