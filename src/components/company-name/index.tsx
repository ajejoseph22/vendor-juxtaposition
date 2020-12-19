import google from "../../assets/google.png";
import React, { FC } from "react";
import { VendorContext } from "../../App";

const CompanyName: FC<{ name: string }> = ({ name }) => (
  <VendorContext.Consumer>
    {({ remove }) => (
      <div>
        <p
          onClick={() => remove(name)}
          style={{ cursor: "pointer", float: "right" }}
        >
          x
        </p>
        <img alt="google" src={google} height={50} width={50} />
        <br />
        {name}
      </div>
    )}
  </VendorContext.Consumer>
);

export default CompanyName;
