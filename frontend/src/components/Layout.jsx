import Navigation from "./Navigation";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 dark:bg-gray-950 text-white p-4 text-center transition-colors duration-200">
        © 2025 FocusFlow
      </footer>
    </div>
  );
}

export default Layout;