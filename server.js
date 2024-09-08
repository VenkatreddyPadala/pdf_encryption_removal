const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Serve static files from the "public" directory
app.use(express.static('public'));

// Endpoint to handle PDF decryption
app.post('/decrypt', upload.single('pdfFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const pdfPath = req.file.path;
    const outputPath = path.join('decrypted', req.file.originalname);
    const password = req.body.password;

    // Call the Python script
    exec(`python decrypt_pdf.py "${pdfPath}" "${outputPath}" "${password}"`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing Python script:', error);
            return res.status(500).send('Error decrypting PDF');
        }
        if (stderr) {
            console.error('Python script stderr:', stderr);
            return res.status(500).send('Error decrypting PDF');
        }

        // Send the file for download
        res.download(outputPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('Error processing PDF');
            }

            // Clean up the uploaded and decrypted files after download
            fs.unlink(pdfPath, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting uploaded file:', unlinkErr);
            });
            fs.unlink(outputPath, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting decrypted file:', unlinkErr);
            });
        });
    });
});

// Endpoint to handle PDF encryption
app.post('/encrypt', upload.single('pdfFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const inputPdfPath = req.file.path;
    const outputPdfPath = path.join('encrypted', `Encrypted_${req.file.originalname}`);
    const password = req.body.password;

    // Ensure 'encrypted' folder exists
    if (!fs.existsSync('encrypted')) {
        fs.mkdirSync('encrypted');
    }

    // Run the Python script to encrypt the PDF
    exec(`python encrypt_pdf.py "${inputPdfPath}" "${outputPdfPath}" "${password}"`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error encrypting PDF:', error);
            return res.status(500).send('Error encrypting PDF');
        }
        if (stderr) {
            console.error('Python script stderr:', stderr);
            return res.status(500).send('Error encrypting PDF');
        }

        // Send the encrypted file for download
        res.download(outputPdfPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('Error processing PDF');
            }

            // Clean up the uploaded and encrypted files after download
            fs.unlink(inputPdfPath, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting uploaded file:', unlinkErr);
            });
            fs.unlink(outputPdfPath, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting encrypted file:', unlinkErr);
            });
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});