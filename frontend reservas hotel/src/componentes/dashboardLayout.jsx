import SideBarDash from "./dashboardsidebar"

function DashboardLayout({ children }) {
  return (
    <>
      <SideBarDash />
      {children}
    </>
  )
}

export default DashboardLayout