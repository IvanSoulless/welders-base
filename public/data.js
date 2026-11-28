
function escapeHTML(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, character => entities[character]);
}

function normalize(value) {
  return value.normalize('NFKC').toUpperCase().replaceAll('Ё', 'Е').trim().replace(/\s+/g, ' ');
}

function findWelders(records, query) {
  const result = new Map();
  for (const group of query.split(/[,;\r\n\t]+/).map(normalize).filter(Boolean)) {
    const tokens = group.split(' ');
    for (const record of records) {
      if (tokens.includes(record.stamp) ||
        (group.length >= 2 && (record.stamp.startsWith(group) ||
          tokens.every(token => normalize(record.fio).includes(token))))) {
        result.set(record.stamp, record);
      }
    }
  }
  return [...result.values()];
}

function parseSignature(key) {
  const file = key.split('/').at(-1);
  const match = /^([A-Za-z0-9]{1,24})\s*-\s*(.+)\.png$/iu.exec(file);
  if (!match || !match[2].trim()) return null;
  return { stamp: match[1].toUpperCase(), fio: match[2].trim(), key };
}

function excelRows(records, headers = ['Клеймо', 'ФИО']) {
  const cell = value => {
    const text = value.replace(/[\t\r\n]/g, ' ');
    return /^\s*[=+\-@]/.test(text) ? "'" + text : text;
  };
  return [ headers, ...records.map(record => [record.stamp, record.fio]) ]
    .map(row => row.map(cell).join('\t')).join('\r\n');
}
