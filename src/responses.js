const fs = require('fs');  // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCats = (request, response, acceptedTypes) => {
  const cat = {
    name: 'Bob',
    age: 4
  };

  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<name>${cat.name}</name>`;
    xmlString += `<age>${cat.age}</age>`;
    xmlString += '</response>';

    return respond(request, response, xmlString, 'text/xml');
  }

  const catString = JSON.stringify(cat);
  return respond(request, response, catString, 'application/json');
};

module.exports = {
  getCats,
  getIndex
};
