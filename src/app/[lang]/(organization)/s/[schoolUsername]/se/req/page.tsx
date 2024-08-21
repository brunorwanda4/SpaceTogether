import SchoolNotFount from "@/components/error/schoolNotFount";
import { SchoolRequestSetting } from "@/components/forms";
import SchoolSettingRequestsSearch from "@/components/forms/search/schoolSettingRequestsSearch"
import { getSchoolRequest } from "@/data/getSchool";
import { Locale } from "@/i18n";
import { getSchoolByUsername } from "@/server/getData";
import { BsClipboardPlus } from "react-icons/bs"

interface props {
    params : {lang : Locale , schoolUsername : string}
}

const SchoolRequestSettingPage = async ({
    params : {lang , schoolUsername}
} : props) => {

    const school = await getSchoolByUsername(schoolUsername);

    if (!school) return (
        <SchoolNotFount lang={lang} schoolUsername={schoolUsername}/>
    )

    const requests = await getSchoolRequest(school._id);
    return (
        <div>
            <div className=" flex gap-2 items-center w-full justify-between">
                <div className=" flex gap-2 items-center">
                    <BsClipboardPlus size={40}/>
                    <h2 className=" text-2xl font-bold">Request </h2>
                </div>
                <div>
                    <SchoolRequestSetting/>
                </div>
            </div>
            <div className=" mt-2">
                <SchoolSettingRequestsSearch />
            </div>
            <div className=" px-2 mt-1 flex gap-2">
                <span className=" font-semibold">{requests?.length}</span> 
                <span>Request for team 1</span>
            </div>

            <div>
                
            </div>
        </div> 
    )
}

export default SchoolRequestSettingPage