f = open("components/ChatbotWidget.tsx", "r", encoding="utf-8")
c = f.read()
f.close()

# Find the broken message and replace with clean single-line string
import re
c = re.sub(
    r'content: "Hi![\s\S]*?"\s*\}\s*\]',
    'content: "Hi! I am your Nursing Exams AI Tutor. \\n\\nVisit prenclex.com/ai-tutor for a personalised experience.\\n\\nOr ask me anything:\\n- Explain fluid and electrolytes\\n- Give me a pharmacology question\\n- NCLEX / TEAS / HESI / CCRN help\\n- Generate a practice question" }\n  ]',
    c
)

f = open("components/ChatbotWidget.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
