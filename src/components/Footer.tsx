import { useState } from "react";
import classes from "./Footer.module.scss";
import { AnimatePresence, motion, useScroll } from "framer-motion";

export const Footer: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <footer className={classes.footer}>
      by dydr31@github
      <summary>
        <i onClick={() => setIsShown(!isShown)}>resourses</i> used for creating
        this website
      </summary>
      <AnimatePresence>
        {isShown && (
          <motion.ul
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ bounce: 0, duration: 0.25 }}
          >
            <li>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/close"
                  title="close icons"
                >
                  Close icons created by joalfa - Flaticon
                </a>
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/down-arrow"
                  title="down arrow icons"
                >
                  Down arrow icons created by th studio - Flaticon
                </a>
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/pencil"
                  title="pencil icons"
                >
                  Pencil icons created by Pixel perfect - Flaticon
                </a>
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/open-menu"
                  title="open menu icons"
                >
                  Open menu icons created by Pixel perfect - Flaticon
                </a>
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/filter"
                  title="filter icons"
                >
                  Filter icons created by herikus - Flaticon
                </a>
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/heart"
                  title="heart icons"
                >
                  Heart icons created by Freepik - Flaticon
                </a>
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/question"
                  title="question icons"
                >
                  Question icons created by Freepik - Flaticon
                </a>
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/graph"
                  title="graph icons"
                >
                  Graph icons created by ibobicon - Flaticon
                </a>
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/table"
                  title="table icons"
                >
                  Table icons created by Pixel perfect - Flaticon
                </a>
              </p>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </footer>
  );
};
