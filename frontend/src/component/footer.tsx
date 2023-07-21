import React from "react";

function Footer() {
  return (
    <div className="h-[320px] w-full bg-slate-600 mt-52 flex-col">
      <div className="flex">
        <div className="w-[860px] h-[200px] text-center mt-11 text-white text-[17px]">
          <p>Perago Information Systems</p>
          <p>Email: info@peragosystems.com</p>
          <p>Tel: +251 114 701 998 | +251 911 231 622</p>
          <p>Po.Box: 139 Addis Ababa, Ethiopia</p>
        </div>
        <div className="w-[730px] h-[260px] bg-white">
          <img
            src="/perago.jpg"
            alt="image"
            className="h-[80px] w-[100px] mt-14 block  mx-auto pt-[30px] "
          />
        </div>
      </div>
      <span className="w-full block text-center pt-3 text-white text-[15px]">
        @copyright || PeragoSystem
      </span>
    </div>
  );
}

export default Footer;
