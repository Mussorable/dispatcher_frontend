function AddDriver() {
  return(
    <div className="px-4 pt-4 flex-1">
      <h5 className="font-semibold">Add Driver</h5>
      <form action="" className="mt-2">
        <div className="flex align-middle ml-4 mt-2">
          <label htmlFor="driver-fullname" className="block self-center w-32">Full name:</label>
          <input className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" id="driver-fullname" type="text" placeholder="Enter name" />
        </div>
        <div className="flex align-middle ml-4 mt-2">
          <label htmlFor="driver-id" className="block self-center w-32">Driver's number:</label>
          <input className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" id="driver-id" type="text" placeholder="4-digit number" />
        </div>
        <div className="flex aign-middle ml-4 mt-2 w-1/3 gap-4">
          <button type="submit" className="flex-1 mb-2 block mx-auto py-1 bg-blue-500 text-white font-semibold rounded-sm hover:bg-blue-600 transition-colors">Submit</button>
          <button type="reset" className="flex-1 mb-2 block mx-auto py-1 bg-orange-500 text-white font-semibold rounded-sm hover:bg-orange-600 transition-colors">Clear</button>
        </div>
      </form>
    </div>
  );
}

export default AddDriver;