import css from "./Loader.module.css";

function Loader() {
  return (
    <div className={css.loader}>
      <div className={css.loaderItem}></div>
      <div className={css.loaderItem}></div>
      <div className={css.loaderItem}></div>
    </div>
  );
}

export default Loader;
