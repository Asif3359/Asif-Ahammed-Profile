'use client'
import { useState } from 'react';
import { toast } from 'react-toastify';
const HandleDelete = ({ item, setEmailMessage, emailMessage }) => {
    const [isDelete, setDelete] = useState(false);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://asif-server-site.vercel.app/messages/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
            });
            if (response.ok) {
                // alert("Delete Successfully");
                toast.success('Delete Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                const remaining = emailMessage.filter(item => item._id !== id);
                setEmailMessage(remaining);
                setDelete(true)
            }
            else {
                toast.error('Something Error ', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };




    return (
        <>

            {
                isDelete ?
                    <>
                        <button className="btn btn-sm bg-white hover:border-white hover:bg-white border-white  text-black ">Deleted</button>
                    </>
                    :
                    <>
                        <button onClick={() => handleDelete(item._id)} className="btn btn-sm bg-black hover:bg-white border-white hover:border-black text-white hover:text-black">Delete</button>
                    </>
            }
        </>




    );
};

export default HandleDelete;