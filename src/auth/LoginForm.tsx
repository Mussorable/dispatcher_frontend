function LoginForm() {
  
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-blue-200">
        <div className="bg-blue-100 p-8 rounded-lg shadow-xl w-96">
          {/* --- */}
          <h2 className="text-3xl font-bold text-center mb-6 uppercase">Login</h2>
          {/* --- */}
          <form action="">
            <div className="flex mb-4 justify-center items-center gap-2">
              <label className="w-24 text-gray-700 font-semibold" htmlFor="input-1">Username:</label>
              <input className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-gray-100 transition duration-150" id="input-1" type="text" />
            </div>
            <div className="flex mb-8 justify-center items-center gap-2">
              <label className="w-24 text-gray-700 font-semibold" htmlFor="input-2">Password:</label>
              <input className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-black-100 transition duration-150" id="input-2" type="text" />
            </div>
            <button className="block mx-auto w-2/3 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors" type="submit">Submit</button>
          </form>
          {/* --- */}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;