import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  // 图书名称
  name: String,
  // 作者
  author: String,
  // 所属分类
  category: [String],
  // 评分
  score: Number,
  // 是否删除，默认为false，表示未删除
  isDel: { type: Boolean, default: false },
}, { timestamps: true });