"use client"

import Phase2 from "./phase-2/page";
import ProfileAndTimeline from "./profileAndBasic";



export default function Profile() {
    return (
        <>
            <div className="bg-red-00 p-3 flex">
                <div className="flex w-[100%] rounded-lg flex flex-col">
                    {/* <EmployeeProfile employeeId="2"/> */}
                    <ProfileAndTimeline />
                    <Phase2 />
                </div>
            </div>
        </>
    )
}