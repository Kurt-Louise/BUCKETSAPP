const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Data storage
const buckets = {
  travel: [],
  food: [],
  tasks: []
};

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// GET Add task page
app.get('/add-task', (req, res) => {
  res.render('addTask');
});

// POST ADD TASK PAGE 
app.post('/add-task', (req, res) => {
  const { title, description, category } = req.body;

  const newItem = { title, description };

  if (buckets[category]) {
    buckets[category].push(newItem);
  }

  res.redirect('/' + category);
});

// Category pages
app.get('/travel', (req, res) => {
  res.render('travel', { items: buckets.travel, category: 'travel' });
});

app.get('/food', (req, res) => {
  res.render('food', { items: buckets.food, category: 'food' });
});

app.get('/tasks', (req, res) => {
  res.render('tasks', { items: buckets.tasks, category: 'tasks' });
});



// POST DELETE 

app.post('/delete/:category/:index', (req, res) => {
  const category = req.params.category;
  const index = parseInt(req.params.index);

  if (buckets[category]) {
    buckets[category] = buckets[category].filter((item, i) => i !== index);
  }

  res.redirect('/' + category);
});


// GET EDIT PAGE
app.get('/edit/:category/:index', (req, res) => {
  const { category, index } = req.params;

  if (!buckets[category] || !buckets[category][index]) {
    return res.redirect('/');
  }

  const item = buckets[category][index];

  res.render('editTask', {
    item,
    category,
    index
  });
});
``

// POST EDIT PAGE
app.post('/edit/:category/:index', (req, res) => {
  const { category, index } = req.params;
  const { title, description } = req.body;

  // Check if category + item exists
  if (buckets[category] && buckets[category][index]) {

    // Update the item
    buckets[category][index].title = title;
    buckets[category][index].description = description;
  }

  
  res.redirect('/' + category);
});



//  Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
``


