# MyHealthRecord (MediLink)

A secure personal medical-record management platform with emergency QR/access-key sharing.  
Full-stack: Next.js (frontend) + Express + MongoDB (backend). Designed for easy uploads, previews, safe sharing of emergency info, and fast clinician access.

---

## Quick demo / Showcase ideas
- Add a short GIF in `healthapp/public/` showing: signup → upload record → generate emergency QR → scan preview.  
- Suggested screenshots: home hero, records table, preview modal, emergency QR panel.

---

## Feature highlights (what to showcase)

- Emergency access (QR / one-time key — limited, read-only emergency data)
  - Frontend UI: [`EmergencyAcessPage`](healthapp/app/components/EmergencyAccessPage.jsx) and route [`healthapp/app/emergencyAccess/[accessKey]/page.jsx`](healthapp/app/emergencyAccess/[accessKey]/page.jsx)
  - Backend: emergency endpoint in [`backend/router/profile.js`](backend/router/profile.js) (route: GET /api/profile/emergency-access/:accessKey)

- Upload / Preview / Download medical records
  - Upload UI & flow: [`healthapp/app/components/RecordsPage.jsx`](healthapp/app/components/RecordsPage.jsx)
  - Table + thumbnail/previews: [`healthapp/app/components/MedicalReportsTable.jsx`](healthapp/app/components/MedicalReportsTable.jsx)
  - API actions: [`healthapp/app/actions/recordsAction.js`](healthapp/app/actions/recordsAction.js)
  - Backend: file streaming & zip download: [`backend/router/records.js`](backend/router/records.js)

- Prescribed medication uploads + previews
  - Frontend: [`MedicationPage`](healthapp/app/components/MedicationPage.jsx), [`PrescribedRecordsTable`](healthapp/app/components/PrescribedRecordsTable.jsx)
  - Backend model: [`backend/models/prescribedRecord.js`](backend/models/prescribedRecord.js)

- User profile, allergies, chronic conditions
  - Frontend: [`HomeClient`](healthapp/app/patient/_components/HomeClient.jsx)
  - Actions: [`healthapp/app/actions/userAction.js`](healthapp/app/actions/userAction.js)
  - Backend model & routes: [`backend/models/profile.js`](backend/models/profile.js), [`backend/router/profile.js`](backend/router/profile.js)

- Authentication & OTP
  - Frontend OTP UI: [`VerifyOTP`](healthapp/app/components/verifyOTP.jsx)
  - Email helper: [`backend/middleware/nodemailer.js`](backend/middleware/nodemailer.js)
  - User model (password hash): [`backend/models/user.js`](backend/models/user.js)

- Public marketing / homepage
  - Frontend entry: [`healthapp/app/page.js`](healthapp/app/page.js), layout: [`healthapp/app/layout.js`](healthapp/app/layout.js)

---

## Tech stack & important files

- Frontend: Next.js (app router) — [`healthapp/package.json`](healthapp/package.json)  
  - Main files: [`healthapp/app/page.js`](healthapp/app/page.js), [`healthapp/app/layout.js`](healthapp/app/layout.js)
  - Actions: [`healthapp/app/actions/`](healthapp/app/actions/)
- Backend: Node + Express + Mongoose — [`backend/app.js`](backend/app.js)  
  - Routes: [`backend/router/profile.js`](backend/router/profile.js), [`backend/router/records.js`](backend/router/records.js)
  - Models: [`backend/models/profile.js`](backend/models/profile.js), [`backend/models/medicalRecord.js`](backend/models/medicalRecord.js), [`backend/models/prescribedRecord.js`](backend/models/prescribedRecord.js), [`backend/models/user.js`](backend/models/user.js)
- Storage: [`backend/storage/`](backend/storage/) (gitignored) — used for uploaded files

---

## Local Quickstart

Prereqs: Node 18+, npm/yarn, MongoDB (local or Atlas).

1) Backend
```sh
cd backend
npm install
# create .env with keys below
node app.js
```
