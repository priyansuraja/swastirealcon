const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const cors = require('cors');

const app = express();

/* ================= TRUST PROXY ================= */
app.set('trust proxy', 1);

/* ================= CORS ================= */
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500'
  ],
  credentials: true
}));

/* ================= BODY PARSER ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= SESSION ================= */
app.use(session({
  name: 'swasti.sid',
  secret: 'swasti-secret-key',
  resave: false,
  saveUninitialized: false,

  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

/* ================= MYSQL ================= */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'swasti_realcon'
});

db.connect(err => {

  if (err) {
    console.error("❌ MySQL error:", err);
    return;
  }

  console.log("✅ MySQL Connected");

});

/* ================= TEST ================= */
app.get('/', (req, res) => {

  res.send("Backend working");

});


/* ================= LOGIN (FIXED) ================= */
app.post('/login', (req, res) => {

  const { username, password } = req.body;

  console.log("Login attempt:", username, password);

  if (username === 'admin' && password === 'admin123') {

    req.session.isAdmin = true;

    // 🔴 IMPORTANT FIX: SAVE SESSION FIRST
    req.session.save(err => {

      if (err) {

        console.log("Session save error:", err);

        return res.status(500).json({
          success: false
        });

      }

      console.log("✅ Session saved:", req.session);

      res.json({
        success: true
      });

    });

  } else {

    res.status(401).json({
      success: false
    });

  }

});


/* ================= AUTH ================= */
function requireAdmin(req, res, next) {

  console.log("Session check:", req.session);

  if (req.session.isAdmin) {

    next();

  } else {

    res.status(403).json({
      message: "Please login first"
    });

  }

}


/* ================= FETCH LEADS ================= */
app.get('/api/leads', requireAdmin, (req, res) => {

  db.query(
    "SELECT * FROM leads ORDER BY created_at DESC",
    (err, results) => {

      if (err) {

        console.log(err);

        return res.status(500).json(err);

      }

      res.json(results);

    }
  );

});


/* ================= SAVE LEAD ================= */
app.post('/api/leads', (req, res) => {

  const { name, phone, city, area, price } = req.body;

  db.query(
    "INSERT INTO leads (name, phone, city, area, price) VALUES (?, ?, ?, ?, ?)",
    [name, phone, city, area, price],
    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false
        });

      }

      res.json({
        success: true
      });

    }
  );

});

app.delete('/api/delete-lead/:id', (req,res)=>{

const id=req.params.id;

db.query(
'DELETE FROM leads WHERE id=?',
[id],
(err)=>{

if(err){
return res.status(500).json(err);
}

res.json({success:true});

});

});



/* ================= LOGOUT ================= */
app.post('/logout', (req, res) => {

  req.session.destroy(() => {

    res.json({
      success: true
    });

  });

});


/* ================= START ================= */
app.listen(5000, () => {

  console.log("🚀 Server running on http://localhost:5000");

});
