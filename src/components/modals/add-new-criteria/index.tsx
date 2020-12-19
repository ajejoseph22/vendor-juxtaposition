import React, { FC, useState } from "react";
import { CriteriaContext } from "../../../App";
import { Input, Modal } from "antd";

const AddNewCriteriaModal: FC<{ showModal: boolean }> = ({ showModal }) => {
  const [criteria, setCriteria] = useState("");

  return (
    <CriteriaContext.Consumer>
      {({ add, cancel }) => (
        <Modal
          title="Add a criteria"
          visible={showModal}
          onOk={() => {
            add(criteria);
            setCriteria("");
          }}
          onCancel={cancel}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
        >
          <Input
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            size="small"
            placeholder="Enter the Criteria"
          />
        </Modal>
      )}
    </CriteriaContext.Consumer>
  );
};
export default AddNewCriteriaModal;
