// components/sections/Skills.tsx
import React from 'react';

const Skills = () => {
  return (
    <div className="text-white leading-relaxed space-y-8">
      {/* Front-end Development */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">
          🚀 Front-end Development
        </h3>
        <p>React, Next.js, HTML, CSS, JavaScript, Bootstrap, Material-UI, Ant Design, Tailwind CSS, Electron.js</p>
      </div>

      {/* Back-end Development */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">
          💡 Back-end Development
        </h3>
        <p>Node.js, Express.js, MongoDB, Python, Flask</p>
      </div>

      {/* Database Management */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">
          📊 Database Management
        </h3>
        <p>MongoDB, MySQL, Firebase, SQLite</p>
      </div>

      {/* Version Control */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">
          🔗 Version Control
        </h3>
        <p>Git, GitHub</p>
      </div>

      {/* Other Tools */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">
          🧰 Other Tools & Technologies
        </h3>
        <p>
          Postman, Figma, Photoshop, Machine Learning and Deep Learning 
          <span className="text-sm text-gray-400"> (still learning)</span>, 
          AI models fine-tuning <span className="text-sm text-gray-400">(still learning)</span>
        </p>
      </div>
    </div>
  );
};

export default Skills;
