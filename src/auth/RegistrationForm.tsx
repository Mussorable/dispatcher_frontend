import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUsername, setPassword, setEmail, setRepeatPassword } from "../store/store";
import { RootState } from "../store/store";
import { FetchWrapper } from "../utils/FetchWrapper";
import { ErrorAuthResponse, SuccessAuthResponse } from "./types";

function RegistrationForm() {
  const dispatch = useDispatch();

  const email = useSelector((state: RootState) => state.email);
  const username = useSelector((state: RootState) => state.username);
  const password = useSelector((state: RootState) => state.password);
  const repeatPassword = useSelector((state: RootState) => state.repeatPassword);

  const fetchWrapper = new FetchWrapper(import.meta.env.VITE_TEST_URL);

  const handleSetEmail = (email: string): void => {
    dispatch(setEmail(email));
  }
  const handleSetUsername = (username: string): void => {
    dispatch(setUsername(username));
  }
  const handleSetPassword = (password: string): void => {
    dispatch(setPassword(password));
  }
  const handleSetRepeatPassword = (username: string): void => {
    dispatch(setRepeatPassword(username));
  }

  async function handleSubmitRegisterForm(event: React.FormEvent) {
    event.preventDefault();

    if (repeatPassword === password) {
      const response = await fetchWrapper.post<SuccessAuthResponse | ErrorAuthResponse>('/auth/register', {
        email,
        username,
        password
      });

      console.log(response);

      if ('access_token' in response) {
        sessionStorage.setItem('accessToken', response.access_token);
      }
    } else {
      return;
    }

    handleSetEmail('');
    handleSetUsername('');
    handleSetPassword('');
    handleSetRepeatPassword('');
  }

  return(
    <>
      <form action="" onSubmit={handleSubmitRegisterForm}>
        <div className="flex mb-4 justify-center items-center gap-2">
          <label className="w-44 text-right text-gray-700 font-semibold" htmlFor="email">Email:</label>
          <input value={email} onChange={e => handleSetEmail(e.currentTarget.value)} className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-gray-100 transition duration-150" id="email" type="email" />
        </div>
        <div className="flex mb-4 justify-center items-center gap-2">
          <label className="w-44 text-right text-gray-700 font-semibold" htmlFor="username">Username:</label>
          <input value={username} onChange={e => handleSetUsername(e.currentTarget.value)} className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-gray-100 transition duration-150" id="username" type="text" />
        </div>
        <div className="flex mb-4 justify-center items-center gap-2">
          <label className="w-44 text-right text-gray-700 font-semibold" htmlFor="password">Password:</label>
          <input value={password} onChange={e => handleSetPassword(e.currentTarget.value)} className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-black-100 transition duration-150" id="password" type="password" />
        </div>
        <div className="flex mb-8 justify-center items-center gap-2">
          <label className="w-44 text-right text-gray-700 font-semibold" htmlFor="repeat-password">Password Repeat:</label>
          <input value={repeatPassword} onChange={e => handleSetRepeatPassword(e.currentTarget.value)} className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-black-100 transition duration-150" id="repeat-password" type="password" />
        </div>
        <button className="block mb-2 mx-auto w-7/12 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors" type="submit">Submit</button>
      </form>
      <Link className="block mx-auto w-7/12 py-2 bg-orange-500 text-center text-white font-semibold rounded-md hover:bg-orange-600 transition-colors" to={'/auth/login'}>Login</Link>
    </>
  );
}

export default RegistrationForm;