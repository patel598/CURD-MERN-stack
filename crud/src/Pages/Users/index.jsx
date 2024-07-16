import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import BaseUrl, { GET_USER_LIST } from '../../API/BaseUrl';
import SelectCom from '../../components/Select';
import ToastMessage from '../../Utils/Toaster';

const UserList = () => {
    const [userList, setUserList] = useState([])
    const columns = [
        {
            name: 'Name',
            selector: row => row?.fullName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row?.email,
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: row => row?.createdAt,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row =>
                <div className="">
                    <SelectCom isActive={row?.isActive} id={row?._id} />
                </div>,
            sortable: true,
        },
    ];



    const getUserList = async () => {
        try {
            const { data } = await BaseUrl.get(GET_USER_LIST)
            if (data?.status) {
                setUserList(data?.data)
            } else {

                ToastMessage("error", data?.message)
                setUserList([])
            }
        } catch (error) {
            ToastMessage("error", error?.response?.data?.message)
            setUserList([])

        }
    }

    useEffect(() => {
        getUserList()
    }, [])
    return (
        <div>
            <DataTable
                columns={columns}
                data={userList}
            />
        </div>
    )
}

export default UserList