import { Input, Modal } from "antd";
import { FC, ReactNode, useState } from "react";
import { VendorContext } from "../../../App";
import produce from "immer";

const AddNewVendorModal: FC<{ showModal: boolean }> = ({ showModal }) => {
  const [formValue, setFormValue] = useState({});

  return (
    <VendorContext.Consumer>
      {({ add, cancel, columns }) => (
        <Modal
          title="Add a vendor"
          visible={showModal}
          onOk={() => {
            add(formValue);
            setFormValue({});
          }}
          onCancel={cancel}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
        >
          {Object.keys(columns).reduce(
            (acc: ReactNode[], column, index) => {
              if (index) {
                acc.push(
                  <Input
                    value={formValue[column] || ""}
                    onChange={(e) => {
                      setFormValue(
                        produce((draft) => {
                          draft[column] = e.target.value;
                        })
                      );
                    }}
                    key={index}
                    placeholder={columns[column]}
                  />
                );
              }
              return acc;
            },
            [
              <Input
                value={formValue["company"] || ""}
                onChange={(e) => {
                  setFormValue(
                    produce((draft) => {
                      draft.company = e.target.value;
                    })
                  );

                  console.log(formValue["company"]);
                }}
                key={0}
                placeholder="Company name"
              />,
            ]
          )}
        </Modal>
      )}
    </VendorContext.Consumer>
  );
};

export default AddNewVendorModal;
