import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-4">
            <div className="container mx-auto text-center">
                <p className="mb-0">
                    © {new Date().getFullYear()} TechOdyssey. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
