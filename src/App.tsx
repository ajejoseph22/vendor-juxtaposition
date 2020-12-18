import React, { FC, useState } from "react";
import "./App.css";
import { Menu, Button, Dropdown, Descriptions } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import google from "./assets/google.png";
import produce from "immer";

const App: FC = () => {
  const initialData = [
    {
      key: "1",
      image: "dropbox",
      company: (
        <div>
          <img alt="google" src={google} height={50} width={50} />
          <br />
          DropBox
        </div>
      ),
      productDescription: "something",
      overallScore: 6,
      fundingHistory: {},
      pricing: "www.dropbox.com/pricing",
      features: "5 different features present",
      customerCaseStudies: "4 customer case studies",
    },
    {
      key: "2",
      image: "googledrive",
      productDescription: "another thing",
      company: (
        <div>
          <img alt="google" src={google} height={50} width={50} />
          <br />
          Google Drive
        </div>
      ),
      overallScore: 7,
      fundingHistory: {},
      pricing: "www.drive.google.com/pricing",
      features: "4 different features present",
      customerCaseStudies: "6 customer case studies",
    },
    {
      key: "3",
      image: "salesforce",
      productDescription: "product desc",
      company: (
        <div>
          <img alt="google" src={google} height={50} width={50} />
          <br />
          SalesForce
        </div>
      ),
      overallScore: 8,
      fundingHistory: {},
      pricing: "www.salesforce.com/pricing",
      features: "6 different features present",
      customerCaseStudies: "1 customer case studies",
    },
  ];
  const initialColumns = {
    company: (
      <p
        onClick={() => {
          // Show Modal
          setData(
            produce((draft) => {
              draft.push({});
            })
          );
        }}
      >
        Add new vendor
      </p>
    ),
    overallScore: "overall score",
    productDescription: "product description",
    pricing: "pricing",
    customerCaseStudies: "customer case studies",
  };

  const [data, setData] = useState<any[]>(initialData);
  const [columns, setColumns] = useState<{ [key: string]: any }>(initialColumns);

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
    data.reduce((acc, item, idx) => {
      if (!idx) {
        acc.push(
          <Descriptions.Item label={columns[column]} key={idx}>
            {item[column]}
          </Descriptions.Item>
        );
      } else {
        acc.push(
          <Descriptions.Item key={idx}>{item[column]}</Descriptions.Item>
        );
      }
      return acc;
    }, [])
  );

  return (
    <div className="App">
      <Descriptions
        title={
          <Dropdown overlay={menu}>
            <Button>
              Add new criteria <DownOutlined />
            </Button>
          </Dropdown>
        }
        bordered
      >
        {display}
      </Descriptions>
    </div>
  );
};

export default App;
