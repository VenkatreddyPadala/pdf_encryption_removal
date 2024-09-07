import sys
from PyPDF2 import PdfReader, PdfWriter

def encrypt_pdf(input_pdf_path, output_pdf_path, password):
    reader = PdfReader(input_pdf_path)
    writer = PdfWriter()

    # Add all pages to the writer
    for page in reader.pages:
        writer.add_page(page)

    # Encrypt the PDF with the provided password
    writer.encrypt(user_password=password)

    # Write the encrypted PDF to a new file
    with open(output_pdf_path, "wb") as encrypted_pdf_file:
        writer.write(encrypted_pdf_file)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python encrypt_pdf.py <input_pdf> <output_pdf> <password>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_pdf = sys.argv[2]
    password = sys.argv[3]

    encrypt_pdf(input_pdf, output_pdf, password)
    print(f"PDF {input_pdf} successfully encrypted with password and saved as {output_pdf}")
