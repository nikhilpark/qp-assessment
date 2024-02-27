import express from 'express';
import AdminRouter from './routes/Admin.routes';
import UserRouter from './routes/User.routes';
import sequelize from './config/sequelize';
import './models/associations'

const PORT = 3000;
const app = express();
app.use(express.json());


 sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
    sequelize.sync({ force: false });

  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});
app.use('/admin',AdminRouter)
app.use('/user',UserRouter)
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

