import JobsDataProvider from "./JobsDataProvider.jsx"
import HamburgerMenuProvider from "./HamburgerMenuProvider.jsx"

const AppContextsProvider = ({ children }) => {
  return (
    <JobsDataProvider>
      <HamburgerMenuProvider>{children}</HamburgerMenuProvider>
    </JobsDataProvider>
  )
}

export default AppContextsProvider
