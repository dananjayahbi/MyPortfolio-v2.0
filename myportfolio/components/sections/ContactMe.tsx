// components/sections/ContactMe.tsx
import React from 'react';

const ContactMe = ({ windowWidth }: { windowWidth: number }) => {
  const content =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('content') || '{}')
      : {};

  const contact = content.contact || {};

  // ✅ Define styles for mobile and desktop views
  const isMobileView = windowWidth < 500;

  return (
    <div
      className="text-white leading-relaxed space-y-4"
      style={{
        padding: isMobileView ? '10px' : '20px',
        fontSize: isMobileView ? '0.9rem' : '1rem',
      }}
    >
      <ul
        className="list-none space-y-3"
        style={{ textAlign: isMobileView ? 'center' : 'left' }}
      >
        <li
          style={{
            display: 'flex',
            flexDirection: isMobileView ? 'column' : 'row',
            gap: '8px',
            justifyContent: isMobileView ? 'center' : 'flex-start',
          }}
        >
          📧 <strong>Email:</strong>
          <a
            href={`mailto:${contact.email}`}
            className="text-yellow-400 underline"
          >
            {contact.email}
          </a>
        </li>
        <li
          style={{
            display: 'flex',
            flexDirection: isMobileView ? 'column' : 'row',
            gap: '8px',
            justifyContent: isMobileView ? 'center' : 'flex-start',
          }}
        >
          📞 <strong>Phone:</strong>
          <a
            href={`tel:${contact.phone}`}
            className="text-yellow-400 underline"
          >
            {contact.phone}
          </a>
        </li>
        <li
          style={{
            display: 'flex',
            flexDirection: isMobileView ? 'column' : 'row',
            gap: '8px',
            justifyContent: isMobileView ? 'center' : 'flex-start',
          }}
        >
          🔗 <strong>LinkedIn:</strong>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline"
          >
            {contact.linkedin}
          </a>
        </li>
        <li
          style={{
            display: 'flex',
            flexDirection: isMobileView ? 'column' : 'row',
            gap: '8px',
            justifyContent: isMobileView ? 'center' : 'flex-start',
          }}
        >
          🐙 <strong>GitHub:</strong>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline"
          >
            {contact.github}
          </a>
        </li>
        <li
          style={{
            display: 'flex',
            flexDirection: isMobileView ? 'column' : 'row',
            gap: '8px',
            justifyContent: isMobileView ? 'center' : 'flex-start',
          }}
        >
          📘 <strong>Facebook:</strong>
          <a
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline"
          >
            {contact.facebook}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactMe;
