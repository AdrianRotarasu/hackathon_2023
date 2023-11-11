

const fs = require('fs');
const pdf = require('pdf-parse');

const txtToPDF = async (pdfFilePath) =>{
    
    let dataBuffer = await fs.readFileSync(pdfFilePath);
    
    pdf(dataBuffer).then(function(data) {
        
        let dataToSened= 'Da-mi 10 intrebari pe baza textului: ';
        dataToSened= dataToSened.concat(data.text);
        //console.log(dataToSened);
        return dataToSened;
    }).catch(function(error) {
        console.error('Error parsing PDF:', error);
    });
}

// Replace 'path/to/your/pdf-file.pdf' with the path to your PDF file
try {
    txtToPDF('C:/Users/adria/Downloads/regimul-national-comunist-in-romania.pdf');
} catch (error) {
    console.error('Error reading PDF file:', error);
}

module.exports = txtToPDF; 