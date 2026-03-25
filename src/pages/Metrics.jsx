import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Flame, Scale, Target, Activity } from 'lucide-react';

export default function Metrics() {
  const [inputs, setInputs] = useState({
    age: '',
    gender: 'male',
    weight: '', // in kg
    height: '', // in cm
    activity: '1.55', // Moderate by default
    goal: 'maintain'
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateMetrics = (e) => {
    e.preventDefault();
    const { age, gender, weight, height, activity, goal } = inputs;
    
    // Convert inputs to numbers
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    
    if (!w || !h || !a) return;

    // 1. Calculate BMI
    const heightInMeters = h / 100;
    const bmi = (w / (heightInMeters * heightInMeters)).toFixed(1);
    
    let bmiCategory = 'Normal';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi >= 25 && bmi < 30) bmiCategory = 'Overweight';
    else if (bmi >= 30) bmiCategory = 'Obese';

    // 2. Calculate BMR (Mifflin-St Jeor Equation)
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    // 3. Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * parseFloat(activity);

    // 4. Calculate Goal Calories
    let targetCalories = tdee;
    if (goal === 'cut') targetCalories -= 500;
    if (goal === 'bulk') targetCalories += 500;

    // 5. Calculate Macros (Standard Bodybuilding Split: 30% P / 40% C / 30% F)
    const proteinCals = targetCalories * 0.30;
    const carbCals = targetCalories * 0.40;
    const fatCals = targetCalories * 0.30;

    setResults({
      bmi,
      bmiCategory,
      calories: Math.round(targetCalories),
      protein: Math.round(proteinCals / 4), // 4 cals per gram of protein
      carbs: Math.round(carbCals / 4),      // 4 cals per gram of carbs
      fats: Math.round(fatCals / 9)         // 9 cals per gram of fat
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            Forge Your <span className="text-red-600">Numbers</span>
          </h1>
          <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm md:text-base">
            Calculate your BMI, daily caloric needs, and exact macronutrient targets.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: The Calculator Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 bg-zinc-950 border border-zinc-900 p-8"
          >
            <form onSubmit={calculateMetrics} className="space-y-6">
              
              <div className="flex gap-4 mb-8">
                <button type="button" onClick={() => setInputs({...inputs, gender: 'male'})} className={`flex-1 py-3 font-black uppercase tracking-widest border-2 transition-all ${inputs.gender === 'male' ? 'border-red-600 bg-red-600/10 text-red-500' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}>Male</button>
                <button type="button" onClick={() => setInputs({...inputs, gender: 'female'})} className={`flex-1 py-3 font-black uppercase tracking-widest border-2 transition-all ${inputs.gender === 'female' ? 'border-red-600 bg-red-600/10 text-red-500' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}>Female</button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-zinc-500">Age</label>
                  <input required type="number" name="age" value={inputs.age} onChange={handleInputChange} className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-center font-bold focus:border-red-600 focus:outline-none" placeholder="25" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-zinc-500">Weight (kg)</label>
                  <input required type="number" name="weight" value={inputs.weight} onChange={handleInputChange} className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-center font-bold focus:border-red-600 focus:outline-none" placeholder="75" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-zinc-500">Height (cm)</label>
                  <input required type="number" name="height" value={inputs.height} onChange={handleInputChange} className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-center font-bold focus:border-red-600 focus:outline-none" placeholder="180" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-black text-zinc-500">Activity Level</label>
                <select name="activity" value={inputs.activity} onChange={handleInputChange} className="w-full bg-black border border-zinc-800 px-4 py-3 text-white font-bold uppercase text-sm focus:border-red-600 focus:outline-none appearance-none">
                  <option value="1.2">Sedentary (Desk Job, Little to No Exercise)</option>
                  <option value="1.375">Lightly Active (Light Exercise 1-3 days/week)</option>
                  <option value="1.55">Moderately Active (Moderate Exercise 3-5 days/week)</option>
                  <option value="1.725">Very Active (Heavy Exercise 6-7 days/week)</option>
                  <option value="1.9">Extreme (Physical Job & Heavy Training)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-black text-zinc-500">Primary Goal</label>
                <select name="goal" value={inputs.goal} onChange={handleInputChange} className="w-full bg-black border border-zinc-800 px-4 py-3 text-white font-bold uppercase text-sm focus:border-red-600 focus:outline-none appearance-none">
                  <option value="cut">Fat Loss (Cut)</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="bulk">Build Muscle (Bulk)</option>
                </select>
              </div>

              <button type="submit" className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-700 transition-colors flex justify-center items-center gap-2 mt-8">
                <Calculator size={20} /> Calculate Protocol
              </button>
            </form>
          </motion.div>

          {/* Right Side: The Results Output */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-900 border-2 border-red-600 p-8 h-full flex flex-col justify-center"
                >
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-8 border-b border-zinc-800 pb-4">Target Acquired</h3>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-black p-6 border border-zinc-800 text-center">
                      <Scale className="text-red-600 mx-auto mb-2" size={24} />
                      <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Your BMI</p>
                      <p className="text-4xl font-black text-white">{results.bmi}</p>
                      <p className="text-red-500 text-xs uppercase font-bold mt-1">{results.bmiCategory}</p>
                    </div>
                    <div className="bg-black p-6 border border-zinc-800 text-center">
                      <Flame className="text-red-600 mx-auto mb-2" size={24} />
                      <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Daily Calories</p>
                      <p className="text-4xl font-black text-white">{results.calories}</p>
                      <p className="text-red-500 text-xs uppercase font-bold mt-1">KCAL / DAY</p>
                    </div>
                  </div>

                  <div className="bg-black p-6 border border-zinc-800">
                    <div className="flex items-center gap-2 mb-6">
                      <Target className="text-red-600" size={20} />
                      <h4 className="font-black uppercase tracking-widest">Required Macros</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm font-bold uppercase mb-1"><span>Protein</span><span className="text-red-500">{results.protein}g</span></div>
                        <div className="w-full bg-zinc-900 h-2"><div className="bg-red-600 h-2" style={{width: '30%'}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-bold uppercase mb-1"><span>Carbohydrates</span><span className="text-red-500">{results.carbs}g</span></div>
                        <div className="w-full bg-zinc-900 h-2"><div className="bg-red-600 h-2" style={{width: '40%'}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-bold uppercase mb-1"><span>Fats</span><span className="text-red-500">{results.fats}g</span></div>
                        <div className="w-full bg-zinc-900 h-2"><div className="bg-red-600 h-2" style={{width: '30%'}}></div></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-zinc-950 border border-zinc-900 h-full flex flex-col items-center justify-center p-12 text-center text-zinc-600">
                  <Activity size={48} className="mb-4 opacity-50" />
                  <p className="font-black uppercase tracking-widest text-lg mb-2">Awaiting Data</p>
                  <p className="text-sm font-bold">Input your metrics to generate your custom nutritional protocol.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}