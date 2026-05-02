Write-Host "=== PRE-NCLEX NURSING - PROJECT CONTEXT ===" -ForegroundColor Cyan
Write-Host ""
Write-Host ">> STACK & REPO" -ForegroundColor Yellow
Write-Host "   Site:     https://my-nextjs-website-s7xe.vercel.app"
Write-Host "   GitHub:   github.com/preprxnursing-ux/my-nextjs-website (main)"
Write-Host "   Supabase: ijpfpdnepvmyvaiwgbht.supabase.co"
Write-Host "   Stack:    Next.js App Router + Supabase + Tailwind + TypeScript + Vercel"
Write-Host ""
Write-Host ">> PAGES COMPLETED" -ForegroundColor Yellow
$done = @("Home","Quiz","Results","Review","History","Dashboard","Pricing","Features","Courses index","Testimonials","Contact","FAQ","Blog","Auth (login/signup/2FA)")
$done | ForEach-Object { Write-Host "   [x] $_" -ForegroundColor Green }
Write-Host ""
Write-Host ">> STILL TO BUILD" -ForegroundColor Yellow
$todo = @("Pre-Nursing page (TEAS 7, HESI A2)","Nursing School page","NCLEX-RN page","NCLEX-PN page","Nurse Practitioner (FNP) page","CCRN page","Lemon Squeezy / Stripe payment integration","Claude API AI Tutor integration")
$todo | ForEach-Object { Write-Host "   [ ] $_" -ForegroundColor Red }
Write-Host ""
Write-Host ">> RECENT WORK" -ForegroundColor Yellow
Write-Host "   - Fixed navbar: Nursing TV restored, AI Tutor NEW button added"
Write-Host "   - Fixed navbar sticky hiding on desktop scroll"
Write-Host "   - Mobile layout overhaul (in progress)"
Write-Host "   - ChatbotWidget built and injected into layout"
Write-Host ""
Write-Host ">> DESIGN SYSTEM" -ForegroundColor Yellow
Write-Host "   Bg:      #060f1e / #0d1f35 / #0e2540 (dark navy)"
Write-Host "   Accent:  #0ea5e9 / #38bdf8"
Write-Host "   Fonts:   Cormorant Garamond (headings) + Plus Jakarta Sans (body)"
Write-Host ""
Write-Host ">> WORKING RULES" -ForegroundColor Yellow
Write-Host "   - Always provide FULL file replacements, never partial edits"
Write-Host "   - All terminal commands in PowerShell syntax"
Write-Host "   - TypeScript check: npx tsc --noEmit 2>&1 | Select-Object -First 20"
Write-Host "   - Deploy: git add . && git commit -m '...' && git push"
Write-Host ""
Write-Host "=== PASTE THIS OUTPUT TO CLAUDE TO CONTINUE ===" -ForegroundColor Cyan
