const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Quiz route placeholder is available.'
    }
  });
});

module.exports = router;
