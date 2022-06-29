import styles from "./Avatar.module.css";

export function Avatar({ src, hasBorder = true }) {
  console.log(hasBorder);
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  );
}
