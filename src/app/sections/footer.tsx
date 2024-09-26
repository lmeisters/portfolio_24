const Footer = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <footer className="mt-12 text-sm text-gray-600">
            <hr className="mb-4" />
            <div className="flex flex-row justify-between">
                <p>{currentDate}</p>

                <p>&copy; Linards M. {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};

export default Footer;
