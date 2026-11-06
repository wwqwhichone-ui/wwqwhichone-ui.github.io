# Release & Publication Checklist

**Target Site**: `https://wwqwhichone-ui.github.io`  
**Profile Repo**: `https://github.com/wwqwhichone-ui/wwqwhichone-ui`  
**Portfolio Source Repo**: `https://github.com/wwqwhichone-ui/wwqwhichone-ui.github.io`

Use this checklist before and during public deployment to verify that all personal information is factual and all automated pipelines succeed.

---

## Pre-Publication Verification (Local)

- [x] **Automated Diagnostics**: `npm run check` returns 0 errors and 0 warnings.
- [x] **Unit Testing Suite**: `npm test` passes all tests across `data.test.ts`, `planner.test.ts`, `lang.test.ts`, and `content.test.ts`.
- [x] **Static Production Build**: `npm run build` generates 15 static routes without errors.
- [x] **Secret Scanning**: No private tokens, API keys, or credentials in source code.
- [x] **Content Verification**: All numerical metrics match source repository READMEs.

---

## User Configuration (To Be Completed by User)

- [ ] **LinkedIn URL**:
  - Open `src/data/profile.ts`.
  - Update `profile.contact` where `label: 'LinkedIn'` with your confirmed LinkedIn profile URL.
- [ ] **Academic / Professional Email**:
  - Update `profile.contact` with your preferred public contact email or contact form.
- [ ] **Official PDF Resume**:
  - Place your finalized PDF resume at `public/resume/Weiqi_Wang_Resume.pdf`.
  - In `src/data/profile.ts`, change `profile.resume.available` from `false` to `true`.
  - Re-run `npm run verify` to ensure tests continue passing.

---

## Publication Steps (Manual User Execution)

### Step 1: Deploy Portfolio Website to GitHub Pages
```bash
# Navigate to portfolio directory
cd <path-to-portfolio>

# Stage changes
git add .

# Commit with semantic message
git commit -m "chore(release): update portfolio"

# Push to main branch (triggers GitHub Actions automated deployment)
git push origin main
```
*Verify*: Go to `https://github.com/wwqwhichone-ui/wwqwhichone-ui.github.io/actions` to watch the build and deploy workflow complete.

### Step 2: Update GitHub Profile README
```bash
# Clone or switch to your profile repository
cd /tmp && gh repo clone wwqwhichone-ui/wwqwhichone-ui profile-temp
cp GITHUB_PROFILE_README.md profile-temp/README.md
cd profile-temp
git add README.md
git commit -m "docs: update profile README with verified robotics projects and portfolio link"
git push origin main
rm -rf /tmp/profile-temp
```
*Verify*: Visit `https://github.com/wwqwhichone-ui` to confirm the profile layout, dark/light SVG banner, and project links.

### Step 3: Pin Top Repositories on GitHub
On your GitHub profile page (`https://github.com/wwqwhichone-ui`):
1. Click **Customize your pins** (or **Pin a repository**).
2. Select:
   - `llm-robot-task-planner`
   - `robot-arm-kinematics`
   - `mobile-robot-path-planning`
   - `wwqwhichone-ui.github.io`
3. Click **Save pins**.
