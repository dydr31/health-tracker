import classes from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      by dydr31@github
      <details>
        <summary>resourses used for creating this website</summary>
        <div>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/close"
              title="close icons"
            >
              Close icons created by joalfa - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/down-arrow"
              title="down arrow icons"
            >
              Down arrow icons created by th studio - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/pencil"
              title="pencil icons"
            >
              Pencil icons created by Pixel perfect - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/open-menu"
              title="open menu icons"
            >
              Open menu icons created by Pixel perfect - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/filter"
              title="filter icons"
            >
              Filter icons created by herikus - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/heart"
              title="heart icons"
            >
              Heart icons created by Freepik - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/question"
              title="question icons"
            >
              Question icons created by Freepik - Flaticon
            </a>
          </p>
        </div>
      </details>
    </footer>
  );
};
