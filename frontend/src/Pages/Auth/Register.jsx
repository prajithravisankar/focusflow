function Register() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form>
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;