import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
    <p>&copy; {currentYear} Isuru Dananjaya. All Rights Reserved.</p>
    </footer>
  );
};

// Inline styles
const styles = {
  footer: {
    textAlign: "center" as const,
    padding: "1rem",
    backgroundColor: "#282c34",
    color: "#fff",
    fontSize: "12px",
  },
};

export default Footer;
