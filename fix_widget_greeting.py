f = open("components/ChatbotWidget.tsx", "r", encoding="utf-8")
c = f.read()
f.close()

# Find and replace the initial message
import re
c = re.sub(
    r'content: "Hi!.*?"(\s*}\s*\])',
    'content: "Hi! I am your Nursing Exams AI Tutor. 🎓\\n\\nFor a personalised experience visit:\\n👉 prenclex.com/ai-tutor\\n\\nOr ask me anything here:\\n• Explain fluid and electrolytes\\n• Give me a pharmacology question\\n• NCLEX / TEAS / HESI / CCRN help\\n• Generate a practice question"}\n  ]',
    c,
    flags=re.DOTALL
)

f = open("components/ChatbotWidget.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
