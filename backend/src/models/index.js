import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true }, password: String, role: { type: String, default: 'user' },
  avatar: String, xp: { type: Number, default: 0 }, level: { type: Number, default: 1 }, dailyStreak: { type: Number, default: 1 },
  completedRoadmapNodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RoadmapNode' }],
  progress: { quizzesCompleted: { type: Number, default: 0 }, flashcardsReviewed: { type: Number, default: 0 } }
}, { timestamps: true });
userSchema.pre('save', async function(next){ if(!this.isModified('password')) return next(); this.password = await bcrypt.hash(this.password,10); next();});
userSchema.methods.matchPassword = function(p){ return bcrypt.compare(p,this.password); };

const quizSchema = new mongoose.Schema({ title: String, topic: String, isPublished: { type: Boolean, default: true }, questions:[{ prompt:String, options:[String], correctOptionIndex:Number, timeLimitSec:{type:Number,default:30}}]}, {timestamps:true});
const flashcardSchema = new mongoose.Schema({ title: String, owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, isPublic: Boolean, cards:[{front:String,back:String,dueAt:Date,intervalDays:{type:Number,default:1},easeFactor:{type:Number,default:2.5}}]}, {timestamps:true});
const roadmapSchema = new mongoose.Schema({ title:String, description:String, parent:{type:mongoose.Schema.Types.ObjectId,ref:'RoadmapNode',default:null}, order:Number, xpReward:{type:Number,default:40}, resources:[{label:String,url:String}] }, {timestamps:true});
const noteSchema = new mongoose.Schema({ owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, title:String, markdown:String, keywords:[String], summary:String }, {timestamps:true});
const achievementSchema = new mongoose.Schema({ code:String, title:String, description:String, xpReward:Number, criteria:String }, {timestamps:true});
const roomSchema = new mongoose.Schema({ name:String, code:{type:String,unique:true}, host:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, participants:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}], pomodoro:{durationSec:{type:Number,default:1500},isRunning:Boolean} }, {timestamps:true});

export const User = mongoose.model('User', userSchema);
export const Quiz = mongoose.model('Quiz', quizSchema);
export const FlashcardDeck = mongoose.model('FlashcardDeck', flashcardSchema);
export const RoadmapNode = mongoose.model('RoadmapNode', roadmapSchema);
export const Note = mongoose.model('Note', noteSchema);
export const Achievement = mongoose.model('Achievement', achievementSchema);
export const StudyRoom = mongoose.model('StudyRoom', roomSchema);
