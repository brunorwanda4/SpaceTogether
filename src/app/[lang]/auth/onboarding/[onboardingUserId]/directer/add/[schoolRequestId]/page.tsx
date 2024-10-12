interface props {
    params : {
        schoolRequestId : string,
    }
}
const SchoolRequestIdPage = ({
    params : {schoolRequestId : reqId}
} : props) => {
  return (
    <div>
      school request id page : {reqId}
    </div>
  )
}

export default SchoolRequestIdPage
