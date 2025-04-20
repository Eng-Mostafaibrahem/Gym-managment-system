import { DataTypes } from 'sequelize';
import {sequelize} from '../db-connection.js';  // تأكد من مسار الاتصال بقاعدة البيانات

const Member = sequelize.define('Member', {
  member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  national_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'freeze'),
    allowNull: false,
  },
  start_membership: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_membership: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  membership_cost: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  trainer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Member;
