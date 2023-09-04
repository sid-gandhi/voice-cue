import styles from "./WordInText.module.css";

const WordInText = ({ trans, time, onClick, color ,speaker}) => {
  return (
    <div
      className={styles.wrapper}
      onClick={onClick}
      style={{ color: `${color}` }}
    >
      {speaker===0? "AGENT":"HUMAN"}: {trans}
    </div>
  );
};

export default WordInText;
