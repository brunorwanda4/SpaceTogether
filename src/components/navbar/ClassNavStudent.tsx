"use client";
import SchoolUsernamePage from "@/app/[lang]/(organization)/s/[schoolUsername]/(schoolUsernameOriganization)/page";
import ClassStudentPage from "@/app/[lang]/(organization)/s/[schoolUsername]/(schoolUsernameOriganization)/[classUsername]/stu/page";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { ISchool } from "@/types/school"
import { TUser } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsHandIndex, BsHandIndexFill, BsLayers, BsLayersFill, BsLightning, BsLightningFill, BsPeople, BsPeopleFill, BsTable, BsTabletFill } from "react-icons/bs";
import StudentClassExercisePage from "../page/school/class/student/studentClassExercisePage";
import StudentClassTimeTablePage from "../page/school/class/student/StudentClassTimeTablePage";
import SchoolClassStudentPage from "../page/school/class/student/schoolClasshomePage";
import StudentClassHomeworkPage from "../page/school/class/student/studentClassHomeworkPage";
import StudentClassStudentPage from "../page/school/class/student/studentClassStudentPage";
import StudentClassTeachersPage from "../page/school/class/student/studentClassTeachersPage";

interface props {
    school : ISchool;
    lang : Locale;
    schoolUsername : string;
}

type TClassStudentPage="class"|"exercises" | "homeworks" | "students" | "teachers" | "timeTable";

const ClassNavStudent = ({
    school , lang , schoolUsername
} : props) => {
    const [choose , setChoose] = useState<TClassStudentPage>(() => {
      const params = new URLSearchParams(window.location.search);
      return (params.get("page")as TClassStudentPage) || "class";
    });

    useEffect(() =>  {
      const params = new URLSearchParams(window.location.search);
      params.set("page", choose);
      window.history.replaceState({}, "" , `${window.location.pathname}?${params}`)
    }, [choose]);

    const handleStudentChangePage = (choose : TClassStudentPage) => {
      setChoose(choose);
    };

    // choose page

    const renderContent = () => {
      switch (choose) {
        case "class" : return <SchoolClassStudentPage />
        case "exercises" : return <StudentClassExercisePage />
        case "homeworks" : return <StudentClassHomeworkPage />
        case "students" : return <StudentClassStudentPage />
        case "teachers" : return <StudentClassTeachersPage />
        case "timeTable" : return <StudentClassTimeTablePage />
        default : return <SchoolClassStudentPage/>
      }
    }

    const pathname = usePathname();
    const schoolPath = `/${lang}/s/${school.username}`
  return (
    <div>
      <div className=" p-2 w-full flex gap-2">
        <button className={cn("btn btn-sm btn-ghost" , choose === "class" && " text-info")} onClick={() => handleStudentChangePage("class")}>
          {choose === "class" ? <BsLayersFill size={20} /> : <BsLayers size={20} />} 
          class
        </button>

        <button className={cn("btn btn-sm btn-ghost" , choose === "exercises" && " text-info")} onClick={() => handleStudentChangePage("exercises")}>
          {choose === "exercises" || pathname === `${schoolPath}/#ex`  ? <BsLightningFill size={20} /> : <BsLightning size={20} />} 
          Exercises
        </button>
        
        <button className={cn("btn btn-sm btn-ghost" , choose === "homeworks" && " text-info")} onClick={() => handleStudentChangePage("homeworks")}>
          {choose === "homeworks" ? <BsHandIndexFill size={20} /> : <BsHandIndex size={20} />} 
          Homeworks
        </button>
        
        <button className={cn("btn btn-sm btn-ghost" , choose === "students" && " text-info")} onClick={() => handleStudentChangePage("students")}>
          {choose === "students" ? <BsPeopleFill size={20} /> : <BsPeople size={20} />} 
          Students
        </button>
        
        <button className={cn("btn btn-sm btn-ghost" , choose === "teachers" && " text-info")} onClick={() => handleStudentChangePage("teachers")}>
          {choose === "teachers" ? <BsPeopleFill size={20} /> : <BsPeople size={20} />} 
          Teachers
        </button>
        <button className={cn("btn btn-sm btn-ghost" , choose === "timeTable" && " text-info")} onClick={() => handleStudentChangePage("timeTable")}>
          {choose === "timeTable" ? <BsTable size={20} /> : <BsTable size={20} />} 
          Time table
        </button>
      </div>
      <div className=" h-full">
        {renderContent()}
      </div>
    </div>
  )
}

export default ClassNavStudent
