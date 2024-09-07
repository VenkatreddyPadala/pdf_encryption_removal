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
                res.status(500).send('Error processing PDF');
            }

            // Clean up the uploaded and decrypted files after download
            fs.unlinkSync(pdfPath);
            fs.unlinkSync(outputPath);
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
