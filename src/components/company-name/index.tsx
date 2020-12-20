import google from "../../assets/google.png";
import dropbox from "../../assets/dropbox.png";
import salesforce from "../../assets/salesforce.png";
import defaultLogo from "../../assets/defaultLogo.png";
import React, { FC } from "react";
import { VendorContext } from "../../App";

const logoNameMap = {
  google,
  salesforce,
  dropbox,
  defaultLogo,
};

const CompanyName: FC<{ name: string; image?: string }> = ({ name, image }) => (
  <VendorContext.Consumer>
    {({ remove }) => (
      <div>
        <p
          onClick={() => remove(name)}
          style={{ cursor: "pointer", float: "right" }}
        >
          x
        </p>
        <img
          alt={image}
          src={logoNameMap[image || 'defaultLogo']}
          height={50}
          width={50}
        />
        <br />
        {name}
      </div>
    )}
  </VendorContext.Consumer>
);

export default CompanyName;
