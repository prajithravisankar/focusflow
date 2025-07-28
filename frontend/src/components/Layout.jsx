function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">FocusFlow</header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 FocusFlow
      </footer>
    </div>
  );
}

export default Layout;