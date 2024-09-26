"use client";

import { IoSettingsOutline } from "react-icons/io5";
import { MyAlertDialog } from "../ui/my-components";
import { invoke } from "@tauri-apps/api/tauri";
import { t_get_user } from "@/types/user";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { MyImage } from "../style/myImage";
import Link from "next/link";

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
    const [userId, setUserId] = useState<string>('66e94543563df23a608a71e0');
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

    const profile_image = () => {
        const image = userResult?.user?.image;

        if (Array.isArray(image)) {
            return image[image.length - 1]?.src
            // if image is an array
        } else if (typeof image === "string") {
            return image
        } else {
            return "/1.jpg"
        }
    }

    return (
        <div>
            <h1>Get User Data</h1>
            <Input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                className=" max-w-96"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userResult && (
                <div>
                    {userResult.success ? (
                        <div className=" card">
                            <h2 className=" card-title">User Information:</h2>
                            <div className=" card-body">
                                <MyImage className=" w-full" classname=" object-contain" src={profile_image()} />
                                <p>Name: {userResult.user?.name}</p>
                                <p>Email: {userResult.user?.email}</p>
                                <p className=" card-actions">Phone: {userResult.user?.phone_number}</p>
                            </div>
                            <Link className=" btn btn-primary" href={`/auth/onboarding/${userResult.user?.id}`}>Up date user </Link>
                            {/* Add more fields as needed */}
                        </div>
                    ) : (
                        <p style={{ color: 'red' }} className=" max-w-96">Error: {userResult.error}</p>
                    )}
                </div>
            )}
        </div>
    );
};
