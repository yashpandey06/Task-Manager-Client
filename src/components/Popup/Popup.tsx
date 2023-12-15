/* eslint-disable @typescript-eslint/no-unused-vars */

import Cookies from "js-cookie";
import { useRef } from "react";
import { PayLoad } from "../Types/Types";
import axios from "axios";

interface PopupProps {
  title: string;
  id: number | string;
  CloseModel: () => void;
}
export default function Popup({ title, id, CloseModel }: PopupProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleInput() {
    const inputValue: string = inputRef.current?.value || "";
    CloseModel();
    if (inputValue?.trim().length != 0) {
      try {
        const token = Cookies.get("auth-token");
        const url = "https://task-backened-65u3.onrender.com/board";
        const payload: PayLoad = {
          id: id,
          title: title,
          input: inputValue,
        };
        const response = await axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
      } catch (e) {
        alert("Retry");
      }
    }
  }

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-sm ">
      <div className="bg-white/95 max-w-2xl w-full max-h-full overflow-y-auto p-4 md:p-5 rounded-2xl  dark:bg-gray-700 shadow-md ">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b pb-4 md:pb-5 border-gray-200 dark:border-gray-600">
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            Add Item
          </div>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="static-modal"
          >
            <button onClick={() => CloseModel()}>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Modal body */}
        <div className="p-4 md:p-5 space-y-4">
          <input
            type="text"
            className="p-4 w-full flex text-black font-md font-medium border-2"
            ref={inputRef}
          />
        </div>
        {/* Modal footer */}
        <div className="flex items-center pt-4 md:pt-5 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={() => handleInput()}
            type="button"
            className="rotext-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
