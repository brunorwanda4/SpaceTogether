interface props {
    children: React.ReactNode;
}

const layout = ({children} : props) => {
  return (
    <section className=" pt-12">
      {children}
    </section>
  )
}

export default layout
