const fs = require('fs');
const path = require("path");
const solc = require('solc');

const directory = './';

new Promise(function (resolve, reject) {
    fs.readdir(directory, function (err, files) {
        if (err) {
            reject(err);
        } else {
            resolve(files);
        }
    });
}).then(function (files) {
    return Promise.all(files.filter(function (name) {
        return name.toLowerCase().endsWith('.sol');
    }).map(function (name) {
        const filename = path.join(directory, name);
        return new Promise(function (resolve, reject) {
            fs.readFile(filename, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }).then(function (source) {
            return {
                name: name,
                source: source.toString()
            };
        });
    }));
}).then(function (nameContentMappings) {
    return nameContentMappings.reduce(function (accumulator, currentValue) {
        accumulator[currentValue.name] = currentValue.source;
        return accumulator;
    }, {});
}).then(function (sources) {
    const allCompiled = solc.compile({sources: sources}, 1);
    const jsonified = {};
    for (var contractName in allCompiled.contracts) {
        var contract = allCompiled.contracts[contractName];
        jsonified[contractName] = {
            abi: JSON.parse(contract.interface),
            bytecode: contract.bytecode
        };
    }
    return new Promise((resolve, reject) => {
        fs.writeFile('compiled.json', JSON.stringify(jsonified), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
});