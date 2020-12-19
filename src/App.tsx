import React, { createContext, FC, ReactNode, useState } from "react";
import "./App.css";
import { Menu, Button, Dropdown, Descriptions } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import produce from "immer";
import AddNewVendorModal from "./components/modals/add-new-vendor";
import CompanyName from "./components/company-name";

//////// TYPES /////////
interface IColumns {
  [key: string]: any;
}

////////////////////////

//////// CONTEXT /////////
export const VendorContext = createContext({
  add: (formValue: { [key: string]: any }) => {},
  cancel: () => {},
  remove: (i: string) => {},
  columns: {},
});
export const CriteriaContext = createContext({
  add: () => {},
  cancel: () => {},
});

//////////////////////////

const App: FC = () => {
  const initialData = {
    DropBox: {
      key: "1",
      image: "dropbox",
      company: <CompanyName name="DropBox" />,
      productDescription: "something",
      overallScore: 6,
      fundingHistory: {},
      pricing: "www.dropbox.com/pricing",
      features: "5 different features present",
      customerCaseStudies: "4 customer case studies",
    },
    "Google Drive": {
      key: "2",
      image: "googledrive",
      productDescription: "another thing",
      company: <CompanyName name="Google Drive" />,
      overallScore: 7,
      fundingHistory: {},
      pricing: "www.drive.google.com/pricing",
      features: "4 different features present",
      customerCaseStudies: "6 customer case studies",
    },
    SalesForce: {
      key: "3",
      image: "salesforce",
      productDescription: "product desc",
      company: <CompanyName name="SalesForce" />,
      overallScore: 8,
      fundingHistory: {},
      pricing: "www.salesforce.com/pricing",
      features: "6 different features present",
      customerCaseStudies: "1 customer case studies",
    },
  };

  const initialColumns = {
    company: (
      <p
        onClick={() => {
          // Show Modal
          setShowAddVendorModal(true);
          // setData(
          //   produce((draft) => {
          //     draft.push({});
          //   })
          // );
        }}
      >
        Add new vendor
      </p>
    ),
    overallScore: "Overall score",
    productDescription: "Product description",
    pricing: "Pricing",
    customerCaseStudies: "Customer case studies",
  };
  /////////////////////

  /////// STATE ///////
  const [data, setData] = useState<IColumns>(initialData);
  const [columns, setColumns] = useState<IColumns>(initialColumns);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  ////////////////////

  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  const display = Object.keys(columns).map((column) =>
    Object.keys(data).reduce((acc: ReactNode[], item, idx) => {
      if (!idx) {
        acc.push(
          <Descriptions.Item label={columns[column]} key={idx}>
            {data[item][column]}
          </Descriptions.Item>
        );
      } else {
        acc.push(
          <Descriptions.Item key={idx}>{data[item][column]}</Descriptions.Item>
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
              draft[formValue.company] = {
                ...formValue,
                company: <CompanyName name={formValue.company} />,
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
          add: () => {
            console.log("criteria added");
          },
          cancel: () => {
            console.log("criteria cancelled");
          },
        }}
      >
        <div className="App">
          <AddNewVendorModal showModal={showAddVendorModal} />
          <Descriptions
            title={
              <Dropdown overlay={menu}>
                <Button>
                  Add new criteria <DownOutlined />
                </Button>
              </Dropdown>
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
