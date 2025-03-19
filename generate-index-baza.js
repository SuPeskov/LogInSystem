// generate-index-___.js
// Запуск файла node generate-index-___.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const rootDir = './PWP_Baza-2.0/.'; // Путь к корню сайта
const index = [];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (path.extname(file) === '.html') {
      const content = fs.readFileSync(filePath, 'utf-8');
      const dom = new JSDOM(content);
      const text = dom.window.document.body.textContent.replace(/\s+/g, ' ');
      const relativePath = path.relative(rootDir, filePath);
      
      index.push({
        path: relativePath,
        content: text
      });
    }
  });
}

processDirectory(rootDir);
fs.writeFileSync('./PWP_Baza-2.0/search-index-baza.json', JSON.stringify(index));