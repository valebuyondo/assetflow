// In middleware/auditLog.js

const AuditLog = require('../models/AuditLog');

const auditLog = (action, entityType) => async (req, res, next) => {
  res.on('finish', async () => {
    if (res.statusCode < 400) {
      try {
        await AuditLog.create({
          user: req.user._id,
          action,
          entityType,
          entityId: req.params.id || (res.locals.newEntity && res.locals.newEntity._id),
          changes: action === 'update' ? req.body : undefined
        });
      } catch (error) {
        console.error('Error creating audit log:', error);
      }
    }
  });
  next();
};

module.exports = auditLog;