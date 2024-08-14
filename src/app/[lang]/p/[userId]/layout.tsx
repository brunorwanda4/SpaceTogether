interface props {
    children : React.ReactNode;
}

const ProfileLayout = ({children} : props) => {
  return (
    <section className=' pt-12'>
      {children}
    </section>
  )
}

export default ProfileLayout
