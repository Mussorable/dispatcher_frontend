function DeleteTrailer() {
  return(
    <div className="px-4 pt-4 flex-1">
      <h5 className="font-semibold">Delete Trailer</h5>
      <form action="" className="mt-2">
        <div className="flex aign-middle ml-4 mt-2">
          <label htmlFor="trailers-delete-list" className="block self-center w-28">Trailer number:</label>
          <select className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" name="" id="trailers-delete-list">
            <option value="">Select</option>
            <option value="trailer-1">trailer-1</option>
            <option value="trailer-2">trailer-2</option>
            <option value="trailer-3">trailer-3</option>
            <option value="trailer-4">trailer-4</option>
            <option value="trailer-5">trailer-5</option>
          </select>
        </div>
        <div className="flex aign-middle ml-4 mt-2 w-1/3 gap-4">
          <button type="submit" className="flex-1 mb-2 block mx-auto py-1 bg-red-500 text-white font-semibold rounded-sm hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteTrailer;