const fs = require('fs');
const pdf = require('pdf-parse');

function extractTextFromPDF(pdfFilePath) {
    let dataBuffer = fs.readFileSync(pdfFilePath);

    pdf(dataBuffer).then(function(data) {
        console.log(data.text);
    }).catch(function(error) {
        console.error('Error parsing PDF:', error);
    });
}

// Replace 'path/to/your/pdf-file.pdf' with the path to your PDF file
try {
    console.log(`1`)
    extractTextFromPDF('C:/Users/adria/Downloads/26-30-I-1-Acta-Mvsei-Napocensis-preistorie-istorie-arheologie-1994_040.pdf');
} catch (error) {
    console.error('Error reading PDF file:', error);
}
