const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Inspection = require('../../models/Inspection');
const ReportGenerator = require('../../services/reportGenerator');
const emailService = require('../../services/emailService');
const User = require('../../models/User');

// @route   POST api/inspections
// @desc    Schedule a new inspection
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('date', 'Date is required').not().isEmpty(),
      check('time', 'Time is required').not().isEmpty(),
      check('type', 'Type must be general, damage, or maintenance').isIn([
        'general',
        'damage',
        'maintenance',
      ]),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { date, time, type, notes } = req.body;
      const user = await User.findById(req.user.id);

      // Create new inspection
      const inspection = new Inspection({
        user: req.user.id,
        date,
        time,
        type,
        notes,
      });

      await inspection.save();

      // Send confirmation email
      await emailService.sendInspectionConfirmation(inspection, user.email);

      res.json(inspection);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/inspections
// @desc    Get all inspections for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const inspections = await Inspection.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(inspections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/inspections/:id
// @desc    Get inspection by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id);

    if (!inspection) {
      return res.status(404).json({ msg: 'Inspection not found' });
    }

    // Make sure user owns inspection
    if (inspection.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(inspection);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Inspection not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/inspections/:id
// @desc    Update inspection
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id);

    if (!inspection) {
      return res.status(404).json({ msg: 'Inspection not found' });
    }

    // Make sure user owns inspection
    if (inspection.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update fields
    const updateFields = {};
    const allowedFields = ['date', 'time', 'type', 'status', 'notes'];
    
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    }

    const updatedInspection = await Inspection.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json(updatedInspection);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Inspection not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/inspections/:id
// @desc    Delete inspection
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id);

    if (!inspection) {
      return res.status(404).json({ msg: 'Inspection not found' });
    }

    // Make sure user owns inspection
    if (inspection.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await inspection.remove();
    res.json({ msg: 'Inspection removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Inspection not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/inspections/:id/complete
// @desc    Complete an inspection and add findings
// @access  Private
router.put(
  '/:id/complete',
  [
    auth,
    [
      check('findings', 'Findings are required').not().isEmpty(),
      check('recommendations', 'Recommendations are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const inspection = await Inspection.findById(req.params.id);
      const user = await User.findById(inspection.user);

      if (!inspection) {
        return res.status(404).json({ msg: 'Inspection not found' });
      }

      const { findings, recommendations, inspector } = req.body;

      inspection.status = 'completed';
      inspection.findings = findings;
      inspection.recommendations = recommendations;
      if (inspector) {
        inspection.inspector = inspector;
      }

      // Generate inspection report
      const reportGenerator = new ReportGenerator(inspection);
      const report = await reportGenerator.generateReport();
      inspection.report = report;

      await inspection.save();

      // Send email with report
      await emailService.sendInspectionReport(inspection, user.email, report.url);

      res.json(inspection);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Inspection not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/inspections/:id/reschedule
// @desc    Reschedule an inspection
// @access  Private
router.put(
  '/:id/reschedule',
  [
    auth,
    [
      check('date', 'Date is required').not().isEmpty(),
      check('time', 'Time is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const inspection = await Inspection.findById(req.params.id);
      const user = await User.findById(inspection.user);

      if (!inspection) {
        return res.status(404).json({ msg: 'Inspection not found' });
      }

      // Make sure user owns inspection
      if (inspection.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      const { date, time } = req.body;
      inspection.date = date;
      inspection.time = time;

      await inspection.save();

      // Send rescheduling notification
      await emailService.sendInspectionUpdate(inspection, user.email, 'rescheduled');

      res.json(inspection);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Inspection not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/inspections/:id/cancel
// @desc    Cancel an inspection
// @access  Private
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id);
    const user = await User.findById(inspection.user);

    if (!inspection) {
      return res.status(404).json({ msg: 'Inspection not found' });
    }

    // Make sure user owns inspection
    if (inspection.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    inspection.status = 'cancelled';
    await inspection.save();

    // Send cancellation notification
    await emailService.sendInspectionUpdate(inspection, user.email, 'cancelled');

    res.json(inspection);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Inspection not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
