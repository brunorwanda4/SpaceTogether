"use client";

import { IoSettingsOutline } from "react-icons/io5";
import { MyAlertDialog } from "../ui/my-components";
import { invoke } from "@tauri-apps/api/tauri";
import { t_get_user } from "@/types/user";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

export const SchoolRequestSetting = () => {
    return (
        <MyAlertDialog 
            icon={<div><IoSettingsOutline size={20}/></div>} 
            classname="btn btn-sm btn-ghost"
        >
            Hello bruno
        </MyAlertDialog>
    )
}

export const GetUserByIdForm = () => {
    const [userId, setUserId] = useState<string>('');
    const [userResult, setUserResult] = useState<t_get_user | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userId.trim() === '') {
            setUserResult(null);
            return;
        }

        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Invoke the Tauri command
                const result = await invoke<t_get_user>('api_user_data_get', { id: userId });
                setUserResult(result);
            } catch (err) {
                setError(`Failed to fetch user data: ${(err as Error).message}`);
                setUserResult(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]); // This effect runs whenever userId changes

    return (
        <div>
            <h1>Get User Data</h1>
            <Input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
            />
            <button className="btn btn-primary mt-2" onClick={() => {}} disabled={loading || userId.trim() === ''}>
                {loading ? 'Loading...' : 'Fetch User Data'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userResult && (
                <div>
                    {userResult.success ? (
                        <div>
                            <h2>User Information:</h2>
                            <p>Name: {userResult.user?.name}</p>
                            <p>Email: {userResult.user?.email}</p>
                            <p>Phone: {userResult.user?.phone_number}</p>
                            {/* Add more fields as needed */}
                        </div>
                    ) : (
                        <p style={{ color: 'red' }}>Error: {userResult.error}</p>
                    )}
                </div>
            )}
        </div>
    );
};
