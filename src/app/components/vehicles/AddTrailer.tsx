import {addTrailer, AppDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Trailer} from "../../../store/trailers.ts";

interface AddTrailerProps {
  trailers: Trailer[];
}

function AddTrailer({trailers}: AddTrailerProps) {
  const dispatch: AppDispatch = useDispatch();
  const [trailer, setTrailer] = useState<Trailer>({
    number: ''
  });

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (trailers.some(t => t.number === trailer.number)) {
      alert('Trailer with this number already exists');
      return;
    }

    dispatch(addTrailer(trailer));

    setTrailer({
      number: ''
    });
  };

  return (
    <div className="px-4 pt-4 flex-1">
      <h5 className="font-semibold">Add Trailer</h5>
      <form action="" className="mt-2" onSubmit={handleSubmitForm}>
        <div className="flex align-middle ml-4 mt-2">
          <label htmlFor="trailer-number" className="block self-center w-28">Trailer number:</label>
          <input value={trailer.number} onChange={e => setTrailer({number: e.currentTarget.value})} className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" id="trailer-number" type="text" placeholder="7-digit number" />
        </div>
        <div className="flex aign-middle ml-4 mt-2">
          <label htmlFor="trucks-list" className="block self-center w-28">Current truck:</label>
          <select className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" name="" id="trucks-list">
            <option value="">Optional</option>
            <option value="truck-1">truck-1</option>
            <option value="truck-2">truck-2</option>
            <option value="truck-3">truck-3</option>
            <option value="truck-4">truck-4</option>
            <option value="truck-5">truck-5</option>
          </select>
        </div>
        <div className="flex aign-middle ml-4 mt-2 w-1/3 gap-4">
          <button type="submit" className="flex-1 mb-2 block mx-auto py-1 bg-blue-500 text-white font-semibold rounded-sm hover:bg-blue-600 transition-colors">Submit</button>
          <button type="reset" className="flex-1 mb-2 block mx-auto py-1 bg-orange-500 text-white font-semibold rounded-sm hover:bg-orange-600 transition-colors">Clear</button>
        </div>
      </form>
    </div>
  );
}

export default AddTrailer;