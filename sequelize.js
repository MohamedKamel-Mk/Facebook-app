import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://ucww0omwwg90shcg:c7pyMqNXLYqEPhUBVdtp@bu0ve80tljvfj0wrcc1v-mysql.services.clever-cloud.com:3306/bu0ve80tljvfj0wrcc1v', {
  dialect: 'mysql'
});

export default sequelize;
