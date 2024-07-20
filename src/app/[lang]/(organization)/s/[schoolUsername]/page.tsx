import { getSchoolByUsername } from '@/server/getData'
import React from 'react'

interface Props {
    params : {
        schoolUsername : string
        lang : string
    }

}

const SchoolUsernamePage =async ({
    params : { schoolUsername, lang}
} : Props) => {
  const school = await getSchoolByUsername(schoolUsername);

  if(!school) {
    return (
      <div>
        School user name page : {schoolUsername}
      </div>
    )
    
  }
  return (
    <div>
      School user name page : 
      {school ? "they are school 🌳" : "they are not ❤️"}
    </div>
  )
}

export default SchoolUsernamePage
