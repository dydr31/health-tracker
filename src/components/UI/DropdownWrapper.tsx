import { motion } from "framer-motion";

export const DropdownWrapper: React.FC<{
  children: React.ReactNode;
  className: string;
}> = (props) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ bounce: 0, duration: 0.25 }}
      className={props.className}
      
    >
      {props.children}
    </motion.div>
  );
};
