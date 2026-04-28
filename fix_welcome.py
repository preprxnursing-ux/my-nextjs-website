f = open("components/ChatbotWidget.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    '{ role: "assistant", content: "Hi! I am your NCLEX AI Tutor.\n\nTry asking me:\n• Explain fluid and electrolytes\n• Give me a pharmacology question\n• What are NCLEX priority strategies?\n• Generate a practice question on cardiac meds" }',
    '{ role: "assistant", content: "Hi! I am your NCLEX AI Tutor. Try asking me: Explain fluid and electrolytes, Give me a pharmacology question, NCLEX priority strategies, or Generate a practice question." }'
)
f = open("components/ChatbotWidget.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
