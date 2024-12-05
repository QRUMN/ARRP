const nodemailer = require('nodemailer');
const { format } = require('date-fns');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendInspectionConfirmation(inspection, userEmail) {
    const formattedDate = format(new Date(inspection.date), 'MMMM d, yyyy');
    const emailContent = {
      from: '"Roof Restore Pro" <noreply@roofrestorepro.com>',
      to: userEmail,
      subject: 'Roof Inspection Scheduled',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A63F03;">Your Roof Inspection is Scheduled</h2>
          <p>Thank you for scheduling a roof inspection with Roof Restore Pro. Here are your inspection details:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${inspection.time}</p>
            <p><strong>Type:</strong> ${this.getInspectionTypeLabel(inspection.type)}</p>
          </div>

          <h3>What to Expect</h3>
          <ul>
            <li>Our inspector will arrive at the scheduled time</li>
            <li>The inspection typically takes 45-60 minutes</li>
            <li>You'll receive a detailed report of findings</li>
            <li>We'll discuss any immediate concerns and recommended actions</li>
          </ul>

          <p style="color: #666;">
            Need to reschedule? Please contact us at least 24 hours before your appointment.
          </p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              This is an automated message from Roof Restore Pro. Please do not reply to this email.
            </p>
          </div>
        </div>
      `
    };

    return this.transporter.sendMail(emailContent);
  }

  async sendInspectionReminder(inspection, userEmail) {
    const formattedDate = format(new Date(inspection.date), 'MMMM d, yyyy');
    const emailContent = {
      from: '"Roof Restore Pro" <noreply@roofrestorepro.com>',
      to: userEmail,
      subject: 'Reminder: Upcoming Roof Inspection',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A63F03;">Reminder: Your Roof Inspection is Tomorrow</h2>
          <p>This is a friendly reminder about your scheduled roof inspection:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${inspection.time}</p>
            <p><strong>Type:</strong> ${this.getInspectionTypeLabel(inspection.type)}</p>
          </div>

          <p>Please ensure there is clear access to your roof for our inspector.</p>

          <p style="color: #666;">
            Need to reschedule? Please contact us as soon as possible.
          </p>
        </div>
      `
    };

    return this.transporter.sendMail(emailContent);
  }

  async sendInspectionReport(inspection, userEmail, reportUrl) {
    const formattedDate = format(new Date(inspection.date), 'MMMM d, yyyy');
    const emailContent = {
      from: '"Roof Restore Pro" <noreply@roofrestorepro.com>',
      to: userEmail,
      subject: 'Your Roof Inspection Report is Ready',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A63F03;">Your Roof Inspection Report is Ready</h2>
          <p>Thank you for choosing Roof Restore Pro. Your inspection report from ${formattedDate} is now available.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Inspection Date:</strong> ${formattedDate}</p>
            <p><strong>Type:</strong> ${this.getInspectionTypeLabel(inspection.type)}</p>
            <p><strong>Inspector:</strong> ${inspection.inspector?.name || 'N/A'}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${reportUrl}" 
               style="background-color: #A63F03; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
              View Full Report
            </a>
          </div>

          <p>If you have any questions about your report, please don't hesitate to contact us.</p>
        </div>
      `
    };

    return this.transporter.sendMail(emailContent);
  }

  async sendInspectionUpdate(inspection, userEmail, updateType) {
    const formattedDate = format(new Date(inspection.date), 'MMMM d, yyyy');
    let subject, message;

    switch (updateType) {
      case 'rescheduled':
        subject = 'Your Roof Inspection Has Been Rescheduled';
        message = `Your roof inspection has been rescheduled to ${formattedDate} at ${inspection.time}.`;
        break;
      case 'cancelled':
        subject = 'Your Roof Inspection Has Been Cancelled';
        message = `Your roof inspection scheduled for ${formattedDate} has been cancelled.`;
        break;
      default:
        subject = 'Update: Your Roof Inspection';
        message = `There has been an update to your roof inspection scheduled for ${formattedDate}.`;
    }

    const emailContent = {
      from: '"Roof Restore Pro" <noreply@roofrestorepro.com>',
      to: userEmail,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A63F03;">${subject}</h2>
          <p>${message}</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${inspection.time}</p>
            <p><strong>Type:</strong> ${this.getInspectionTypeLabel(inspection.type)}</p>
          </div>

          <p>If you have any questions, please contact our support team.</p>
        </div>
      `
    };

    return this.transporter.sendMail(emailContent);
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

module.exports = new EmailService();
