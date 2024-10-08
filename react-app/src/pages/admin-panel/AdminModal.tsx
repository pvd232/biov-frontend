import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AdminModalProps } from "../../types/pages/AdminModalProps";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./scss/AdminModal.module.scss";
export const AdminModal: React.FC<AdminModalProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Username:</b> {`${props.qStat.userId}`}
                  </TableCell>
                  <TableCell>
                    <b>Questionnaires completed:</b> {`${props.qStat.count}`}
                  </TableCell>
                </TableRow>
                <>
                  {props.qStat.questionnaireResponses.map((qNairRes) =>
                    qNairRes.questionResponses.map((qResponse) => (
                      <TableRow
                        key={
                          "tableRow" +
                          qResponse.questionId.toString() +
                          qResponse.questionnaireId.toString()
                        }
                      >
                        <TableCell
                          key={
                            "tableCell1" +
                            qResponse.questionId.toString() +
                            qResponse.questionnaireId.toString()
                          }
                        >
                          Q: {qResponse.questionText}
                        </TableCell>
                        <TableCell
                          key={
                            "tableCell2" +
                            qResponse.questionId.toString() +
                            qResponse.questionnaireId.toString()
                          }
                        >
                          A: {qResponse.getAnswerValue()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </Modal>
    </div>
  );
};
