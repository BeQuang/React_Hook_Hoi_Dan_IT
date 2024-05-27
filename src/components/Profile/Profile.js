import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTranslation } from "react-i18next";

import Information from "./Information/Information";
import ChangePass from "./ChangePass/ChangePass";
import History from "./History/History";

function Profile({ show, setShow }) {
  const handleClose = () => setShow(false);
  const { t } = useTranslation();

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("profile.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="profile" title={t("profile.information")}>
              <Information />
            </Tab>
            <Tab eventKey="changePass" title={t("profile.change")}>
              <ChangePass />
            </Tab>
            <Tab eventKey="history" title={t("profile.history")}>
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;
