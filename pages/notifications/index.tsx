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
                setNotifications(json.data);
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
    
    return (
        <>
            <Headerr />
            <div className="pt-10 px-48">
                <h1>Your Notifications</h1>
                {loading ? (<div>Loading ...</div>) : (
                    <div>
                        {
                            notifications.map((noti) => {
                                return (<div key={noti.id} className="p-2 m-2">
                                    {
                                        (noti.status === NotificationStatus.READ) ? 
                                        (<>
                                            <span className="bg-slate-200 p-2 m-2">{noti.message}</span>
                                            <button className="bg-slate-300" onClick={()=>setNotiStatus(noti.id, NotificationStatus.UNREAD)}>mark as unread</button>
                                        </>):
                                        (<>
                                            <span className="bg-red-500 p-2 m-2">{noti.message}</span>
                                            <button className="bg-slate-300" onClick={()=>setNotiStatus(noti.id, NotificationStatus.READ)}>mark as read ✔️</button> 
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

