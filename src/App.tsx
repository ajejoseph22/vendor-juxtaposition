import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import "./App.css";
import { Button, Descriptions, Progress } from "antd";
import {
  CloseCircleOutlined,
  DownOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import produce from "immer";
import AddNewVendorModal from "./components/modals/add-new-vendor";
import CompanyName from "./components/company-name";
import { addToObject, camelize } from "./utils/methods";
import AddNewCriteriaModal from "./components/modals/add-new-criteria";

//////// TYPES /////////
interface IObject {
  [key: string]: any;
}

////////////////////////

//////// CONTEXT /////////
export const VendorContext = createContext({
  add: (formValue: IObject) => {},
  cancel: () => {},
  remove: (i: string) => {},
  columns: {},
});
export const CriteriaContext = createContext({
  add: (criterium: string) => {},
  cancel: () => {},
});

//////////////////////////

const App: FC = () => {
  const initialData = {
    DropBox: {
      image: "dropbox",
      company: <CompanyName name="DropBox" />,
      productDescription: "something",
      overallScore: <Progress type="circle" percent={60} />,
      fundingHistory: [150, 2005, "DFG,Scale Ventures Partners", "Aeron Levie"],
      pricing: "www.dropbox.com/pricing",
      features: "5 different features present",
      customerCaseStudies: "4 customer case studies",
    },
    "Google Drive": {
      image: "googledrive",
      productDescription: "another thing",
      company: <CompanyName name="Google Drive" />,
      overallScore: <Progress type="circle" percent={70} />,
      fundingHistory: [
        36.1,
        2007,
        "ACT, Achieve Ventures & Capital",
        "Arash Ferdoswi",
      ],
      pricing: "www.drive.google.com/pricing",
      features: "4 different features present",
      customerCaseStudies: "6 customer case studies",
    },
    SalesForce: {
      key: "3",
      image: "salesforce",
      productDescription: "product desc",
      company: <CompanyName name="SalesForce" />,
      overallScore: <Progress type="circle" percent={80} />,
      fundingHistory: [
        756.1,
        2009,
        "Sequia, Larry Page",
        "Kleiner, Sergey Bin",
      ],

      pricing: "www.salesforce.com/pricing",
      features: "6 different features present",
      customerCaseStudies: "1 customer case studies",
    },
  };

  const initialColumns = {
    company: (
      <div
        onClick={() => {
          setShowAddVendorModal(true);
        }}
        style={{ cursor: "pointer", position: "relative" }}
      >
        <PlusSquareOutlined style={{ color: "green" }} />
        <p className={"add-new-vendor-txt"}>Add new vendor</p>
      </div>
    ),
    overallScore: "Overall score",
    productDescription: "Product description",
    pricing: "Pricing",
    fundingHistory: "Funding History",
    founded: "Founded",
    keyInvestors: "Key Investors",
    founders: "Founders",
    customerCaseStudies: "Customer case studies",
  };
  /////////////////////

  /////// STATE ///////
  const [data, setData] = useState<IObject>(initialData);
  const [columns, setColumns] = useState<IObject>(initialColumns);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);
  const [showFundingHistory, setShowFundingHistory] = useState(false);
  ////////////////////

  useEffect(() => {
    if (showFundingHistory) {
      let index = Object.keys(columns).findIndex(
        (item) => item === "fundingHistory"
      );
      let newColumns = { ...columns };

      newColumns = addToObject(newColumns, "founded", "Founded", ++index);
      newColumns = addToObject(
        newColumns,
        "keyInvestors",
        "Key Investors",
        ++index
      );
      newColumns = addToObject(newColumns, "founders", "Founders", ++index);
      setColumns(newColumns);
      return;
    }

    setColumns(
      produce((draft) => {
        delete draft.founded;
        delete draft.founders;
        delete draft.keyInvestors;
      })
    );
  }, [showFundingHistory]);

  enum FundingHistoryMap {
    amount,
    founded,
    keyInvestors,
    founders,
  }

  const toFundingText = (amount: string) => `Total funding: $${amount}m`;
  const isFundingHisoryData = (key: string): boolean =>
    ["founded", "founders", "keyInvestors"].includes(key);
  const display = Object.keys(columns).map((column, i) =>
    Object.keys(data).reduce((acc: ReactNode[], item, idx) => {
      if (!idx) {
        acc.push(
          <Descriptions.Item
            label={
              <p>
                {Object.keys(data).length === 4 && column === "company" ? (
                  <p style={{ width: 210 }}>
                    A maximum of 4 vendors is allowed. Please delete a vendor
                    before adding a new one{" "}
                  </p>
                ) : column !== "fundingHistory" ? (
                  columns[column]
                ) : (
                  <>
                    <span
                      onClick={() => setShowFundingHistory(!showFundingHistory)}
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                    >
                      {columns[column]}
                    </span>
                  </>
                )}{" "}
                {i ? (
                  <CloseCircleOutlined
                    onClick={() => {
                      setColumns(
                        produce((draft) => {
                          delete draft[column];
                        })
                      );
                      setData(
                        produce((draft) => {
                          Object.keys(draft).forEach((item) => {
                            delete draft[item][column];
                          });
                        })
                      );
                    }}
                    style={{
                      background: "red",
                      color: "#fff",
                      borderRadius: 50,
                    }}
                  />
                ) : null}
              </p>
            }
            key={idx}
          >
            {isFundingHisoryData(column)
              ? data[item]["fundingHistory"][FundingHistoryMap[column]]
              : column !== "fundingHistory"
              ? data[item][column] || "-"
              : toFundingText(data[item][column][0])}
          </Descriptions.Item>
        );
      } else {
        acc.push(
          <Descriptions.Item key={idx}>
            {isFundingHisoryData(column)
              ? data[item]["fundingHistory"][FundingHistoryMap[column]]
              : column !== "fundingHistory"
              ? data[item][column] || "-"
              : toFundingText(data[item][column][0])}
          </Descriptions.Item>
        );
      }
      return acc;
    }, [])
  );

  return (
    <VendorContext.Provider
      value={{
        add: (formValue) => {
          setData(
            produce((draft) => {
              console.log(formValue);
              debugger;
              draft[formValue.company] = {
                ...formValue,
                company: <CompanyName name={formValue.company} />,
                overallScore: (
                  <Progress
                    type="circle"
                    percent={formValue.overallScore * 10}
                  />
                ),
                fundingHistory: [
                  formValue.fundingHistory,
                  formValue.founded,
                  formValue.keyInvestors,
                  formValue.founders,
                ],
              };
            })
          );

          setShowAddVendorModal(false);
        },
        cancel: () => setShowAddVendorModal(false),
        remove: (name) => {
          setData(
            produce((draft) => {
              delete draft[name];
            })
          );
        },
        columns: columns,
      }}
    >
      <CriteriaContext.Provider
        value={{
          add: (criteria) => {
            setColumns(
              produce((draft) => {
                draft[camelize(criteria)] = criteria;
              })
            );

            setShowAddCriteriaModal(false);
          },
          cancel: () => setShowAddCriteriaModal(false),
        }}
      >
        <div className="App">
          <AddNewVendorModal showModal={showAddVendorModal} />
          <AddNewCriteriaModal showModal={showAddCriteriaModal} />
          <Descriptions
            title={
              <Button
                style={{
                  float: "left",
                  border: "none",
                }}
                onClick={() => setShowAddCriteriaModal(true)}
              >
                Add new criteria <DownOutlined />
              </Button>
            }
            column={Object.keys(data).length}
            bordered
          >
            {display}
          </Descriptions>
        </div>
      </CriteriaContext.Provider>
    </VendorContext.Provider>
  );
};

export default App;
