const express = require('express');
const app = express();
const router = require('./routes/baseRoutes');

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});