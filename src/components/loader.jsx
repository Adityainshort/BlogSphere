import { Spinner } from "@material-tailwind/react";

export default function Loader() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl">
        <Spinner className="h-12 w-12 text-blue-500" />
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
