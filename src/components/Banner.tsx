const Banner = () => {
  return (
    <div className="border-[1px] border-black rounded-lg mt-4">
      <div className="px-4 py-2">
        <div className="w-[100%] lg:max-w-[70%]">
          <div>
            <div className="border-b-4 py-2 border-yellow-400 text-[24px] font-medium text-blue-900  md:w-[85%] lg:w-[90%]">
              Quickly Find A Domestic Helper, Nanny or Driver
            </div>
          </div>
          <div className="py-2 text-gray-500 text-[14px] text-justify xl:max-w-[90%]">
            Thousand of domestic workers, helpers or maids are looking now for
            new employers, we help them to directly connect with you. We are
            proud to never charge any helpers or candidates. Select your region
            and get full access to the best domestic helpers!
          </div>
        </div>

        {/* logos */}
        <div className="flex justify-between px-4 py-4 flex-wrap max-h-[70px] overflow-hidden mt-[0.5rem]">
          <div className="max-w-[50%] text-center my-2 md:mx-2">
            <div className="text-center h-[60%] flex justify-center items-center">
              <img
                className="max-h-[40px] transition-all grayscale hover:grayscale-0"
                src="https://www.helperplace.com/assets/images/misc/brand/internation-labour-organization.png"
                alt="ILO logo"
              />
            </div>
          </div>
          <div className="max-w-[50%] text-center  my-2  md:mx-2">
            <div className="text-center h-[60%] flex justify-center items-center">
              <img
                className="max-h-[40px] transition-all grayscale hover:grayscale-0"
                src="https://www.helperplace.com/assets/images/misc/brand/Reuters.png"
                alt="ILO logo"
              />
            </div>
          </div>
          <div className="max-w-[50%] text-center  my-2  md:mx-2">
            <div className="text-center h-[60%] flex justify-center items-center">
              <img
                className="max-h-[40px] transition-all grayscale hover:grayscale-0"
                src="https://www.helperplace.com/assets/images/misc/brand/google-play.png"
                alt="ILO logo"
              />
            </div>
          </div>
          <div className="max-w-[50%] text-center  my-2  md:mx-2">
            <div className="text-center h-[60%] flex justify-center items-center">
              <img
                className="max-h-[40px] transition-all grayscale hover:grayscale-0"
                src="https://www.helperplace.com/assets/images/misc/brand/GMA.png"
                alt="ILO logo"
              />
            </div>
          </div>
          <div className="max-w-[50%] text-center  my-2  md:mx-2">
            <div className="text-center h-[60%] flex justify-center items-center">
              <img
                className="max-h-[40px] transition-all grayscale hover:grayscale-0"
                src="https://www.helperplace.com/assets/images/misc/brand/tech-in-asia.png"
                alt="ILO logo"
              />
            </div>
          </div>
          <div className="max-w-[50%] text-center  my-2  md:mx-2">
            <div className="text-center h-[60%] flex justify-center items-center">
              <img
                className="max-h-[40px] transition-all grayscale hover:grayscale-0"
                src="https://www.helperplace.com/assets/images/misc/brand/CNA.png"
                alt="ILO logo"
              />
            </div>
          </div>
        </div>
        {/* logos end */}
        <div className="flex items-center justify-end py-4">
          <div className="text-gray-500">Trusted By more than 260k users</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
