f = open("components/ChatbotWidget.tsx", "r", encoding="utf-8")
lines = f.readlines()
f.close()

# Find and fix the broken message lines - rebuild clean
new_lines = []
skip = False
for i, line in enumerate(lines):
    if 'content: "Hi! I am your Nursing Exams AI Tutor.' in line or (skip and ']\n' == line.strip() + '\n'):
        if 'content: "Hi!' in line:
            new_lines.append('    { role: "assistant", content: "Hi! I am your Nursing Exams AI Tutor. Visit prenclex.com/ai-tutor for a personalised experience. Or ask me anything: fluid and electrolytes, pharmacology questions, NCLEX / TEAS / HESI / CCRN help, practice questions." }\n')
            skip = True
        elif skip and line.strip() == ']':
            new_lines.append('  ]);\n')
            skip = False
        # skip broken lines in between
    elif not skip:
        new_lines.append(line)

f = open("components/ChatbotWidget.tsx", "w", encoding="utf-8")
f.writelines(new_lines)
f.close()
print("Done")
