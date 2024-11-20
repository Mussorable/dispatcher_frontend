import { addTrailer, AppDispatch, RootState, setHighlightTrailers } from "../../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import React, { FormEvent, useState } from "react";
import {Trailer} from "../../../store/trailers.ts";
import { Truck } from "../../../store/trucks.ts";

interface AddTrailerProps {
  trailers: Trailer[];
  trucks: Truck[];
}

function AddTrailer({trailers, trucks}: AddTrailerProps) {
  const dispatch: AppDispatch = useDispatch();
  const highlight = useSelector((state: RootState) => state.trucks.highlight);
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
    const timer = setTimeout(() => {
      dispatch(setHighlightTrailers(false));
    }, 600);

    handleReset(event);

    return () => clearTimeout(timer);
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    setTrailer({
      number: ''
    });
  };

  return (
    <div className="px-4 pt-4 flex-1">
      <h5 className="font-semibold">Add Trailer</h5>
      <form action="" className="mt-2" onSubmit={handleSubmitForm} onReset={handleReset}>
        <div className="flex align-middle ml-4 mt-2">
          <label htmlFor="trailer-number" className="block self-center w-28">Trailer number:</label>
          <input value={trailer.number} onChange={e => setTrailer({number: e.currentTarget.value})} className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" id="trailer-number" type="text" placeholder="7-digit number" />
        </div>
        <div className="flex aign-middle ml-4 mt-2">
          <label htmlFor="trucks-list" className="block self-center w-28">Current truck:</label>
          <select disabled={trucks.length == 0} className={ `ml-3 px-2 py-1 border-2 border-gray-700 rounded-md transition-colors duration-500 ease-in focus:outline-none ${highlight ? 'bg-green-200' : ''}` } name="" id="trucks-list">
            <option value="">Optional</option>
            {trucks && trucks.map(({number}) => <option value={number} key={number}>{number}</option>)}
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