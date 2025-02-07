import React from 'react';
import { Mail, Phone, Linkedin, Github, Facebook } from 'lucide-react';

const ContactMeM: React.FC = () => {
  const content =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('content') || '{}')
      : {};

  const contact = content.contact || {};

  return (
    <div className="flex flex-col items-left gap-4 bg-black p-6 rounded-lg text-white w-full max-w-sm mx-auto">
      {/* Email */}
      <a href={`mailto:${contact.email}`}>
        <div className="flex items-center gap-3">
          <Mail size={24} />
          <span>{contact.email || 'Email'}</span>
        </div>
      </a>

      {/* Phone */}
      <a href={`tel:${contact.phone}`}>
        <div className="flex items-center gap-3">
          <Phone size={24} />
          <span>{contact.phone || 'Phone'}</span>
        </div>
      </a>

      {/* LinkedIn */}
      <a href={contact.linkedin}>
        <div className="flex items-center gap-3">
          <Linkedin size={24} />
          <span>LinkedIn</span>
        </div>
      </a>

      {/* GitHub */}
      <a href={contact.github}>
        <div className="flex items-center gap-3">
          <Github size={24} />
          <span>GitHub</span>
        </div>
      </a>

      {/* Facebook */}
      <a href={contact.facebook}>
        <div className="flex items-center gap-3">
          <Facebook size={24} />
          <span>Facebook</span>
        </div>
      </a>
    </div>
  );
};

export default ContactMeM;
