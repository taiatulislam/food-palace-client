const Reserve = () => {
  return (
    <section
      className="max-w-7xl mx-auto p-16 my-16 rounded-xl"
      style={{
        backgroundImage: "url(https://i.ibb.co/QdHbqft/patron.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex">
        <div className="w-1/3 text-white">
          <h2 className="text-3xl font-semibold">
            RESERVE <br /> A TABLE
          </h2>
          <hr className="w-[120px] border-2 border-[#ffc107] rounded-lg" />
          <p className="mt-5">Discover Our New Menu!</p>
        </div>

        <div className="w-2/3">
          <div className="flex gap-5">
            {/* First div */}
            <div className="flex flex-col gap-5 w-1/2">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="p-2 pl-5 rounded-md"
              />
              <input
                type="text"
                placeholder="No of Guests"
                required
                className="p-2 pl-5 rounded-md"
              />
            </div>
            {/* Second div */}
            <div className="flex flex-col gap-5 w-1/2">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="p-2 pl-5 rounded-md"
              />
              <div className="flex gap-5">
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  required
                  className="w-1/2 p-2 rounded-md"
                />
                <input type="time" required className="w-1/2 p-2 rounded-md" />
              </div>
            </div>
          </div>
          <button className="bg-[#ffc107] p-3 font-semibold rounded-lg float-right mt-5 text-sm">
            Reserve A Table
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reserve;
