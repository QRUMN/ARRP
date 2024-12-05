const cron = require('node-cron');
const { addDays, subDays, startOfDay, endOfDay } = require('date-fns');
const Inspection = require('../models/Inspection');
const User = require('../models/User');
const emailService = require('./emailService');

class CronService {
  constructor() {
    // Schedule daily tasks
    this.scheduleDailyTasks();
  }

  scheduleDailyTasks() {
    // Run at 9 AM every day
    cron.schedule('0 9 * * *', async () => {
      try {
        await this.sendInspectionReminders();
      } catch (error) {
        console.error('Error in daily cron job:', error);
      }
    });

    // Run at midnight every day
    cron.schedule('0 0 * * *', async () => {
      try {
        await this.checkOverdueInspections();
      } catch (error) {
        console.error('Error in midnight cron job:', error);
      }
    });
  }

  async sendInspectionReminders() {
    try {
      // Find inspections scheduled for tomorrow
      const tomorrow = addDays(new Date(), 1);
      const startOfTomorrow = startOfDay(tomorrow);
      const endOfTomorrow = endOfDay(tomorrow);

      const inspections = await Inspection.find({
        date: {
          $gte: startOfTomorrow,
          $lte: endOfTomorrow
        },
        status: 'scheduled'
      }).populate('user');

      // Send reminder emails
      for (const inspection of inspections) {
        try {
          await emailService.sendInspectionReminder(
            inspection,
            inspection.user.email
          );
          console.log(`Sent reminder for inspection ${inspection._id}`);
        } catch (error) {
          console.error(`Error sending reminder for inspection ${inspection._id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error in sendInspectionReminders:', error);
    }
  }

  async checkOverdueInspections() {
    try {
      // Find inspections that were scheduled for yesterday but not completed
      const yesterday = subDays(new Date(), 1);
      const startOfYesterday = startOfDay(yesterday);
      const endOfYesterday = endOfDay(yesterday);

      const overdueInspections = await Inspection.find({
        date: {
          $gte: startOfYesterday,
          $lte: endOfYesterday
        },
        status: 'scheduled'
      }).populate('user');

      // Update status and notify users
      for (const inspection of overdueInspections) {
        try {
          inspection.status = 'overdue';
          await inspection.save();

          // Notify user about overdue inspection
          await emailService.sendInspectionUpdate(
            inspection,
            inspection.user.email,
            'overdue'
          );
          console.log(`Updated overdue inspection ${inspection._id}`);
        } catch (error) {
          console.error(`Error processing overdue inspection ${inspection._id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error in checkOverdueInspections:', error);
    }
  }
}

module.exports = new CronService();
