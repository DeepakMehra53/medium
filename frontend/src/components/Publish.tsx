import { AppBar } from "./Appbar";

export const Publish = () => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center ">
        <div className="max-w-screen-lg w-full pt-9">
          <input
            type="text "
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Title"
          />
        </div>
      </div>
      <TextEditor/>
    </div>
  );
};

function TextEditor() {
  return (
    <form>
      <div className="w-full mb-4   ">
        <div className="flex items-center justify-between px-3 py-2  ">
          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
            <div className="px-4 py-2 bg-white rounded-b-lg ">
              <label className="sr-only">Publish post</label>
              <textarea
                id="editor"
                className="block w-full px-0 text-sm text-gray-800 "
                placeholder="Write an article..."
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </form>
  );
}
