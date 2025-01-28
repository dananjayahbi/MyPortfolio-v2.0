// components/sections/ContactMe.tsx
import { color } from 'framer-motion';
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
        maxWidth: '100%',
        overflowX: 'hidden',
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
            alignItems: 'center',
          }}
        >
          <img
            src="https://img.icons8.com/lollipop/50/new-post.png"
            alt="facebook"
            width="30px"
          />{' '}
          <strong>Email:</strong>
          <a
            href={`mailto:${contact.email}`}
            className="text-yellow-400 underline"
          >
            {contact.email}
          </a>
        </li>
        <hr style={{ borderColor: '#444544' }} />
        <li
          style={{
            display: 'flex',
            flexDirection: isMobileView ? 'column' : 'row',
            gap: '8px',
            justifyContent: isMobileView ? 'center' : 'flex-start',
            alignItems: 'center',
          }}
        >
          <img
            src="https://img.icons8.com/doodle/48/phone--v1.png"
            alt="facebook"
            width="40px"
          />{' '}
          <strong>Phone:</strong>
          <a
            href={`tel:${contact.phone}`}
            className="text-yellow-400 underline"
          >
            {contact.phone}
          </a>
        </li>
        <hr style={{ borderColor: '#444544' }} />
        <li
          style={{
            display: 'flex',
            flexDirection: isMobileView ? 'column' : 'row',
            gap: '8px',
            justifyContent: isMobileView ? 'center' : 'flex-start',
            alignItems: 'center',
          }}
        >
          <img
            src="https://img.icons8.com/color/480/linkedin.png"
            alt="facebook"
            width="30px"
          />{' '}
          <strong>LinkedIn:</strong>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline"
          >
            View Account ↗️
          </a>
        </li>
        <hr style={{ borderColor: '#444544' }} />
        <li
          style={{
            display: 'flex',
            flexDirection: isMobileView ? 'column' : 'row',
            gap: '8px',
            justifyContent: isMobileView ? 'center' : 'flex-start',
            alignItems: 'center',
          }}
        >
          <img
            src="https://img.icons8.com/3d-fluency/94/github.png"
            alt="facebook"
            width="30px"
          />{' '}
          <strong>GitHub:</strong>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline"
          >
            {contact.github}
          </a>
        </li>
        <hr style={{ borderColor: '#444544' }} />
        <li
          style={{
            display: 'flex',
            flexDirection: isMobileView ? 'column' : 'row',
            gap: '8px',
            justifyContent: isMobileView ? 'center' : 'flex-start',
            alignItems: 'center',
          }}
        >
          <img
            src="https://img.icons8.com/color/480/facebook-new.png"
            alt="facebook"
            width="30px"
          />{' '}
          <strong>Facebook:</strong>
          <a
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline"
          >
            View Account ↗️
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactMe;
