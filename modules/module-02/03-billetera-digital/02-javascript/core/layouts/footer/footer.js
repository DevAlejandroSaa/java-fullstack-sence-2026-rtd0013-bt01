const Footer = async () => {
    const response = await fetch(new URL("./footer.html", import.meta.url));
    return await response.text();
};

export default Footer;