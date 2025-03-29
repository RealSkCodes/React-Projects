import HamburgerMenuProvider from "./HamburgerMenuProvider.jsx";
import JobSidebarToggleProvider from "./JobSidebarToggleProvider.jsx";
import AuthProvider from "./AuthProvider.jsx";
import JobsDataProvider from "./JobsDataProvider.jsx";

const AppContextsProvider = ({ children }) => {
  return (
    <AuthProvider>
      <JobsDataProvider>
        <HamburgerMenuProvider>
          <JobSidebarToggleProvider>{children}</JobSidebarToggleProvider>
        </HamburgerMenuProvider>
      </JobsDataProvider>
    </AuthProvider>
  );
};

export default AppContextsProvider;
