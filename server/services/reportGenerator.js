const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

class ReportGenerator {
  constructor(inspection) {
    this.inspection = inspection;
    this.doc = new PDFDocument();
  }

  async generateReport() {
    const fileName = `inspection-report-${this.inspection._id}.pdf`;
    const filePath = path.join(__dirname, '../uploads/reports', fileName);

    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(filePath);
      this.doc.pipe(stream);

      // Add company header
      this.addHeader();
      
      // Add inspection details
      this.addInspectionDetails();
      
      // Add findings and recommendations
      this.addFindingsAndRecommendations();
      
      // Add photos if available
      if (this.inspection.photos && this.inspection.photos.length > 0) {
        this.addPhotos();
      }
      
      // Add footer
      this.addFooter();

      this.doc.end();

      stream.on('finish', () => {
        resolve({
          url: `/reports/${fileName}`,
          generatedAt: new Date()
        });
      });

      stream.on('error', reject);
    });
  }

  addHeader() {
    this.doc
      .image(path.join(__dirname, '../assets/logo.png'), 50, 45, { width: 100 })
      .fontSize(20)
      .text('Roof Inspection Report', 180, 80)
      .moveDown();
  }

  addInspectionDetails() {
    this.doc
      .fontSize(14)
      .text('Inspection Details', { underline: true })
      .fontSize(12)
      .moveDown()
      .text(`Date: ${format(new Date(this.inspection.date), 'MMMM d, yyyy')}`)
      .text(`Time: ${this.inspection.time}`)
      .text(`Type: ${this.getInspectionTypeLabel(this.inspection.type)}`)
      .text(`Inspector: ${this.inspection.inspector?.name || 'N/A'}`)
      .moveDown();
  }

  addFindingsAndRecommendations() {
    // Findings
    this.doc
      .fontSize(14)
      .text('Findings', { underline: true })
      .fontSize(12)
      .moveDown()
      .text(this.inspection.findings || 'No findings recorded')
      .moveDown();

    // Recommendations
    this.doc
      .fontSize(14)
      .text('Recommendations', { underline: true })
      .fontSize(12)
      .moveDown()
      .text(this.inspection.recommendations || 'No recommendations provided')
      .moveDown();
  }

  async addPhotos() {
    this.doc
      .fontSize(14)
      .text('Inspection Photos', { underline: true })
      .moveDown();

    for (const photo of this.inspection.photos) {
      try {
        const photoPath = path.join(__dirname, '..', photo.url);
        this.doc
          .image(photoPath, {
            fit: [500, 300],
            align: 'center',
            valign: 'center'
          })
          .fontSize(10)
          .text(photo.description || '', { align: 'center' })
          .moveDown();
      } catch (error) {
        console.error(`Error adding photo: ${error.message}`);
      }
    }
  }

  addFooter() {
    const pageCount = this.doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      this.doc.switchToPage(i);
      
      // Save the current y position
      const originalY = this.doc.y;
      
      // Move to the bottom of the page
      this.doc.fontSize(10)
        .text(
          'This report is confidential and intended only for the client.',
          50,
          this.doc.page.height - 50,
          {
            width: this.doc.page.width - 100,
            align: 'center',
            color: 'grey'
          }
        )
        .text(
          `Page ${i + 1} of ${pageCount}`,
          50,
          this.doc.page.height - 30,
          {
            width: this.doc.page.width - 100,
            align: 'center',
            color: 'grey'
          }
        );
      
      // Restore the y position
      this.doc.y = originalY;
    }
  }

  getInspectionTypeLabel(type) {
    const labels = {
      general: 'General Inspection',
      damage: 'Damage Assessment',
      maintenance: 'Maintenance Check'
    };
    return labels[type] || type;
  }
}

module.exports = ReportGenerator;
