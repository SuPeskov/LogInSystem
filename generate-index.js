const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const rootDir = './PWP_Baza-2.0';
const index = [];

function processElement(element, path, indexData) {
  const tag = element.tagName.toLowerCase();
  const id = element.id;
  const text = element.textContent.replace(/\s+/g, ' ').trim();
  
  if (text && (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'p' || tag === 'li')) {
    indexData.push({
      path: path,
      anchor: id || null,
      text: text,
      tag: tag
    });
  }
}

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
      const relativePath = path.relative(rootDir, filePath);
      const elements = dom.window.document.querySelectorAll('h1, h2, h3, p, li');
      
      const pageIndex = [];
      elements.forEach(el => processElement(el, relativePath, pageIndex));
      
      index.push({
        path: relativePath,
        content: dom.window.document.body.textContent.replace(/\s+/g, ' '),
        elements: pageIndex
      });
    }
  });
}

processDirectory(rootDir);
fs.writeFileSync('search-index.json', JSON.stringify(index));