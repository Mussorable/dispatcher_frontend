import DocumentIconUrl from '../../../assets/document.svg';

function DataInformation() {
  return(
    <div className="h-1/4 border-t-4 border-t-sky-500 relative overflow-y-auto no-scrollbar">
      <table className="w-full table-auto border-collapse relative">
        <thead>
          <tr className="bg-slate-600 text-white">
            <th className="text-xs font-medium p-1 border italic">delivery dates:</th>
            <th className="text-xs font-medium p-1 border italic">final distance:</th>
            <th className="text-xs font-medium p-1 border italic">from:</th>
            <th className="text-xs font-medium p-1 border italic">to:</th>
            <th className="text-xs font-medium p-1 border italic">driver:</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-slate-300 even:bg-white">
            <td className="text-xs p-1 border flex items-center"><span>20.10 - 22.10</span><button><img src={DocumentIconUrl} alt="document icon" className='w-[22px] h-[22px]' /></button></td>
            <td className="text-xs p-1 border">802km</td>
            <td className="text-xs p-1 border">Munich</td>
            <td className="text-xs p-1 border">Milan</td>
            <td className="text-xs p-1 border">Kulenkov Oleksandr</td>
          </tr>
          <tr className="odd:bg-slate-300 even:bg-white">
            <td className="text-xs p-1 border flex items-center"><span>20.10 - 22.10</span><button><img src={DocumentIconUrl} alt="document icon" className='w-[22px] h-[22px]' /></button></td>
            <td className="text-xs p-1 border">802km</td>
            <td className="text-xs p-1 border">Munich</td>
            <td className="text-xs p-1 border">Milan</td>
            <td className="text-xs p-1 border">Kulenkov Oleksandr</td>
          </tr>
          <tr className="odd:bg-slate-300 even:bg-white">
            <td className="text-xs p-1 border flex items-center"><span>20.10 - 22.10</span><button><img src={DocumentIconUrl} alt="document icon" className='w-[22px] h-[22px]' /></button></td>
            <td className="text-xs p-1 border">802km</td>
            <td className="text-xs p-1 border">Munich</td>
            <td className="text-xs p-1 border">Milan</td>
            <td className="text-xs p-1 border">Kulenkov Oleksandr</td>
          </tr>
          <tr className="odd:bg-slate-300 even:bg-white">
            <td className="text-xs p-1 border flex items-center"><span>20.10 - 22.10</span><button><img src={DocumentIconUrl} alt="document icon" className='w-[22px] h-[22px]' /></button></td>
            <td className="text-xs p-1 border">802km</td>
            <td className="text-xs p-1 border">Munich</td>
            <td className="text-xs p-1 border">Milan</td>
            <td className="text-xs p-1 border">Kulenkov Oleksandr</td>
          </tr>
          <tr className="odd:bg-slate-300 even:bg-white">
            <td className="text-xs p-1 border flex items-center"><span>20.10 - 22.10</span><button><img src={DocumentIconUrl} alt="document icon" className='w-[22px] h-[22px]' /></button></td>
            <td className="text-xs p-1 border">802km</td>
            <td className="text-xs p-1 border">Munich</td>
            <td className="text-xs p-1 border">Milan</td>
            <td className="text-xs p-1 border">Kulenkov Oleksandr</td>
          </tr>
          <tr className="odd:bg-slate-300 even:bg-white">
            <td className="text-xs p-1 border flex items-center"><span>20.10 - 22.10</span><button><img src={DocumentIconUrl} alt="document icon" className='w-[22px] h-[22px]' /></button></td>
            <td className="text-xs p-1 border">802km</td>
            <td className="text-xs p-1 border">Munich</td>
            <td className="text-xs p-1 border">Milan</td>
            <td className="text-xs p-1 border">Kulenkov Oleksandr</td>
          </tr>
          <tr className="odd:bg-slate-300 even:bg-white">
            <td className="text-xs p-1 border flex items-center"><span>20.10 - 22.10</span><button><img src={DocumentIconUrl} alt="document icon" className='w-[22px] h-[22px]' /></button></td>
            <td className="text-xs p-1 border">802km</td>
            <td className="text-xs p-1 border">Munich</td>
            <td className="text-xs p-1 border">Milan</td>
            <td className="text-xs p-1 border">Kulenkov Oleksandr</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DataInformation;