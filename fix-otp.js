const fs = require('fs');
let f = fs.readFileSync('app/auth/verify/page.tsx','utf8');

f = f.replace(
  `  function handleOtpInput(i: number, val: string) {
    if (!/^\\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) {
      otpRefs.current[i + 1]?.focus();
    } else if (val && i === 5) {
      handleVerify(next.join(""));
    }
  }`,
  `  function handleOtpInput(i: number, val: string) {
    if (!/^\\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) {
      otpRefs.current[i + 1]?.focus();
    } else if (val && i === 5) {
      const code = next.join("");
      if (code.length === 6) setTimeout(() => handleVerify(code), 300);
    }
  }`
);

fs.writeFileSync('app/auth/verify/page.tsx', f, 'utf8');
console.log('Done');
