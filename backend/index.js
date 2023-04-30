require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const Person = require('./models/person');


app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));
morgan.token('postData', (request,response) => {
 // if (request.method == 'GET') return ' ' + JSON.stringify(request.body) + "REsponse! ",response;
  if(request.method == 'POST') return JSON.stringify(request.body);
  else return ' ';
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postData'
  )
);
let contacts = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieckk", 
      "number": "39-23-6423122"
    }
];
const getTotalContacts = () => {
  return contacts.length;
}
const personExists = (person) => {
  for(let contact of contacts)
  {
    if(contact.name == person.name)
      return true;
  }
}
const numberExists = (person) => {
  for(let contact of contacts)
  {
    if(contact.number == person.number)
      return true;
  }
}
app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>');
});
app.get('/info', (request,response) => {

  response.send("Phonebook has info for "+getTotalContacts()+" contacts."+"</br>"+new Date());
});
/* app.get('/api/persons', (request, response) => {
  response.json(contacts)
}); */
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  });
});

app.delete('/api/persons/:id', (request,response) => {
  const id = Number(request.params.id);
  contacts = contacts.filter(contact => contact.id!==id);
  response.status(204).end();
});
/*
app.post('/api/persons', (request,response) => {
  const id = Math.floor(Math.random()*1000000);
  const person = request.body;
  if(!person.name)
  {
    return response.status(400).json({error: 'name missing'});
  }
  if(personExists(person) )
  {
    return response.status(400).json({error: 'contact already exists in phonebook'});
  }
  if(numberExists(person))
  {
    return response.status(400).json({error: 'number is already in contact list'});
  }
  const contact = {
    id: id,
    name: person.name,
    number: person.number
  }
  contacts = contacts.concat(contact);
  response.json(contact);

});
*/
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  });
});
/*
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const contact = contacts.find(contact => {
    //console.log(contact.id, typeof note.id, id, typeof id, note.id === id)
    return contact.id === id
  });
  if (contact) {
    response.json(contact)
  } else {
    response.status(404).end()
  }
}); */
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  });
});
//app.use(unknownEndpoint)

/*const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})*/ 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
