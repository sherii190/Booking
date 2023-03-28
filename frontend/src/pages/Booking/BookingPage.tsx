import { Form, Input, Button, Typography, Space, Select } from 'antd';
import moment from 'moment';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';

export const BookingPage = () => {

    const navigate = useNavigate();

    const { mutate: submitLogin, isLoading, isError, error } = useMutation(async (formData) => {
        return api({
            method: 'post',
            uri: '/bookings',
            data: formData,
            successMessage: `New reservation is submitted successfully!`

        }).then((res: any) => {
            navigate("/Reservations");
        })
    });

    const onFinish = (values: any) => {
        console.log('Received values:', values);
        submitLogin(values)
    };

    return (
        <>
            <Typography.Title level={1}>Book New Reservation</Typography.Title>
            <Form name="login" onFinish={onFinish}>



                <Form.Item
                    name="dated"
                    rules={[{ required: true, message: 'Please input your date!' }]}
                >
                    <Input placeholder="Date" min={moment().format("YYYY-MM-DD")} type="date" />
                </Form.Item>
                
                <Form.Item
                    name="time"
                    rules={[{ required: true, message: 'Please input your time!' }]}
                >
                    <Input placeholder="Time" min={moment().format("YYYY-MM-DD")} type="time" />
                </Form.Item>


                <Form.Item
                    name="level"
                    rules={[{ required: true, message: 'Please select this option!' }]}
                >
                    <Select
                        defaultValue=""
                        options={[
                            { value: '', label: '-- Select service --' },
                            { value: 'Allmänt', label: 'Allmänt' },
                            { value: 'Vardagsrummet', label: 'Vardagsrummet' },
                            { value: 'Köket', label: 'Köket' },
                            { value: 'Sovrum', label: 'Sovrum' },
                            { value: 'Fönsterputtsning', label: 'Fönsterputtsning' },
                            { value: 'Flyttstädning', label: 'Flyttstädning' },
                        ]}
                    />
                </Form.Item>


                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            SUBMIT
                        </Button>
                    </Space>
                </Form.Item>

            </Form>
        </>
    );
}