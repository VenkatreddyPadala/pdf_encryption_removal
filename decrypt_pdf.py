# decrypt_pdf.py
import PyPDF2
import sys

def remove_pdf_encryption(input_pdf, output_pdf, password):
    try:
        with open(input_pdf, 'rb') as input_file:
            reader = PyPDF2.PdfReader(input_file)
            
            if reader.is_encrypted:
                reader.decrypt(password)

            writer = PyPDF2.PdfWriter()
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                writer.add_page(page)

            with open(output_pdf, 'wb') as output_file:
                writer.write(output_file)
            
            print(f"Decryption successful! The decrypted PDF is saved as {output_pdf}")

    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    input_pdf = sys.argv[1]
    output_pdf = sys.argv[2]
    password = sys.argv[3]
    remove_pdf_encryption(input_pdf, output_pdf, password)
