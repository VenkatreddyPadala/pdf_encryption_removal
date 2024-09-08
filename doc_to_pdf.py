import sys
from docx2pdf import convert

def convert_docx_to_pdf(docx_path, pdf_path):
    convert(docx_path, pdf_path)

if __name__ == '__main__':
    docx_path = sys.argv[1]
    pdf_path = sys.argv[2]
    convert_docx_to_pdf(docx_path, pdf_path)
