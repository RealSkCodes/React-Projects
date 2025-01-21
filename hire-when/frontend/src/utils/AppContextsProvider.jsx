import JobsDataProvider from "./JobsDataProvider.jsx"
import HamburgerMenuProvider from "./HamburgerMenuProvider.jsx"
import JobSidebarToggleProvider from "./JobSidebarToggleProvider.jsx"

const AppContextsProvider = ({ children }) => {
  return (
    <JobsDataProvider>
      <HamburgerMenuProvider>
        <JobSidebarToggleProvider>{children}</JobSidebarToggleProvider>
      </HamburgerMenuProvider>
    </JobsDataProvider>
  )
}

export default AppContextsProvider
