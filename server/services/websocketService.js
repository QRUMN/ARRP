const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

class WebSocketService {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map(); // Map to store client connections with their user IDs

    this.wss.on('connection', (ws, req) => {
      this.handleConnection(ws, req);
    });
  }

  handleConnection(ws, req) {
    // Extract token from query string
    const url = new URL(req.url, 'ws://localhost');
    const token = url.searchParams.get('token');

    if (!token) {
      ws.close(4001, 'Authentication token required');
      return;
    }

    try {
      // Verify token and get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.user.id;

      // Store the connection with user ID
      this.clients.set(userId, ws);

      // Handle client messages
      ws.on('message', (message) => {
        this.handleMessage(userId, message);
      });

      // Handle client disconnection
      ws.on('close', () => {
        this.clients.delete(userId);
      });

      // Send initial connection success message
      ws.send(JSON.stringify({
        type: 'connection',
        status: 'success',
        message: 'Connected to WebSocket server'
      }));

    } catch (error) {
      ws.close(4002, 'Invalid authentication token');
    }
  }

  handleMessage(userId, message) {
    try {
      const data = JSON.parse(message);
      // Handle different types of messages
      switch (data.type) {
        case 'ping':
          this.sendToUser(userId, {
            type: 'pong',
            timestamp: new Date()
          });
          break;
        // Add more message type handlers as needed
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  }

  // Send notification to a specific user
  sendToUser(userId, data) {
    const client = this.clients.get(userId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  }

  // Send notification to multiple users
  sendToUsers(userIds, data) {
    userIds.forEach(userId => {
      this.sendToUser(userId, data);
    });
  }

  // Send inspection update notification
  sendInspectionUpdate(userId, inspection, updateType) {
    const notification = {
      type: 'inspection_update',
      updateType,
      inspection: {
        id: inspection._id,
        date: inspection.date,
        time: inspection.time,
        status: inspection.status,
        type: inspection.type
      },
      timestamp: new Date()
    };

    this.sendToUser(userId, notification);
  }

  // Send new report notification
  sendReportNotification(userId, inspection, reportUrl) {
    const notification = {
      type: 'report_ready',
      inspection: {
        id: inspection._id,
        date: inspection.date,
        type: inspection.type
      },
      reportUrl,
      timestamp: new Date()
    };

    this.sendToUser(userId, notification);
  }

  // Send reminder notification
  sendReminderNotification(userId, inspection) {
    const notification = {
      type: 'inspection_reminder',
      inspection: {
        id: inspection._id,
        date: inspection.date,
        time: inspection.time,
        type: inspection.type
      },
      message: 'You have an inspection scheduled for tomorrow',
      timestamp: new Date()
    };

    this.sendToUser(userId, notification);
  }

  // Broadcast message to all connected clients
  broadcast(data) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

module.exports = WebSocketService;
