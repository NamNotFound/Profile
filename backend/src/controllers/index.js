import { FlashcardDeck, Note, Quiz, RoadmapNode, StudyRoom, User } from '../models/index.js';
import { levelFromXp, signToken } from '../utils/auth.js';

export const register = async (req, res) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({
      token: signToken(user._id),
      user,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};
export const login = async (req,res)=>{ const user = await User.findOne({email:req.body.email}); if(!user || !(await user.matchPassword(req.body.password))) return res.status(401).json({message:'Invalid'}); res.json({ token: signToken(user._id), user }); };
export const me = async (req,res)=> res.json(req.user);

export const listQuizzes = async (_req,res)=> res.json(await Quiz.find({isPublished:true}));
export const createQuiz = async (req,res)=> res.status(201).json(await Quiz.create(req.body));
export const updateQuiz = async (req,res)=> res.json(await Quiz.findByIdAndUpdate(req.params.id, req.body, {new:true}));
export const deleteQuiz = async (req,res)=> { await Quiz.findByIdAndDelete(req.params.id); res.json({ok:true}); };
export const submitQuiz = async (req,res)=>{ const quiz = await Quiz.findById(req.params.id); const score = quiz.questions.reduce((acc,q,i)=> acc + (req.body.answers?.[i]===q.correctOptionIndex?1:0),0); const user = await User.findById(req.user._id); user.xp += score*20; user.level = levelFromXp(user.xp); user.progress.quizzesCompleted += 1; await user.save(); res.json({score,total:quiz.questions.length,xpEarned:score*20,level:user.level}); };

export const listDecks = async (req,res)=> res.json(await FlashcardDeck.find({$or:[{owner:req.user._id},{isPublic:true}]}));
export const createDeck = async (req,res)=> res.status(201).json(await FlashcardDeck.create({...req.body, owner:req.user._id}));
export const reviewCard = async (req,res)=>{ const deck = await FlashcardDeck.findById(req.params.deckId); const card = deck.cards.id(req.params.cardId); card.intervalDays += 1; await deck.save(); const user = await User.findById(req.user._id); user.xp += 10; user.level = levelFromXp(user.xp); user.progress.flashcardsReviewed += 1; await user.save(); res.json({card,user}); };

export const getRoadmap = async (_req,res)=> res.json(await RoadmapNode.find().sort({order:1}));
export const createRoadmapNode = async (req,res)=> res.status(201).json(await RoadmapNode.create(req.body));
export const markRoadmapComplete = async (req,res)=>{ const node = await RoadmapNode.findById(req.params.id); const user = await User.findById(req.user._id); user.completedRoadmapNodes.addToSet(node._id); user.xp += node.xpReward; user.level = levelFromXp(user.xp); await user.save(); const nextSuggested = await RoadmapNode.findOne({order:{$gt:node.order}}).sort({order:1}); res.json({completedNode:node,nextSuggested,user}); };

export const listNotes = async (req,res)=> res.json(await Note.find({owner:req.user._id}).sort({updatedAt:-1}));
export const saveNote = async (req,res)=>{ const keywords = ((req.body.markdown||'').match(/[A-Za-z]{5,}/g)||[]).slice(0,8); const doc = req.params.id ? await Note.findOneAndUpdate({_id:req.params.id,owner:req.user._id},{...req.body,keywords},{new:true}) : await Note.create({...req.body,owner:req.user._id,keywords}); res.status(201).json(doc); };

export const leaderboard = async (_req,res)=> res.json(await User.find().sort({xp:-1}).limit(20).select('name avatar xp level dailyStreak'));
export const tutor = async (req,res)=> res.json({mode:process.env.GROK_API_KEY?'stub':'fallback',answer: `Tutor: ${req.body.question}. Suggested next topic: async/await.`});
export const adminStats = async (_req,res)=> res.json({users:await User.countDocuments(),quizzes:await Quiz.countDocuments(),flashcards:await FlashcardDeck.countDocuments(),roadmapNodes:await RoadmapNode.countDocuments()});
export const adminUsers = async (_req,res)=> res.json(await User.find().select('-password'));

const roomCode = () => Math.random().toString(36).slice(2,8).toUpperCase();
export const createRoom = async (req,res)=> res.status(201).json(await StudyRoom.create({name:req.body.name, code:roomCode(), host:req.user._id, participants:[req.user._id], pomodoro:{durationSec:1500,isRunning:false}}));
export const joinRoom = async (req,res)=>{ const room=await StudyRoom.findOne({code:req.params.code.toUpperCase()}); room.participants.addToSet(req.user._id); await room.save(); res.json(room); };
export const listRooms = async (_req,res)=> res.json(await StudyRoom.find().populate('participants','name avatar'));
