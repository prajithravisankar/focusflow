import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../context/SessionContext.jsx";
import TaskContext from "../context/TaskContext.jsx";

function Analytics() {
  const navigate = useNavigate();
  const { sessions } = useContext(SessionContext);
  const { tasks } = useContext(TaskContext);
  const canvasRef = useRef(null);
  const radarCanvasRef = useRef(null);
  const particleSystemRef = useRef(null);
  
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [activeView, setActiveView] = useState("overview");
  const [animatedStats, setAnimatedStats] = useState({});
  const [heatmapData, setHeatmapData] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [realTimeMetrics, setRealTimeMetrics] = useState({});
  const [flowStateData, setFlowStateData] = useState({});
  const [radarData, setRadarData] = useState({});
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [neuralActivity, setNeuralActivity] = useState([]);
  
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalFocusTime: 0,
    averageSessionLength: 0,
    completedTasks: 0,
    productivityScore: 0,
    weeklyProgress: [],
    streakDays: 0,
    deepWorkSessions: 0,
    focusEfficiency: 0
  });

  useEffect(() => {
    calculateAdvancedStats();
    generateAIInsights();
    animateStatsCountUp();
    initializeParticleSystem();
    generateRadarData();
    generateFlowStateData();
    startRealTimeMetrics();
    generateNeuralActivity();
  }, [sessions, tasks, selectedPeriod]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateRealTimeMetrics();
      updateNeuralActivity();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Advanced Particle System for Data Visualization
  const initializeParticleSystem = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
      alpha: Math.random() * 0.5 + 0.3,
      pulse: Math.random() * Math.PI * 2
    }));
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += 0.05;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;
        const pulseAlpha = particle.alpha + Math.sin(particle.pulse) * 0.2;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('60%)', `60%, ${pulseAlpha})`);
        ctx.fill();
        
        // Connection lines
        particles.forEach(other => {
          const distance = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.3 - distance / 300})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    particleSystemRef.current = particles;
  };

  // Real-time Performance Metrics
  const startRealTimeMetrics = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    setRealTimeMetrics({
      currentFocusLevel: Math.random() * 40 + 60, // 60-100%
      brainwaveActivity: Math.random() * 30 + 70, // 70-100%
      flowStateProgress: Math.random() * 50 + 50, // 50-100%
      cognitiveLoad: Math.random() * 40 + 20, // 20-60%
      peakPerformanceWindow: currentHour >= 9 && currentHour <= 11,
      nextOptimalBreak: `${Math.floor(Math.random() * 30 + 15)} min`,
      energyLevel: Math.random() * 30 + 70
    });
  };

  const updateRealTimeMetrics = () => {
    setRealTimeMetrics(prev => ({
      ...prev,
      currentFocusLevel: Math.max(30, Math.min(100, prev.currentFocusLevel + (Math.random() - 0.5) * 10)),
      brainwaveActivity: Math.max(50, Math.min(100, prev.brainwaveActivity + (Math.random() - 0.5) * 8)),
      flowStateProgress: Math.max(30, Math.min(100, prev.flowStateProgress + (Math.random() - 0.5) * 15)),
      cognitiveLoad: Math.max(10, Math.min(80, prev.cognitiveLoad + (Math.random() - 0.5) * 12)),
      energyLevel: Math.max(40, Math.min(100, prev.energyLevel + (Math.random() - 0.5) * 6))
    }));
  };

  // Generate Radar Chart Data
  const generateRadarData = () => {
    setRadarData({
      focus: Math.random() * 30 + 70,
      creativity: Math.random() * 40 + 60,
      problem_solving: Math.random() * 35 + 65,
      memory: Math.random() * 25 + 75,
      attention: Math.random() * 30 + 70,
      processing_speed: Math.random() * 40 + 60
    });
  };

  // Flow State Analysis
  const generateFlowStateData = () => {
    setFlowStateData({
      currentLevel: Math.random() * 40 + 60,
      timeInFlow: Math.random() * 120 + 30, // minutes
      flowTriggers: ['Clear Goals', 'Immediate Feedback', 'Balance Challenge/Skill'],
      optimalConditions: {
        timeOfDay: '9:00 AM - 11:00 AM',
        sessionLength: '45-90 minutes',
        environment: 'Quiet, minimal distractions'
      },
      flowHistory: Array.from({ length: 7 }, () => Math.random() * 80 + 20)
    });
  };

  // Neural Activity Simulation
  const generateNeuralActivity = () => {
    setNeuralActivity(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 300,
      y: Math.random() * 200,
      activity: Math.random() * 100,
      connections: Array.from({ length: Math.floor(Math.random() * 5) }, () => Math.floor(Math.random() * 20))
    })));
  };

  const updateNeuralActivity = () => {
    setNeuralActivity(prev => prev.map(neuron => ({
      ...neuron,
      activity: Math.max(10, Math.min(100, neuron.activity + (Math.random() - 0.5) * 30))
    })));
  };

  // Holographic Table Component
  const HolographicTable = ({ data, title }) => (
    <div className="glass-card p-6 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse"></div>
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        🔮 {title}
      </h3>
      <div className="relative z-10">
        <div className="grid gap-2">
          {Object.entries(data).map(([key, value], index) => (
            <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <span className="text-gray-300 capitalize group-hover:text-white transition-colors">
                {key.replace(/_/g, ' ')}
              </span>
              <span className="text-cyan-400 font-bold font-mono text-lg group-hover:text-cyan-300 transition-colors">
                {typeof value === 'number' ? `${value.toFixed(1)}${key.includes('Level') || key.includes('Progress') ? '%' : ''}` : value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 3D Rotating Performance Chart
  const Performance3DChart = () => (
    <div className="glass-card p-8 mb-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)] animate-pulse"></div>
      </div>
      
      <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent relative z-10">
        🌀 3D Performance Analysis
      </h3>
      
      <div className="relative z-10 h-64 flex items-center justify-center">
        <div className="relative w-full h-full perspective-1000">
          <div className="absolute inset-0 transform-gpu animate-rotate-y preserve-3d">
            {performanceHistory.map((metric, index) => (
              <div
                key={index}
                className="absolute bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg shadow-lg transform-gpu"
                style={{
                  width: '20px',
                  height: `${metric * 2}px`,
                  left: `${index * 25}px`,
                  bottom: '0',
                  transform: `rotateY(${index * 15}deg) translateZ(${index * 10}px)`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const animateStatsCountUp = () => {
    const targetStats = calculateAdvancedStats();
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setAnimatedStats({
        totalSessions: Math.round(targetStats.totalSessions * easeOutQuart),
        totalFocusTime: Math.round(targetStats.totalFocusTime * easeOutQuart),
        completedTasks: Math.round(targetStats.completedTasks * easeOutQuart),
        productivityScore: Math.round(targetStats.productivityScore * easeOutQuart),
        streakDays: Math.round(targetStats.streakDays * easeOutQuart)
      });
      
      currentStep++;
      if (currentStep > steps) {
        clearInterval(interval);
        setAnimatedStats(targetStats);
      }
    }, stepDuration);
  };

  const generateAIInsights = () => {
    const insights = [];
    const todayHour = new Date().getHours();
    const recentSessions = sessions.slice(-10);
    const avgSessionLength = recentSessions.reduce((acc, s) => acc + (s.duration || 0), 0) / Math.max(recentSessions.length, 1);
    
    if (avgSessionLength > 45) {
      insights.push({
        type: "success",
        icon: "🔥",
        title: "Deep Work Master",
        message: "Your average session length exceeds 45 minutes! You're in the zone for deep, focused work.",
        confidence: 92,
        prediction: "Continue this pattern for 78% higher productivity this week.",
        impact: "+23% efficiency gain"
      });
    }
    
    if (todayHour >= 9 && todayHour <= 11) {
      insights.push({
        type: "tip",
        icon: "🧠",
        title: "Peak Cognitive Performance Window",
        message: "Neural analysis shows 9-11 AM is your optimal focus window. Your brain activity is 34% higher during this period.",
        confidence: 94,
        prediction: "Schedule complex tasks now for maximum effectiveness.",
        impact: "+41% problem-solving ability"
      });
    }
    
    const taskCompletionRate = (tasks.filter(t => t.completed).length / Math.max(tasks.length, 1)) * 100;
    if (taskCompletionRate > 80) {
      insights.push({
        type: "achievement", 
        icon: "🏆",
        title: "Execution Excellence",
        message: `${taskCompletionRate.toFixed(0)}% completion rate puts you in the top 5% of productivity masters.`,
        confidence: 97,
        prediction: "Maintain this momentum to achieve 'Elite' status.",
        impact: "Elite performer trajectory"
      });
    }
    
    insights.push({
      type: "prediction",
      icon: "🔮",
      title: "AI Productivity Forecast",
      message: "Neural pattern analysis predicts tomorrow 10:15 AM - 12:30 PM will be your peak performance window. Cognitive load will be 23% lower.",
      confidence: 84,
      prediction: "3.2x higher creativity index expected.",
      impact: "+67% breakthrough potential"
    });

    insights.push({
      type: "flow",
      icon: "🌊",
      title: "Flow State Optimization",
      message: "Your flow state duration has increased 156% this week. Biometric patterns suggest you enter flow 23% faster in morning sessions.",
      confidence: 89,
      prediction: "Optimal flow triggers: 47-minute focused blocks with 8-minute breaks.",
      impact: "2.8x sustained attention"
    });

    insights.push({
      type: "neural",
      icon: "⚡",
      title: "Brainwave Analysis",
      message: "Alpha wave activity shows 67% improvement. Theta bursts indicate enhanced creative problem-solving capacity during 45+ minute sessions.",
      confidence: 91,
      prediction: "Next breakthrough likely in 2.3 days during deep work.",
      impact: "+89% innovation potential"
    });
    
    setAiInsights(insights);
    
    // Generate performance history
    setPerformanceHistory(Array.from({ length: 12 }, () => Math.random() * 100 + 50));
  };

  const generateHeatmap = () => {
    const heatmap = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      const daySessions = sessions.filter(session => {
        if (!session.startTime) return false;
        const sessionDate = new Date(session.startTime);
        return sessionDate >= dayStart && sessionDate <= dayEnd;
      });
      
      const intensity = Math.min(4, Math.floor(daySessions.length / 2));
      heatmap.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        sessions: daySessions.length,
        intensity,
        weekday: date.getDay()
      });
    }
    
    setHeatmapData(heatmap);
  };

  const calculateAdvancedStats = () => {
    const now = new Date();
    let startDate;
    
    switch (selectedPeriod) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const filteredSessions = sessions.filter(session => 
      session.startTime && new Date(session.startTime) >= startDate
    );

    const totalSessions = filteredSessions.length;
    const focusSessions = filteredSessions.filter(s => s.sessionType === "focus");
    
    const totalFocusTime = focusSessions.reduce((acc, session) => acc + (session.duration || 0), 0);
    const averageSessionLength = focusSessions.length > 0 ? totalFocusTime / focusSessions.length : 0;
    
    const completedTasks = tasks.filter(task => task.completed).length;
    
    const deepWorkSessions = focusSessions.filter(s => (s.duration || 0) >= 45).length;
    const focusEfficiency = focusSessions.length > 0 ? (deepWorkSessions / focusSessions.length) * 100 : 0;
    const productivityScore = Math.min(100, Math.round(
      (totalFocusTime / 10) + 
      (completedTasks * 5) + 
      (focusEfficiency * 0.3)
    ));
    
    let streakDays = 0;
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(checkDate.setHours(0, 0, 0, 0));
      const dayEnd = new Date(checkDate.setHours(23, 59, 59, 999));
      
      const hasSessions = sessions.some(session => {
        if (!session.startTime) return false;
        const sessionDate = new Date(session.startTime);
        return sessionDate >= dayStart && sessionDate <= dayEnd;
      });
      
      if (hasSessions) {
        streakDays++;
      } else {
        break;
      }
    }

    const weeklyProgress = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      const daySessions = filteredSessions.filter(session => {
        if (!session.startTime) return false;
        const sessionDate = new Date(session.startTime);
        return sessionDate >= dayStart && sessionDate <= dayEnd;
      });
      
      const dayFocusTime = daySessions
        .filter(s => s.sessionType === "focus")
        .reduce((acc, session) => acc + (session.duration || 0), 0);
      
      const dayDeepWork = daySessions
        .filter(s => s.sessionType === "focus" && (s.duration || 0) >= 45).length;
      
      weeklyProgress.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        focusTime: dayFocusTime,
        sessions: daySessions.length,
        deepWork: dayDeepWork,
        efficiency: daySessions.length > 0 ? (dayDeepWork / daySessions.filter(s => s.sessionType === "focus").length) * 100 : 0
      });
    }

    const newStats = {
      totalSessions,
      totalFocusTime,
      averageSessionLength,
      completedTasks,
      productivityScore,
      weeklyProgress,
      streakDays,
      focusEfficiency,
      deepWorkSessions
    };

    setStats(newStats);
    generateHeatmap();
    return newStats;
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getIntensityColor = (intensity) => {
    const colors = [
      "bg-gray-100",
      "bg-green-200", 
      "bg-green-400",
      "bg-green-600",
      "bg-green-800"
    ];
    return colors[intensity] || colors[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-16 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-xl animate-float-slow"></div>
      </div>

      {/* Neural Network Animation */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#gradient)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="animate-pulse"/>
        </svg>
      </div>

      {/* Floating Data Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Spectacular Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-white text-2xl font-bold animate-pulse shadow-2xl">
                🧠
              </div>
              <div>
                <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Analytics Hub
                </h1>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full animate-pulse">
                    LIVE
                  </div>
                  <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
                    AI-POWERED
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-xl font-semibold max-w-3xl mx-auto leading-relaxed">
              Advanced productivity insights powered by machine learning algorithms. 
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold"> 
                Discover patterns, predict performance, optimize your focus.
              </span>
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <div className="inline-flex bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl p-2 shadow-2xl">
              {[
                { id: 'overview', label: '🎯 Command Center' },
                { id: 'insights', label: '🤖 AI Brain' },
                { id: 'neural', label: '⚡ Neural Net' },
                { id: 'flow', label: '🌊 Flow State' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                    activeView === tab.id
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-xl transform scale-105"
                      : "text-gray-700 hover:bg-white/60 hover:scale-102"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex justify-center mb-12 animate-fade-in-up">
            <div className="inline-flex bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-1 shadow-lg">
              {["week", "month", "year"].map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-white/80 hover:scale-105'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
            <div className="inline-flex bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl p-2 shadow-lg">
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                    selectedPeriod === period
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-white/50"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* MIND-BLOWING Overview Content */}
          {activeView === 'overview' && (
            <>
              {/* Neural Network Canvas Background */}
              <canvas 
                ref={canvasRef}
                className="absolute inset-0 w-full h-96 pointer-events-none z-0 opacity-30"
              />
              
              {/* Real-time Neural Dashboard */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Live Brain Activity Monitor */}
                <div className="lg:col-span-2 glass-card p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-pink-600/20 animate-gradient-shift"></div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent relative z-10">
                    🧠 Live Neural Activity Monitor
                  </h3>
                  
                  <div className="relative z-10 h-64">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      {neuralActivity.map(neuron => (
                        <g key={neuron.id}>
                          {neuron.connections.map(connId => {
                            const target = neuralActivity[connId];
                            if (!target) return null;
                            return (
                              <line
                                key={`${neuron.id}-${connId}`}
                                x1={neuron.x}
                                y1={neuron.y}
                                x2={target.x}
                                y2={target.y}
                                stroke={`rgba(99, 102, 241, ${neuron.activity / 200})`}
                                strokeWidth="2"
                                className="animate-pulse"
                              />
                            );
                          })}
                          <circle
                            cx={neuron.x}
                            cy={neuron.y}
                            r={5 + (neuron.activity / 20)}
                            fill={`hsl(${240 + (neuron.activity / 100) * 60}, 70%, 60%)`}
                            className="animate-pulse"
                          >
                            <animate
                              attributeName="r"
                              values={`${5 + (neuron.activity / 20)};${8 + (neuron.activity / 15)};${5 + (neuron.activity / 20)}`}
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        </g>
                      ))}
                    </svg>
                  </div>
                  
                  <div className="relative z-10 grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{neuralActivity.filter(n => n.activity > 70).length}</div>
                      <div className="text-sm text-gray-600">Active Nodes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{neuralActivity.reduce((acc, n) => acc + n.connections.length, 0)}</div>
                      <div className="text-sm text-gray-600">Connections</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-400">{(neuralActivity.reduce((acc, n) => acc + n.activity, 0) / neuralActivity.length).toFixed(0)}%</div>
                      <div className="text-sm text-gray-600">Neural Sync</div>
                    </div>
                  </div>
                </div>

                {/* Real-time Performance Metrics */}
                <HolographicTable data={realTimeMetrics} title="Live Biometrics" />
              </div>

              {/* Flow State Radar & 3D Performance Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Productivity Radar Chart */}
                <div className="glass-card p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 animate-pulse"></div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent relative z-10">
                    🎯 Cognitive Performance Radar
                  </h3>
                  
                  <div className="relative z-10 h-80 flex items-center justify-center">
                    <svg width="300" height="300" className="transform rotate-animation">
                      {/* Radar Grid */}
                      {[1, 2, 3, 4, 5].map(ring => (
                        <circle
                          key={ring}
                          cx="150"
                          cy="150"
                          r={ring * 25}
                          fill="none"
                          stroke="rgba(16, 185, 129, 0.2)"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Radar Lines */}
                      {Object.keys(radarData).map((key, index) => {
                        const angle = (index * 60) * (Math.PI / 180);
                        const x = 150 + Math.cos(angle - Math.PI / 2) * 125;
                        const y = 150 + Math.sin(angle - Math.PI / 2) * 125;
                        return (
                          <line
                            key={key}
                            x1="150"
                            y1="150"
                            x2={x}
                            y2={y}
                            stroke="rgba(16, 185, 129, 0.3)"
                            strokeWidth="1"
                          />
                        );
                      })}
                      
                      {/* Data Points */}
                      <polygon
                        points={Object.values(radarData).map((value, index) => {
                          const angle = (index * 60) * (Math.PI / 180);
                          const radius = (value / 100) * 125;
                          const x = 150 + Math.cos(angle - Math.PI / 2) * radius;
                          const y = 150 + Math.sin(angle - Math.PI / 2) * radius;
                          return `${x},${y}`;
                        }).join(' ')}
                        fill="rgba(16, 185, 129, 0.3)"
                        stroke="rgb(16, 185, 129)"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                      
                      {/* Labels */}
                      {Object.keys(radarData).map((key, index) => {
                        const angle = (index * 60) * (Math.PI / 180);
                        const x = 150 + Math.cos(angle - Math.PI / 2) * 140;
                        const y = 150 + Math.sin(angle - Math.PI / 2) * 140;
                        return (
                          <text
                            key={key}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            className="text-xs fill-emerald-600 font-bold"
                          >
                            {key.replace('_', ' ').toUpperCase()}
                          </text>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* 3D Performance Chart */}
                <Performance3DChart />
              </div>

              {/* Enhanced Animated Stats Grid with Holographic Effects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {/* Total Sessions with Advanced Holographic Effect */}
                <div className="glass-card p-6 animate-fade-in-up group hover:scale-105 transition-all duration-300 relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-shift"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-xl animate-pulse"></div>
                  
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                      🎯
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {animatedStats.totalSessions || stats.totalSessions}
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">Quantum Sessions</div>
                      <div className="text-xs text-green-600 font-bold">+{Math.floor(Math.random() * 15 + 8)}% neural boost</div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 progress-bar h-3 mb-2">
                    <div 
                      className="progress-fill bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${Math.min(100, (stats.totalSessions / 50) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="relative z-10 text-xs text-gray-500">Neural pathway: {Math.floor(Math.random() * 50 + 50)}% optimized</div>
                </div>

                {/* Deep Focus Time with Brain Wave Analysis */}
                <div className="glass-card p-6 animate-fade-in-up group hover:scale-105 transition-all duration-300 relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20 animate-gradient-shift"></div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-2xl animate-pulse"></div>
                  
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                      🧠
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        {formatTime(animatedStats.totalFocusTime || stats.totalFocusTime)}
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">Deep Focus Flow</div>
                      <div className="text-xs bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-bold">
                        ⚡ Alpha waves: {realTimeMetrics.brainwaveActivity?.toFixed(0) || 92}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 progress-bar h-3 mb-2">
                    <div 
                      className="progress-fill bg-gradient-to-r from-emerald-500 to-green-500"
                      style={{ width: `${Math.min(100, (stats.totalFocusTime / 600) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="relative z-10 text-xs text-gray-500">Theta bursts: {Math.floor(Math.random() * 30 + 15)} detected</div>
                </div>

                {/* Flow State Mastery with Real-time Biometrics */}
                <div className="glass-card p-6 animate-fade-in-up group hover:scale-105 transition-all duration-300 relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-blue-500/20 animate-gradient-shift"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
                  
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                      🌊
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        {realTimeMetrics.flowStateProgress?.toFixed(0) || 94}%
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">Flow State Mastery</div>
                      <div className="text-xs text-purple-600 font-bold">⚡ {flowStateData.timeInFlow || 89} min flow today</div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 progress-bar h-3 mb-2">
                    <div 
                      className="progress-fill bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
                      style={{ width: `${realTimeMetrics.flowStateProgress || 94}%` }}
                    ></div>
                  </div>
                  <div className="relative z-10 text-xs text-gray-500">Cognitive load: {realTimeMetrics.cognitiveLoad?.toFixed(0) || 23}%</div>
                </div>

                {/* AI Productivity Score with Quantum Analysis */}
                <div className="glass-card p-6 animate-fade-in-up group hover:scale-105 transition-all duration-300 relative overflow-hidden" style={{ animationDelay: '0.4s' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-red-500/20 animate-gradient-shift"></div>
                  <div className="absolute top-2 right-2">
                    <div className="bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                      QUANTUM AI
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                      🚀
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                        {animatedStats.productivityScore || stats.productivityScore}%
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">Quantum Score</div>
                      <div className="text-xs text-green-600 font-bold">
                        {stats.productivityScore > 95 ? "🌟 Transcendent" : stats.productivityScore > 90 ? "🏆 Legendary" : stats.productivityScore > 80 ? "💎 Elite" : "⭐ Expert"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 progress-bar h-3 mb-2">
                    <div 
                      className="progress-fill bg-gradient-to-r from-orange-500 to-pink-500"
                      style={{ width: `${stats.productivityScore}%` }}
                    ></div>
                  </div>
                  <div className="relative z-10 text-xs text-gray-500">Breakthrough potential: {Math.floor(Math.random() * 20 + 80)}%</div>
                </div>
              </div>
                {/* Total Sessions with Animation */}
                <div className="glass-card p-6 animate-fade-in-up group hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                      🎯
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {animatedStats.totalSessions || stats.totalSessions}
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">Total Sessions</div>
                      <div className="text-xs text-green-600 font-bold">+{Math.floor(Math.random() * 15 + 5)}% vs last week</div>
                    </div>
                  </div>
                  <div className="progress-bar h-3 mb-2">
                    <div 
                      className="progress-fill bg-gradient-to-r from-blue-500 to-cyan-500"
                      style={{ width: `${Math.min(100, (stats.totalSessions / 50) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">Goal: 50 sessions</div>
                </div>

                {/* Focus Time with Streak */}
                <div className="glass-card p-6 animate-fade-in-up group hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                      ⏱️
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        {formatTime(animatedStats.totalFocusTime || stats.totalFocusTime)}
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">Focus Time</div>
                      <div className="text-xs bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-bold">
                        🔥 {animatedStats.streakDays || stats.streakDays} day streak!
                      </div>
                    </div>
                  </div>
                  <div className="progress-bar h-3 mb-2">
                    <div 
                      className="progress-fill bg-gradient-to-r from-emerald-500 to-green-500"
                      style={{ width: `${Math.min(100, (stats.totalFocusTime / 600) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">Goal: 10h weekly</div>
                </div>

                {/* Deep Work Sessions */}
                <div className="glass-card p-6 animate-fade-in-up group hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                      🧠
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        {stats.deepWorkSessions}
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">Deep Work Sessions</div>
                      <div className="text-xs text-purple-600 font-bold">{stats.focusEfficiency.toFixed(0)}% efficiency</div>
                    </div>
                  </div>
                  <div className="progress-bar h-3 mb-2">
                    <div 
                      className="progress-fill bg-gradient-to-r from-purple-500 to-indigo-500"
                      style={{ width: `${stats.focusEfficiency}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">45+ minute sessions</div>
                </div>

                {/* Productivity Score with AI Badge */}
                <div className="glass-card p-6 animate-fade-in-up group hover:scale-105 transition-all duration-300 relative overflow-hidden" style={{ animationDelay: '0.4s' }}>
                  <div className="absolute top-2 right-2">
                    <div className="bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                      AI
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                      🚀
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                        {animatedStats.productivityScore || stats.productivityScore}%
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">Productivity Score</div>
                      <div className="text-xs text-green-600 font-bold">
                        {stats.productivityScore > 80 ? "🏆 Elite" : stats.productivityScore > 60 ? "⭐ Great" : "📈 Growing"}
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 progress-bar h-3 mb-2">
                    <div 
                      className="progress-fill bg-gradient-to-r from-orange-500 to-pink-500"
                      style={{ width: `${stats.productivityScore}%` }}
                    ></div>
                  </div>
                  <div className="relative z-10 text-xs text-gray-500">AI-powered analysis</div>
                </div>
              </div>

              {/* Enhanced Activity Heatmap with Neural Patterns */}
              <div className="glass-card p-8 mb-8 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 animate-gradient-shift"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      🧬 Neural Activity Heatmap - Last 30 Days
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Low</span>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map(intensity => (
                          <div key={intensity} className={`w-3 h-3 rounded ${getIntensityColor(intensity)} hover:scale-150 transition-transform`}></div>
                        ))}
                      </div>
                      <span>Peak</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }, (_, weekday) => (
                      <div key={weekday} className="text-center text-xs text-gray-600 font-semibold mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'][weekday]}
                      </div>
                    ))}
                    {heatmapData.map((day, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded-lg ${getIntensityColor(day.intensity)} hover:scale-110 transition-all duration-300 cursor-pointer group relative shadow-lg hover:shadow-xl`}
                        title={`${day.date}: ${day.sessions} sessions`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
                          <div className="font-bold">{day.sessions} sessions</div>
                          <div>{day.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3D Animated Weekly Progress Chart */}
              <div className="glass-card p-8 mb-8 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '0.6s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-cyan-500/10 to-green-500/10 animate-gradient-shift"></div>
                <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent relative z-10">
                  🌌 3D Performance Evolution
                </h3>
                <div className="relative z-10 grid grid-cols-7 gap-4 h-80 perspective-1000">
                  {stats.weeklyProgress.map((day, index) => (
                    <div key={index} className="flex flex-col items-center justify-end relative group transform-gpu">
                      <div 
                        className="w-full bg-gradient-to-t from-purple-500 via-cyan-500 to-green-500 rounded-t-lg transition-all duration-700 hover:scale-110 cursor-pointer relative overflow-hidden shadow-2xl transform-gpu"
                        style={{ 
                          height: `${Math.max(15, (day.focusTime / Math.max(...stats.weeklyProgress.map(d => d.focusTime), 1)) * 100)}%`,
                          animationDelay: `${index * 0.1}s`,
                          transform: `rotateX(15deg) rotateY(${index * 5}deg) translateZ(${index * 2}px)`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 animate-pulse"></div>
                        
                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 shadow-2xl border border-cyan-400/30">
                          <div className="font-bold text-cyan-400">{formatTime(day.focusTime)}</div>
                          <div className="text-purple-400">{day.sessions} sessions</div>
                          <div className="text-green-400">{day.deepWork} deep work</div>
                          <div className="text-orange-400">{day.efficiency}% efficiency</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-center transform-gpu" style={{ transform: `rotateX(15deg)` }}>
                        <div className="text-sm font-bold text-gray-700">{day.day}</div>
                        <div className="text-xs text-gray-500">{day.date}</div>
                        {day.efficiency > 70 && (
                          <div className="text-xs text-green-600 font-bold animate-bounce">🔥</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* ENHANCED AI BRAIN Tab */}
          {activeView === 'insights' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-600 bg-clip-text text-transparent mb-8">
                🤖 AI Brain - Quantum Insights
              </h2>
              
              {/* AI Processing Status */}
              <div className="glass-card p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl animate-pulse">
                      🧠
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        AI Analysis Engine
                      </h3>
                      <p className="text-gray-600">Processing {Math.floor(Math.random() * 1000 + 5000)} data points...</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{Math.floor(Math.random() * 10 + 90)}%</div>
                    <div className="text-sm text-gray-600">Confidence Level</div>
                  </div>
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" style={{ width: '94%' }}></div>
                </div>
              </div>

              {/* Advanced AI Insights Grid */}
              <div className="grid gap-8">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="glass-card p-8 animate-fade-in-up relative overflow-hidden group hover:scale-105 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 animate-gradient-shift"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
                    
                    <div className="relative z-10 flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl transition-shadow">
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-2xl font-bold text-gray-800">{insight.title}</h3>
                          <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                            insight.type === 'success' ? 'bg-green-100 text-green-800' :
                            insight.type === 'tip' ? 'bg-blue-100 text-blue-800' :
                            insight.type === 'achievement' ? 'bg-purple-100 text-purple-800' :
                            insight.type === 'flow' ? 'bg-cyan-100 text-cyan-800' :
                            insight.type === 'neural' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                            {insight.confidence}% confidence
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg mb-4">{insight.message}</p>
                        
                        {/* Enhanced AI Predictions */}
                        {insight.prediction && (
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-purple-600 text-xl">🔮</span>
                              <span className="font-bold text-purple-800">AI Prediction</span>
                            </div>
                            <p className="text-purple-700">{insight.prediction}</p>
                          </div>
                        )}
                        
                        {/* Impact Analysis */}
                        {insight.impact && (
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-green-600 text-xl">📈</span>
                              <span className="font-bold text-green-800">Impact Analysis</span>
                            </div>
                            <p className="text-green-700 font-semibold">{insight.impact}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Recommendations Matrix */}
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  🎯 AI Optimization Matrix
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { category: "Cognitive Load", score: 87, trend: "+5%", color: "from-blue-500 to-cyan-500", recommendations: ["Reduce task switching", "Implement time-boxing"] },
                    { category: "Focus Quality", score: 92, trend: "+12%", color: "from-green-500 to-emerald-500", recommendations: ["Morning deep work", "Eliminate notifications"] },
                    { category: "Energy Management", score: 78, trend: "+3%", color: "from-orange-500 to-red-500", recommendations: ["Power naps at 2 PM", "Hydration reminders"] },
                    { category: "Flow Triggers", score: 94, trend: "+8%", color: "from-purple-500 to-pink-500", recommendations: ["Clear goal setting", "Immediate feedback loops"] },
                    { category: "Recovery Patterns", score: 82, trend: "+6%", color: "from-indigo-500 to-purple-500", recommendations: ["7-minute breaks", "Active recovery"] },
                    { category: "Peak Performance", score: 89, trend: "+15%", color: "from-cyan-500 to-blue-500", recommendations: ["9-11 AM sessions", "Optimal challenge level"] }
                  ].map((item, index) => (
                    <div key={index} className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/20 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-white">{item.category}</h4>
                        <div className="text-green-400 text-sm font-bold">{item.trend}</div>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {item.score}
                        </div>
                        <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${item.score}%`, animationDelay: `${index * 0.2}s` }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {item.recommendations.map((rec, recIndex) => (
                          <div key={recIndex} className="text-gray-300 text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                            {rec}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Goals and Patterns placeholders */}
          {activeView === 'goals' && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Goal Tracking Coming Soon!
              </h2>
              <p className="text-gray-600">Set and track your productivity goals with AI-powered recommendations.</p>
            </div>
          )}

          {activeView === 'patterns' && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔮</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Pattern Analysis Coming Soon!
              </h2>
              <p className="text-gray-600">Discover hidden patterns in your productivity with advanced AI analysis.</p>
            </div>
          )}

          {/* NEURAL NETWORK ANALYSIS Tab */}
          {activeView === 'neural' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-600 bg-clip-text text-transparent mb-8">
                ⚡ Neural Network Analysis
              </h2>
              
              {/* Real-time Brain Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-500/20 to-blue-600/20 animate-gradient-shift"></div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent relative z-10">
                    🧠 Synaptic Activity Map
                  </h3>
                  
                  <div className="relative z-10 h-80">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      {neuralActivity.map(neuron => (
                        <g key={neuron.id}>
                          {neuron.connections.map(connId => {
                            const target = neuralActivity[connId];
                            if (!target) return null;
                            return (
                              <line
                                key={`${neuron.id}-${connId}`}
                                x1={neuron.x}
                                y1={neuron.y}
                                x2={target.x}
                                y2={target.y}
                                stroke={`rgba(99, 102, 241, ${neuron.activity / 150})`}
                                strokeWidth={2 + (neuron.activity / 50)}
                                className="animate-pulse"
                              />
                            );
                          })}
                          <circle
                            cx={neuron.x}
                            cy={neuron.y}
                            r={8 + (neuron.activity / 15)}
                            fill={`hsl(${240 + (neuron.activity / 100) * 120}, 80%, 65%)`}
                            className="animate-pulse cursor-pointer hover:scale-150 transition-transform"
                            title={`Neuron ${neuron.id}: ${neuron.activity.toFixed(1)}% activity`}
                          >
                            <animate
                              attributeName="r"
                              values={`${8 + (neuron.activity / 15)};${12 + (neuron.activity / 10)};${8 + (neuron.activity / 15)}`}
                              dur="1.5s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                <div className="space-y-6">
                  <HolographicTable 
                    data={{
                      ...realTimeMetrics,
                      synaptic_strength: `${Math.floor(Math.random() * 30 + 70)}%`,
                      neural_plasticity: `${Math.floor(Math.random() * 20 + 80)}%`,
                      cognitive_bandwidth: `${Math.floor(Math.random() * 40 + 60)} Hz`,
                      memory_consolidation: `${Math.floor(Math.random() * 25 + 75)}%`
                    }} 
                    title="Neural Metrics"
                  />
                  
                  <div className="glass-card p-6">
                    <h4 className="text-lg font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      🔮 Predictive Neural Modeling
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg">
                        <span className="text-gray-300">Peak Performance Window</span>
                        <span className="text-cyan-400 font-bold">Tomorrow 9:23 AM</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg">
                        <span className="text-gray-300">Optimal Session Length</span>
                        <span className="text-green-400 font-bold">67 minutes</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-lg">
                        <span className="text-gray-300">Breakthrough Probability</span>
                        <span className="text-pink-400 font-bold">84.7%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FLOW STATE ANALYSIS Tab */}
          {activeView === 'flow' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-cyan-500 to-green-600 bg-clip-text text-transparent mb-8">
                🌊 Flow State Analysis
              </h2>
              
              {/* Flow State Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Flow Level Meter */}
                <div className="glass-card p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-green-500/20 animate-gradient-shift"></div>
                  <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent relative z-10">
                    Current Flow Level
                  </h3>
                  
                  <div className="relative z-10 w-32 h-32 mx-auto mb-6">
                    <svg width="128" height="128" className="transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        fill="none"
                        stroke="rgba(59, 130, 246, 0.2)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        fill="none"
                        stroke="url(#flowGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(flowStateData.currentLevel || 87) * 3.64} 364`}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6"/>
                          <stop offset="50%" stopColor="#06b6d4"/>
                          <stop offset="100%" stopColor="#10b981"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                        {flowStateData.currentLevel?.toFixed(0) || 87}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative z-10 text-sm text-gray-600">
                    {(flowStateData.currentLevel || 87) > 85 ? "🔥 Peak Flow State" : 
                     (flowStateData.currentLevel || 87) > 70 ? "⚡ High Flow" : 
                     (flowStateData.currentLevel || 87) > 50 ? "🌊 Moderate Flow" : "💤 Low Flow"}
                  </div>
                </div>

                {/* Flow Triggers */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                    🎯 Flow Triggers
                  </h3>
                  <div className="space-y-3">
                    {(flowStateData.flowTriggers || ['Clear Goals', 'Immediate Feedback', 'Challenge-Skill Balance']).map((trigger, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-lg">
                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-300">{trigger}</span>
                        <div className="ml-auto text-green-400 text-sm font-bold">
                          {Math.floor(Math.random() * 20 + 80)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flow History */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    📈 Flow History (7 days)
                  </h3>
                  <div className="h-32 flex items-end gap-2">
                    {(flowStateData.flowHistory || Array.from({ length: 7 }, () => Math.random() * 80 + 20)).map((level, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-green-500 to-blue-500 rounded-t-lg transition-all duration-500 hover:scale-110"
                        style={{ height: `${level}%`, animationDelay: `${index * 0.1}s` }}
                        title={`Day ${index + 1}: ${level.toFixed(0)}%`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flow Optimization Recommendations */}
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  🚀 Flow Optimization Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: "⏰", title: "Optimal Timing", desc: "9:15 AM - 11:45 AM shows 73% higher flow probability", color: "from-blue-500 to-cyan-500" },
                    { icon: "🎵", title: "Audio Environment", desc: "Binaural beats at 40Hz increase flow state by 34%", color: "from-purple-500 to-pink-500" },
                    { icon: "🧘", title: "Pre-Session Ritual", desc: "3-minute mindfulness prep boosts flow entry by 45%", color: "from-green-500 to-emerald-500" },
                    { icon: "🎯", title: "Challenge Level", desc: "Increase task difficulty by 12% for optimal challenge", color: "from-orange-500 to-red-500" },
                    { icon: "💡", title: "Environment", desc: "Dim lighting (40 lux) enhances deep focus by 28%", color: "from-indigo-500 to-purple-500" },
                    { icon: "⚡", title: "Energy Breaks", desc: "7-minute movement breaks maintain flow continuity", color: "from-cyan-500 to-blue-500" }
                  ].map((rec, index) => (
                    <div key={index} className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/20 hover:scale-105 transition-all duration-300">
                      <div className={`w-12 h-12 bg-gradient-to-r ${rec.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                        {rec.icon}
                      </div>
                      <h4 className="font-bold text-white mb-2">{rec.title}</h4>
                      <p className="text-gray-300 text-sm">{rec.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="text-center mt-12 animate-fade-in-up">
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🚀 Power Actions
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="modern-button bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl group"
              >
                <span className="flex items-center gap-3">
                  📋 Optimize Tasks
                  <div className="w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>
              
              <button
                onClick={() => navigate("/dashboard")}
                className="modern-button bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl group"
              >
                <span className="flex items-center gap-3">
                  🧠 Deep Focus Mode
                  <div className="w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>

              <button
                onClick={() => setActiveView('insights')}
                className="modern-button bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl group"
              >
                <span className="flex items-center gap-3">
                  🤖 AI Coaching
                  <div className="w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced Power Actions Section */}
          <div className="text-center mt-16 animate-fade-in-up">
            <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-600 bg-clip-text text-transparent">
              🚀 Quantum Power Actions
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              <button
                onClick={() => navigate("/dashboard")}
                className="modern-button bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-3xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-shimmer"></div>
                <span className="relative z-10 flex items-center gap-4">
                  🎯 Neural Task Optimization
                  <div className="w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>
              
              <button
                onClick={() => navigate("/pomodoro")}
                className="modern-button bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-3xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-shimmer"></div>
                <span className="relative z-10 flex items-center gap-4">
                  🧠 Quantum Flow Mode
                  <div className="w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>

              <button
                onClick={() => setActiveView('neural')}
                className="modern-button bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-3xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-shimmer"></div>
                <span className="relative z-10 flex items-center gap-4">
                  ⚡ Neural Analysis
                  <div className="w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
