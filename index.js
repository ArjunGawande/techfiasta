const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();
const app = express();

sequelize
  .authenticate() 
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.error('Error connecting to the database:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});