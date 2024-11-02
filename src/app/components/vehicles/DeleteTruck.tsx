function DeleteTruck() {
  return(
    <div className="px-4 pt-4 flex-1">
      <h5 className="font-semibold">Delete Truck</h5>
      <form action="" className="mt-2">
        <div className="flex aign-middle ml-4 mt-2">
          <label htmlFor="trucks-delete-list" className="block self-center w-28">Truck number:</label>
          <select className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" name="" id="trucks-delete-list">
            <option value="">Select</option>
            <option value="truck-1">truck-1</option>
            <option value="truck-2">truck-2</option>
            <option value="truck-3">truck-3</option>
            <option value="truck-4">truck-4</option>
            <option value="truck-5">truck-5</option>
          </select>
        </div>
        <div className="flex aign-middle ml-4 mt-2 w-1/3 gap-4">
          <button type="submit" className="flex-1 mb-2 block mx-auto py-1 bg-red-500 text-white font-semibold rounded-sm hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteTruck;