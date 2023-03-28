import './ReservationsPage.css';
import { Form, Input, Button, Typography, Space, Select, Spin, Alert, Pagination } from 'antd';
import moment from 'moment';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { useState, useEffect } from 'react';
import { ReservationRow } from './ReservationRow';
import Swal from 'sweetalert2';

export const ReservationsPage = () => {

    const [records, setRecords] = useState<any>({});
    const [cleaners, setCleaners] = useState<any[]>([]);
    const [bulkSelected, setBulkSelected] = useState<any[]>([]);

    const user = JSON.parse(localStorage.getItem("user") || "")

    const navigate = useNavigate();

    const { mutate: getReservations, isLoading } = useMutation(async (page: number) => {
        return api({
            uri: `/bookings?page=${(page || 1)}`
        }).then((res: any) => {
            setRecords(res)
        })
    });

    const { mutate: getUsers } = useMutation(async () => {
        return api({
            uri: `/users?type=Cleaner`
        }).then((res: any) => {
            setCleaners(res);
        })
    });

    useEffect(() => {
        getReservations(1)
        getUsers();
    }, []);

    const onFinish = (values: any) => {
        console.log('Received values:', values);
        // submitLogin(values)
    };

    const onBookingDelete = (_id: string, index: number) => {
        let bks = records.bookings.slice();
        bks.splice(index, 1);
        setRecords({
            ...records,
            bookings: bks
        })
    }

    const onBulkCheck = (checked: boolean, _id: string) => {
        let arr = bulkSelected.slice();
        if (checked) {
            arr.push(_id);
        } else {
            let index = arr.findIndex(a => a == _id);
            if (index > -1) {
                arr.splice(index, 1);
            }
        }
        setBulkSelected([
            ...arr,
        ])
        console.log(bulkSelected)
    }

    const { mutate: bulkDelete } = useMutation(async (bookingIds: any[]) => {
        return api({
            method: 'post',
            uri: `/bookings/bulk-delete`,
            successMessage: `All selected reservations are deleted!`,
            data: {
                bookingIds: bookingIds
            },
        }).then((res: any) => {
            let record = records.bookings.slice();
            bulkSelected.forEach(id => {
                let index = record.findIndex((i: any) => i._id == id)
                if (index > -1) record.splice(index, 1);
            })
            setRecords({
                ...records,
                bookings: record
            })
            setBulkSelected([]);
        })
    });
    const deleteSelected = () => {
        Swal.fire({
            title: `Are you sure you want to delete all selected reservations?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            denyButtonText: `No, cancel it!`,
        }).then(confirmed => {
            if (confirmed) {
                bulkDelete(bulkSelected.slice());
            }
        });
    }

    console.log(records?.bookings, "asdfasdf");

    let title = "My Reservations";
    if (user.type == "Admin") title = "All Reservations";
    else if (user.type == "Cleaner") title = "My Assigned Reservations";

    return (
        <>
            <Typography.Title level={1}>{title}</Typography.Title>

            {user.type == "Customer" &&
                <>
                    <Button onClick={e => navigate("/Booking")}>
                        Book New Reservation
                    </Button>
                    &nbsp;
                </>
            }
            {!!bulkSelected?.length &&
                <>
                    <Button onClick={deleteSelected}>DELETE SELECTED</Button>
                </>
            }

            {isLoading &&
                <Spin tip="Loading...">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin>
            }

            <br /><br />
            <table>
                <thead>
                    <tr>
                        <th>Sr.</th>
                        {user.type == "Admin" &&
                            <>
                                <th>Customer</th>
                            </>
                        }
                        <th>Dated</th>
                        <th>Time</th>
                        <th>Level</th>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {records && records.bookings && records.bookings.map((row: any, i: number) => (
                        <ReservationRow booking={row} onDelete={onBookingDelete} onBulkCheck={onBulkCheck} bulkSelected={bulkSelected} cleaners={cleaners} i={i} key={row._id}></ReservationRow>
                    ))}
                </tbody>
            </table>

            <Pagination defaultCurrent={records?.page ? +records?.page : 1} total={+records?.total} onChange={(page) => getReservations(page)} />
        </>
    );
}