import Nav from "./Nav";


const GuidePage = () => {
  return (
    <>
      <Nav/>
    <div className="bg-gray-400 min-h-screen">
      <div className="container mx-auto py-12 md:py-24 px-4 md:px-0">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8" style={{ color: '#FFC107' }}>
          Get started in <span style={{ color: '#000' }}>3 easy steps</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row md:-mx-2">
            <div className="md:w-1/3 md:px-2 mb-12 md:mb-0">
              <div className="bg-white h-full p-8 rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center md:text-left">Step 1: Sign up</h2>
                <p className="mb-6 text-gray-700">
                                  Create a account in CineMad get movies according to your mood with following features:
                                  <br />
                                  <span>1.) Mood Changer</span>
                                  <br />
                                  <span>2.) Mood Emphasizer</span>
                </p>
                <a href="/signup" className="text-blue-500 hover:text-blue-700 text-center md:text-left">Learn more &rarr;</a>
              </div>
            </div>
            <div className="md:w-1/3 md:px-2 mb-12 md:mb-0">
              <div className="bg-white h-full p-8 rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center md:text-left">Step 2: Form</h2>
                <p className="mb-6 text-gray-700">
                   Submit the form with two questions and Provide the current mood and how you feel:
                                  <br />
                                  <span>1.) Mood or Feeling: </span>
                                  <br />
                                  <span>2.) favorite Actor: </span>
                </p>
                <a href="/moodtracker" className="text-blue-500 hover:text-blue-700 text-center md:text-left">Learn more &rarr;</a>
              </div>
            </div>
            <div className="md:w-1/3 md:px-2">
              <div className="bg-white h-full p-8 rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center md:text-left">Step 3: Enjoy</h2>
                <p className="mb-6 text-gray-700">
                  Enjoy the movies according to mood and opposite to mood with Watch Later and Watch Now feature as well as history.
                </p>
                <a href="/" className="text-blue-500 hover:text-blue-700 text-center md:text-left">Learn more &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </>
  );
};

export default GuidePage;
