const fs = require('fs');
const crypto = require('crypto');

class SolutionService {
    constructor() {}

    writeFile(data) {
        fs.writeFile(__dirname + '/../../bin/answer.json', JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }

    decripty() {
        fs.readFile(__dirname + '/../../bin/answer.json', (err, data) => {
            if (err) throw err;

            data = JSON.parse(data);
            let text = data.cifrado;
            let displacement = data.numero_casas;

            var deciphered = "";
            for(var i = 0; i < text.length; i++) {
                var letterCharCode = text.charCodeAt(i);
                if(letterCharCode >= 97 && letterCharCode <= 122) {
                    deciphered += String.fromCharCode((letterCharCode - 97 - displacement + 26) %26 + 97 );
                } else {
                    deciphered += text[i];
                }
            }

            data.decifrado = deciphered;

            this.writeFile(data);

            this.generateHash();
        });
    }

    generateHash() {
        fs.readFile(__dirname + '/../../bin/answer.json', (err, data) => {
            if (err) throw err;

            data = JSON.parse(data);

            let deciphered = data.decifrado;
            let hash = crypto.createHash('sha1');
            hash.update(deciphered);

            data.resumo_criptografico = hash.digest('hex').toUpperCase();

            this.writeFile(data);
        });
    }
}

module.exports = SolutionService;