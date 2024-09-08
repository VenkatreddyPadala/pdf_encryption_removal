#PDF Decryptor & Encryptor
You can visit the application here: <a href="https://pdf-encryption-removal.onrender.com/">Click here</a>

PDF Decryptor & Encryptor is a web-based application that allows users to both decrypt and encrypt PDF files. The application is built using Node.js with Express for the backend, and Python scripts that leverage the PyPDF2 library for the decryption and encryption processes.

Features
Upload PDF: Users can upload password-protected or non-protected PDF files.
Enter Password: Users must provide the correct password to decrypt the PDF, or a new password to encrypt the PDF.
Download Processed PDF: The decrypted or encrypted PDF is available for download immediately after processing.
Technologies Used
Node.js & Express: Backend server to handle file uploads and serve static files.
Multer: Middleware for handling multipart/form-data, used for uploading files.
Python & PyPDF2: Python scripts used to encrypt and decrypt PDF files.
HTML/CSS: Basic frontend to interact with the application.
Installation
To run this project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/VenkatreddyPadala/pdf_encryption_removal.git
cd pdf-decryptor
Install Node.js dependencies:

bash
Copy code
npm install
Install Python dependencies: Ensure you have Python installed, then install PyPDF2:

bash
Copy code
pip install PyPDF2
Create required directories:

bash
Copy code
mkdir uploads decrypted encrypted
Start the server:

bash
Copy code
node server.js
Access the application: Open your browser and go to http://localhost:3000.

Usage
Decrypt a PDF
Upload a password-protected PDF file.
Enter the password for the PDF.
Click "Decrypt PDF".
Download the decrypted PDF file once the process is complete.
Encrypt a PDF
Upload a PDF file (it can be non-password protected).
Enter a password to encrypt the PDF.
Click "Encrypt PDF".
Download the encrypted PDF file once the process is complete.
Project Structure
php
Copy code
pdf-decryptor/
│
├── public/                  # Static files (HTML, CSS, JavaScript)
│   ├── index.html
│   └── styles.css
│
├── uploads/                 # Uploaded files (temporary storage)
│
├── decrypted/               # Decrypted files (temporary storage)
│
├── encrypted/               # Encrypted files (temporary storage)
│
├── decrypt_pdf.py           # Python script for PDF decryption
│
├── encrypt_pdf.py           # Python script for PDF encryption
│
├── server.js                # Main server file
│
├── package.json             # Node.js dependencies
│
└── README.md                # Project documentation
Python Scripts
Decrypt PDF
The decrypt_pdf.py script uses the PyPDF2 library to decrypt PDF files. It takes three arguments:

input_pdf: Path to the input PDF file.
output_pdf: Path to save the decrypted PDF file.
password: The password to decrypt the PDF.
The script checks if the PDF is encrypted and attempts to decrypt it with the provided password. If successful, the decrypted PDF is saved to the specified output path.

Encrypt PDF
The encrypt_pdf.py script uses the PyPDF2 library to encrypt PDF files. It also takes three arguments:

input_pdf: Path to the input PDF file.
output_pdf: Path to save the encrypted PDF file.
password: The password to encrypt the PDF.
The script applies the specified password to the PDF and saves the encrypted file to the specified output path.

Error Handling
Incorrect Password: If the password is incorrect or the PDF cannot be decrypted, an error message is displayed.
File Errors: The server handles file-related errors, such as issues during upload or download.
Encryption Errors: If encryption fails due to an invalid file or other issues, an error is returned.
