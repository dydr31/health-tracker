import { motion } from "framer-motion";

export const OpacityChangingWrapper: React.FC<{
  children: React.ReactNode;
  className: string;
}> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ bounce: 0, duration: 0.5 }}
      className={props.className}
    >
      {props.children}
    </motion.div>
  );
};
