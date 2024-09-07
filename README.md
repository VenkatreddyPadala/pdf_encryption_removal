# PDF Decryptor

can visit this link <a href="https://pdf-encryption-removal.onrender.com/">Click here</a>

**PDF Decryptor** is a simple web-based application that allows users to decrypt password-protected PDF files. The application is built using Node.js with Express for the backend, and a 
Python script that leverages the `PyPDF2` library for the decryption process.

## Features

- **Upload PDF**: Users can upload a password-protected PDF file.
- **Enter Password**: Users must provide the correct password to decrypt the PDF.
- **Download Decrypted PDF**: The decrypted PDF is available for download immediately after processing.

## Technologies Used

- **Node.js & Express**: Backend server to handle file uploads and serve static files.
- **Multer**: Middleware for handling multipart/form-data, used for uploading files.
- **Python & PyPDF2**: Python script used to decrypt the PDF files.
- **HTML/CSS**: Basic frontend to interact with the application.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VenkatreddyPadala/pdf_encryption_removal.git
   cd pdf-decryptor
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Install Python dependencies:**
   Ensure you have Python installed, then install `PyPDF2`:
   ```bash
   pip install PyPDF2
   ```

4. **Create required directories:**
   ```bash
   mkdir uploads decrypted
   ```

5. **Start the server:**
   ```bash
   node server.js
   ```

6. **Access the application:**
   Open your browser and go to `http://localhost:3000`.

## Usage

1. Upload a password-protected PDF file.
2. Enter the password for the PDF.
3. Click "Decrypt PDF".
4. Download the decrypted PDF file once the process is complete.

## Project Structure

```
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
├── decrypt_pdf.py           # Python script for PDF decryption
│
├── server.js                   # Main server file
│
├── package.json             # Node.js dependencies
│
└── README.md                # Project documentation
```

## Python Script

The `decrypt_pdf.py` script uses the `PyPDF2` library to decrypt the PDF. It takes three arguments:
- `input_pdf`: Path to the input PDF file.
- `output_pdf`: Path to save the decrypted PDF file.
- `password`: The password to decrypt the PDF.

The script checks if the PDF is encrypted and attempts to decrypt it with the provided password. If successful, the decrypted PDF is saved to the specified output path.

## Error Handling

- **Incorrect Password**: If the password is incorrect or the PDF cannot be decrypted, an error message is displayed.
- **File Errors**: The server handles file-related errors, such as issues during upload or download.

## Clean-Up Process

After the file is downloaded, both the uploaded and decrypted PDF files are deleted from the server to prevent storage bloat.
