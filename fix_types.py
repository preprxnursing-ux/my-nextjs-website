f = open("app/ai-tutor/page.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    "const selectExam = (exam) => {",
    "const selectExam = (exam: typeof EXAMS[0]) => {"
)
c = c.replace(
    "const send = async (text) => {",
    "const send = async (text?: string) => {"
)
c = c.replace(
    "const msg = text || input;",
    "const msg = (text || input) as string;"
)
f = open("app/ai-tutor/page.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
