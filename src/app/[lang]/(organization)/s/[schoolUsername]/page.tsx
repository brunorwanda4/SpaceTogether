import React from 'react'

interface Props {
    params : {
        schoolUsername : string
        lang : string
    }

}

const SchoolUsernamePage = ({
    params : { schoolUsername, lang}
} : Props) => {
  return (
    <div>
      School user name page
    </div>
  )
}

export default SchoolUsernamePage
