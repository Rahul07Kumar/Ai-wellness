# 🌿 AI Wellness Recommendation Board

An AI-powered web app that generates personalized wellness tips and actionable guidance using **Google’s Gemini API**.  
Users can input their age, gender, and personal wellness goals to receive **science-backed, motivational, and practical tips** for improving their lifestyle.

---

## 🧠 1. Project Setup & Demo

### ▶️ Web Setup  
Run the following commands to start the app locally:

```bash
npm install
npm run dev
```

Visit: [http://localhost:5173/](http://localhost:5173/)

### 📱 Mobile (Optional Extension)
If building a mobile version (React Native / Expo):
- **iOS**: Open in Xcode and run on simulator/device.  
- **Android**: Run `./gradlew assembleDebug` or launch from Android Studio.

### 🎥 Demo

Example:  
> [Live Demo](https://ai-wellness-cbyr.onrender.com)

---

## 💡 2. Problem Understanding

Many people struggle to find reliable and personalized wellness advice.  
The goal is to create a platform where users receive **personalized, AI-generated wellness tips** tailored to their profile (age, gender, and goals).  

### Assumptions:
- AI-generated tips are concise, actionable, and goal-oriented.  
- User data (age, gender, goal) is stored locally (no authentication or backend).  
- Gemini API is used for generating both **short tips** and **detailed explanations**.

---

## 🤖 3. AI Prompts & Iterations

### Example Prompt for Tips:
```
You are a wellness expert. Generate exactly 5 personalized wellness tips for someone with:
Age: {age}
Gender: {gender}
Goal: {goal}

Return ONLY valid JSON in this exact format:
{
  "tips": [
    { "id": 1, "title": "Short Title", "short": "One line description", "icon": "🌅" }
  ]
}
```

### Example Prompt for Tip Details:
```
You are a wellness expert. Provide detailed guidance for this wellness tip:
Title: {tip.title}
Description: {tip.short}

Return ONLY valid JSON:
{
  "explanation": "Detailed explanation...",
  "steps": ["Step 1...", "Step 2...", "Step 3..."]
}
```

### Refinement Iterations:
- Added retries in case of API timeouts.  
- Enhanced prompt clarity to enforce JSON-only responses.  
- Included emoji icons for better visual engagement.

---

## 🧩 4. Architecture & Code Structure

```
src/
 ├── components/          → Reusable UI parts
 ├── context/             → Global state using React Context API
 ├── screens/             → Page components (ProfileScreen, TipBoard, etc.)
 ├── services/            → AI service integration (Gemini API calls)
 ├── App.tsx              → Main app component managing navigation
 ├── main.tsx             → Entry point
 └── index.css            → Global styling
```

### Key Files:
- **services/aiService.ts** → Handles API requests to Gemini, parses and structures AI responses.  
- **context/WellnessContext.tsx** → Stores user profile and wellness tips globally.  
- **screens/ProfileScreen.tsx** → Collects user data (age, gender, goals).  
- **screens/TipBoard.tsx** → Displays AI-generated tips.  
- **screens/TipDetails.tsx** → Shows detailed explanation & actionable steps.  

---

## 🖼️ 5. Screenshots / Screen Recording



1. Profile input screen
   
   <img width="90%" height="926" alt="image" src="https://github.com/user-attachments/assets/49c5c555-c29e-4bdd-b4b6-026a1909e8af" />
   <img width="90%" height="928" alt="image" src="https://github.com/user-attachments/assets/f25f9dc9-4a60-4459-8bde-20f19767ec3b" />


2. Tip board view
   
   <img width="90%" height="926" alt="image" src="https://github.com/user-attachments/assets/04f7e447-5b39-4307-97d9-432c289f3f1c" />

3. Tip details with explanation & steps

   <img width="90%" height="927" alt="image" src="https://github.com/user-attachments/assets/72d7b478-b25e-4da1-b128-ff06d3320268" />
   <img width="90%" height="929" alt="image" src="https://github.com/user-attachments/assets/fd0161f5-1202-40f7-a4b3-78a951a8be26" />

4. Saved tips
   
   <img width="90%" height="923" alt="image" src="https://github.com/user-attachments/assets/9f60b5ee-e69e-458a-a6c0-7f2bc8926dbc" />

5. **DEMO VIDEO**
   

https://github.com/user-attachments/assets/1bc13ce8-d765-497f-bf3e-7c969efe16d0



---

## 🐞 6. Known Issues / Improvements

- Some AI responses may occasionally break JSON format.  
- Need caching or persistence for generated tips.  
- Future enhancement: Add authentication & save user preferences.  
- Improve mobile responsiveness.

---

## ✨ 7. Bonus Work

- Added emoji-based tip icons for better UI feedback.  
- Smooth card animations using Tailwind transitions.  
- 3 Times retry mechanism for failed AI API calls.  
- Context-based state sharing for cleaner codebase.
- Take custom input from Users, If wellness option is not available.

---

**Author:** Rahul Kumar  
**Tech Stack:** React.js (Vite) • TypeScript • Tailwind CSS • Google Gemini API  
