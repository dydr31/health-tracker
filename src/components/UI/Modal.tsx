import classes from "./Modal.module.scss";
import { motion } from "framer-motion";

export const Modal: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ bounce: 0, duration: 0.5 }}
      className={classes.modal}
    ></motion.div>
  );
};
