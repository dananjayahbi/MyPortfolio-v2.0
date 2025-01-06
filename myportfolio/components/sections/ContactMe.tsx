// components/sections/ContactMe.tsx
import React from 'react';

const ContactMe = () => {
  return (
    <div className="text-white leading-relaxed space-y-4">
      <ul className="list-none space-y-3">
        <li>📧 <strong>Email:</strong> <a href="mailto:test@gmail.com" className="text-yellow-400 underline">test@gmail.com</a></li>
        <li>📞 <strong>Phone:</strong> <a href="tel:+94771234567" className="text-yellow-400 underline">+94 77 123 4567</a></li>
        <li>🔗 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/test" target="_blank" className="text-yellow-400 underline">linkedin.com/in/test</a></li>
        <li>🐙 <strong>GitHub:</strong> <a href="https://github.com/test" target="_blank" className="text-yellow-400 underline">github.com/test</a></li>
        <li>📘 <strong>Facebook:</strong> <a href="https://facebook.com/test" target="_blank" className="text-yellow-400 underline">facebook.com/test</a></li>
      </ul>
    </div>
  );
};

export default ContactMe;
