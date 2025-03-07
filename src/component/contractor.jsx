import React from "react";
import heroImage1 from "../../public/img/LogoMudaGroup.png";

export const Contractor = () => {
  return (
    <div className="contractor-page">
        <h1>
            GENERAL CONTRACTOR
        </h1>
        <a href="/GeneralContractor">
        <img src={heroImage1} alt="" />
        </a>
    </div>
  );
};
