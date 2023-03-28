import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, Checkbox, Select } from 'antd';
import { useMutation } from 'react-query';
import { api } from '../../api/api';
import Swal from 'sweetalert2';

interface ReservationRowProps {

    booking: any, i: number,
    cleaners: any[], onDelete: any,
    onBulkCheck: any, bulkSelected: any
}

export const ReservationRow: React.FC<ReservationRowProps> = ({ booking, i,
    cleaners, onDelete,
    onBulkCheck, bulkSelected }) => {

    const [mBooking, setBooking] = useState<any>();
    useEffect(() => {
        setBooking(mBooking || booking);
        console.log(booking, "asdfasdf")
    }, [mBooking])


    const user = JSON.parse(localStorage.getItem("user") || "")
    const isAdmin = user.type == "Admin";
    const selectedValue = booking.cleaners.map((c: any) => c._id);

    const { mutate: assignBooking } = useMutation(async (formData: any) => {
        return api({
            method: 'post',
            uri: `/bookings/${formData.bookingId}/assign`,
            data: {
                assignees: formData.assignees
            }
        }).then((res: any) => {
            console.log(res);
            bookingAssigned(res);
        })
    });
    const onSelect = (selectedList: any, selectedItem: any) => {
        console.log(selectedList);
        assignBooking({ bookingId: booking._id, assignees: selectedList });
    }

    var bookingAssigned = (res: any) => {
        setBooking({ ...mBooking, status: "Assigned" });
        Swal.fire({
            title: res.message,
            icon: 'success'
        })
    }


    const { mutate: deleteReservation } = useMutation(async (id: any) => {
        return api({
            method: 'delete',
            uri: `/bookings/${id}`,
            successMessage: `Reservation is deleted successfully!`
        }).then((res: any) => {
            onDelete(mBooking._id, i)
        })
    });
    const deleteBooking = () => {
        Swal.fire({
            title: 'Are you sure you want to delete this booking?',
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            denyButtonText: `No, cancel it!`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteReservation(mBooking._id)
            }
        })
    }

    const { mutate: markReservationDeliver } = useMutation(async (bookingId: any) => {
        return api({
            method: 'post',
            uri: `/bookings/${bookingId}/deliver`,
            successMessage: `Booking is marked as delivered!`
        }).then((res: any) => {
            setBooking({
                ...mBooking,
                status: 'Delivered'
            })
        })
    });
    const markBookingDeliveringDone = () => {
        if (["Delivered", "Completed"].includes(mBooking.status)) {
            Swal.fire({
                title: `This booking is already ${mBooking.status}!`,
                icon: "warning",
            })
            return;
        }
        Swal.fire({
            title: `Are you sure you want to mark this booking as cleaning done?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            denyButtonText: `No, cancel it!`,
        }).then(confirmed => {
            if (confirmed.isConfirmed) {
                markReservationDeliver(mBooking._id)
            }
        })
    }


    const { mutate: approveReservation } = useMutation(async (bookingId: any) => {
        return api({
            method: 'post',
            uri: `/bookings/${bookingId}/approve`,
            successMessage: `Booking is marked as approved!`
        }).then((res: any) => {
            setBooking({
                ...mBooking,
                status: 'Completed'
            })
        })
    });
    const approveBooking = () => {
        if (mBooking.status == "Completed") {
            Swal.fire({
                title: `This booking is already approved!`,
                icon: "warning",
            })
            return;
        }
        Swal.fire({
            title: `Are you sure you want to approve this booking delivery?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            denyButtonText: `No, cancel it!`,
        }).then(confirmed => {
            if (confirmed.isConfirmed) {
                approveReservation(mBooking._id)
            }
        })
    }


    const { mutate: rejectReservation } = useMutation(async (bookingId: any) => {
        return api({
            method: 'post',
            uri: `/bookings/${bookingId}/reject`,
            successMessage: `This booking is already rejected!`
        }).then((res: any) => {
            setBooking({
                ...mBooking,
                status: 'Rejected'
            })
        })
    });
    const rejectBooking = () => {
        

        Swal.fire({
            title: `Are you sure you want to reject this booking delivery?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            denyButtonText: `No, cancel it!`,
        }).then(confirmed => {
            if (confirmed) {
                rejectReservation(mBooking._id)
            }
        })
    }




    return (
        <>
            {mBooking &&
                <>
                    <tr key={mBooking._id}>
                        <td>
                            {1 + i}&nbsp;
                            {user.type == "Customer" &&
                                <>
                                    <Checkbox onChange={e => onBulkCheck(e.target.checked, mBooking._id)} checked={bulkSelected?.includes(mBooking._id)}></Checkbox>
                                </>
                            }
                        </td>
                        {user.type == "Admin" &&
                            <>
                                <td>{mBooking.customer?.firstName} {mBooking.customer?.lastName || ''}</td>
                            </>
                        }
                        <td>{moment(mBooking.dated).format("DD MMM, YYYY")}</td>
                        <td>{mBooking.time}</td>
                        <td>{mBooking.level}</td>
                        <td>
                            <Select
                                style={{ width: "100%" }}
                                mode="multiple"
                                placeholder={isAdmin ? 'Select' : (mBooking.cleaners?.length ? '' : 'Admin will assign soon')}
                                disabled={!isAdmin}
                                maxTagCount={5}
                                onChange={onSelect}
                                options={cleaners.map(cleaner => {
                                    return { label: cleaner.firstName, value: cleaner._id }
                                })}
                                defaultValue={selectedValue}
                            ></Select>
                        </td>
                        <td>{mBooking.status}</td>
                        <td>
                            {/* Operations Column */}
                            {user.type == "Customer" &&
                                <>
                                    {mBooking.status == "Delivered" &&
                                        <>
                                            <Button color='primary' onClick={approveBooking}>Approve</Button>
                                            &nbsp;
                                            <Button color='secondary' onClick={rejectBooking}>Reject</Button>
                                            &nbsp;
                                        </>
                                    }
                                    <Button color='primary' onClick={deleteBooking}>
                                        Delete
                                    </Button>
                                </>
                            }

                            {user.type == "Cleaner" &&
                                <>
                                    <Button color='success' onClick={markBookingDeliveringDone}>Deliver</Button>
                                </>
                            }
                        </td>
                    </tr>
                </>
            }
        </>
    );
};