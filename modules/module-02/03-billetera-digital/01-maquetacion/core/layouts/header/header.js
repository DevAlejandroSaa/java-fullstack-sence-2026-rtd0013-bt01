const Header = async () => {
    const response = await fetch(new URL("./header.html", import.meta.url));
    return await response.text();
};

export default Header;