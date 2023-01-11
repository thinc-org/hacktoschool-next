import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../component/headerr";
import { NotificationStatus } from "../shared/notificationCodes";

const Notification: React.FC = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchNotifications = async () => {
        const userId = parseInt(localStorage.getItem('id'));
        const userRole = localStorage.getItem('role');

        const body = {
            userRole: userRole,
            userId: userId,
        };

        try {
            const response = await fetch("/api/notification", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const json = await response.json();
            if (response.ok){
                setNotifications(json.data.reverse());
            }
        } catch (error) {
            // setError(error);
        } finally {
            setLoading(false);
            // console.log(loading);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, []);
    
    const setNotiStatus = async (notificationId, notificationStatus) => {
        const body = {
            notificationStatus: notificationStatus
        };
        
        try {
            const response = await fetch(`/api/notification/${notificationId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const json = await response.json();
            if (response.status === 200) {
                fetchNotifications();
            }
        } catch (error) {
            // setError(error);
        } finally {
            // console.log(loading);
        }
    }
    
    const notiClickHandler = async ({id, status, courseId}) => {

        if (status === NotificationStatus.READ)
        {
            Router.push(`/courses/instructor_view/${courseId}`)
            return;
        }

        const body = {
            notificationStatus: NotificationStatus.READ
        };
        
        try {
            const response = await fetch(`/api/notification/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const json = await response.json();
            if (response.status === 200) {
                Router.push(`/courses/instructor_view/${courseId}`)
            }
        } catch (error) {
            // setError(error);
        } finally {
            // console.log(loading);
        }
    }

    return (
        <>
            <Headerr />
            <div className="pt-10 px-48">
                <h1>Your Notifications</h1>
                {loading ? (<div>Loading ...</div>) : (
                    <div>
                        {
                            notifications.map((noti) => {
                                return (<div key={noti.id} className="p-2 m2 hover:bg-sky-400">
                                    {
                                        (noti.status === NotificationStatus.READ) ? 
                                        (<>
                                            <button onClick={() => notiClickHandler(noti)}><p className="bg-slate-200 p-2 m-2 text-slate-400 hover:scale-105 hover:bg-slate-300">{noti.message}</p></button>
                                            <button className="bg-slate-100 p-2 text-slate-300 hover:scale-105" onClick={()=>setNotiStatus(noti.id, NotificationStatus.UNREAD)}><p>mark as unread</p></button>
                                        </>):
                                        (<>
                                            <button onClick={() => notiClickHandler(noti)}><p className="bg-slate-300 p-2 m-2 text-red-600">{noti.message}</p></button>
                                            <button className="bg-slate-200 p-2 text-slate-500 hover:scale-105" onClick={()=>setNotiStatus(noti.id, NotificationStatus.READ)}><p>mark as read ✔️</p></button> 
                                            </>)
                                        }
                                </div>)
                            })
                        }
                    </div>
                )}
            </div>
        </>
    );
}

export default Notification;

