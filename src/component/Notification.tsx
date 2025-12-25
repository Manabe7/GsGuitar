import {useState, useEffect, useRef} from 'react'
import { MdOutlineNotificationImportant } from "react-icons/md";
import { MdOutlineNotifications } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


interface NotificationItem {
    id: number;
    message: string;
    time: string;
    read: boolean;
}

const Notification = () => {
    const [haveNoti, setHaveNoti] = useState(true);
    const [isClick, setIsClick] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    
    // Sample notifications data
    const [notifications] = useState<NotificationItem[]>([
        {
            id: 1,
            message: "Your order for Gibson Les Paul has been shipped!",
            time: "2 hours ago",
            read: false
        },
        {
            id: 2,
            message: "New guitar course 'Advanced Fingerpicking' is now available",
            time: "1 day ago",
            read: false
        },
        {
            id: 3,
            message: "Limited time offer: 20% off on all accessories",
            time: "3 days ago",
            read: true
        }
    ]);

    const showNoti = () => {
        setIsClick(!isClick);
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsClick(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const unreadCount = notifications.filter(noti => !noti.read).length;
    
    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                className='group/button relative inline-flex items-center justify-center overflow-hidden rounded-md border border-red-500 px-4 py-1.5 text-xm font-normal text-red-500 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-white-500/30 cursor-pointer'
                onClick={showNoti} > 
                    {unreadCount > 0 ?  
                        <MdOutlineNotificationImportant />
                        :
                        <MdOutlineNotifications />
                    }
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20" />
                </div>
            </button>
            
            {isClick && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((noti) => (
                                <div 
                                    key={noti.id} 
                                    className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                                        !noti.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                    }`}
                                    onClick={() => {noti.read = true}}
                                >
                                    <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">
                                        {noti.message}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {noti.time}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                No notifications
                            </div>
                        )}
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                        <button className="w-full text-center text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                        onClick={()=> {navigate('/AllNoti')}}>
                            View all notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Notification
