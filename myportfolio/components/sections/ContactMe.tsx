// components/sections/ContactMe.tsx
import React from 'react';

const ContactMe = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const contact = content.contact || {};

    return (
        <div className="text-white leading-relaxed space-y-4">
            <ul className="list-none space-y-3">
                <li>📧 <strong>Email:</strong> <a href={`mailto:${contact.email}`} className="text-yellow-400 underline">{contact.email}</a></li>
                <li>📞 <strong>Phone:</strong> <a href={`tel:${contact.phone}`} className="text-yellow-400 underline">{contact.phone}</a></li>
                <li>🔗 <strong>LinkedIn:</strong> <a href={contact.linkedin} target="_blank" className="text-yellow-400 underline">{contact.linkedin}</a></li>
                <li>🐙 <strong>GitHub:</strong> <a href={contact.github} target="_blank" className="text-yellow-400 underline">{contact.github}</a></li>
                <li>📘 <strong>Facebook:</strong> <a href={contact.facebook} target="_blank" className="text-yellow-400 underline">{contact.facebook}</a></li>
            </ul>
        </div>
    );
};

export default ContactMe;
