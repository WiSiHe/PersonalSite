interface Drawer {
  children: React.ReactNode
}

const Drawer = ({ children }: Drawer) => {
  return <div className="flex flex-col">{children}</div>
}

export default Drawer
