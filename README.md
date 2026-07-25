# IGT Lead Automation — Setup

## Backend (Django + MySQL)
```
cd backend
pip install -r requirements.txt
```
1. MySQL la database create pannunga:
```sql
CREATE DATABASE igt_leads_db;
```
2. `leadproject/settings.py` la MySQL password podunga (`your_mysql_password`).
3. Migrate + run:
```
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Backend: http://127.0.0.1:8000/api/leads/

## Frontend (React)
```
cd frontend
npm install
npm start
```
Frontend: http://localhost:3000

## Call Button Flow
- Call button click pannumbodhu `tel:<number>` link trigger aagum → mobile browser la irundhu ninga own SIM la irundhu dialer open aagi call pogum (Twilio/cloud calling illama, cost illa).
- Same time backend ku `mark_called` API call pogum → lead status "contacted" aagum, `last_called_at` timestamp save aagum.
- **Note:** `tel:` link laptop browser la Skype/dialer app irundha thaan work aagum. Mobile la (Android/iOS) ellame direct dialer open aagum — so best experience mobile browser or mobile app la thaan.
