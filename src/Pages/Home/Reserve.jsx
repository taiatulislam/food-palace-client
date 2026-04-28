const Reserve = () => {
  return (
    <section
      className="max-w-7xl mx-auto my-10 rounded-xl overflow-hidden p-5 md:p-10"
      style={{
        backgroundImage: "url(https://i.ibb.co/QdHbqft/patron.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Content */}
        <div className="w-full lg:w-1/3 text-white">
          <h2 className="text-3xl md:text-4xl font-bold">RESERVE A TABLE</h2>
          <hr className="w-32 border-2 border-secondary rounded-lg my-4" />
          <p className="text-base md:text-lg text-gray-200">
            Discover Our New Menu!
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-2/3">
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Inputs */}
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full p-3 rounded-md outline-none"
                />
                <input
                  type="number"
                  placeholder="No of Guests"
                  required
                  className="w-full p-3 rounded-md outline-none"
                />
              </div>

              {/* Right Inputs */}
              <div className="flex flex-col gap-5">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-3 rounded-md outline-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="date"
                    required
                    className="w-full p-3 rounded-md outline-none"
                  />
                  <input
                    type="time"
                    required
                    className="w-full p-3 rounded-md outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-secondary hover:opacity-90 transition px-6 py-3 font-semibold rounded-lg text-white text-sm md:text-base"
              >
                Reserve A Table
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reserve;
