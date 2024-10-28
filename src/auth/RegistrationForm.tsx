import { Link } from "react-router-dom";

function RegistrationForm() {
  return(
    <>
      <form action="">
        <div className="flex mb-4 justify-center items-center gap-2">
          <label className="w-44 text-right text-gray-700 font-semibold" htmlFor="email">Email:</label>
          <input className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-gray-100 transition duration-150" id="email" type="text" />
        </div>
        <div className="flex mb-4 justify-center items-center gap-2">
          <label className="w-44 text-right text-gray-700 font-semibold" htmlFor="input-1">Username:</label>
          <input className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-gray-100 transition duration-150" id="input-1" type="text" />
        </div>
        <div className="flex mb-4 justify-center items-center gap-2">
          <label className="w-44 text-right text-gray-700 font-semibold" htmlFor="input-2">Password:</label>
          <input className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-black-100 transition duration-150" id="input-2" type="text" />
        </div>
        <div className="flex mb-8 justify-center items-center gap-2">
          <label className="w-44 text-right text-gray-700 font-semibold" htmlFor="input-3">Password Repeat:</label>
          <input className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-black-100 transition duration-150" id="input-3" type="text" />
        </div>
        <button className="block mb-2 mx-auto w-7/12 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors" type="submit">Submit</button>
      </form>
      <Link className="block mx-auto w-7/12 py-2 bg-orange-500 text-center text-white font-semibold rounded-md hover:bg-orange-600 transition-colors" to={'/auth/login'}>Login</Link>
    </>
  );
}

export default RegistrationForm;