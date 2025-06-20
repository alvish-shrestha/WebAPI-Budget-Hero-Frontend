import React from 'react'
import { useAdminUser } from "../../hooks/admin/useAdminUser";

export default function UserTable() {
    const { data, isPending, error } = useAdminUser();

    if (isPending) return <>Loading.....</>;
    if (error) return <>Error loading users</>;

    const EmailComponent = () => {
        return (
            <div className='text-blue-600'>
                {data && data.data?.map((user, index) => (
                    <div key={index}>{user?.email}</div>
                ))}
            </div>
        );
    };

    return (
        <div>
            UserTable
            <div className="text-green-600 font-bold">UserTable</div>
            {data && data.data?.map((user, index) => (
                <div key={index} className="text-purple-600">
                    {user?.username}
                </div>
            ))}

            <EmailComponent />
        </div>
    );
}