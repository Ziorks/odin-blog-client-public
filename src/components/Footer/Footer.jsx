import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://odin-blog-client-admin.vercel.app/">Admin Site</a>
      <h1>© 2025 Zoinks. All rights reserved.</h1>
    </footer>
  );
}

export default Footer;
